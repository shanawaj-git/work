import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpException, ValidationPipe} from "@nestjs/common";
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import iterate from 'iterare';

const mapChildrenToValidationErrors = (error, parentPath) => {
  if (!(error.children && error.children.length)) {
      return [error];
  }
  const validationErrors = [];
  parentPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;
  for (const item of error.children) {
      if (item.children && item.children.length) {
          validationErrors.push(...mapChildrenToValidationErrors(item, parentPath));
      }
      validationErrors.push(prependConstraintsWithParentProp(parentPath, item));
  }
  return validationErrors;
}
const prependConstraintsWithParentProp = (parentPath, error) => {
  const constraints = {};
  for (const key in error.constraints) {
      constraints[key] = `${error.constraints[key]}`;
  }
  return Object.assign(Object.assign({}, error), { constraints });
}

const flattenValidationErrors = (validationErrors) => {
  return iterate(validationErrors)
      .map(error => mapChildrenToValidationErrors(error, ''))
      .flatten()
      .filter(item => !!item.constraints)
      .map(item => Object.values(item.constraints))
      .flatten()
      .toArray();
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    validationError: {
      target: false
    },
    exceptionFactory: (errors) => {
      return new HttpErrorByCode[400](flattenValidationErrors(errors))
    }
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
