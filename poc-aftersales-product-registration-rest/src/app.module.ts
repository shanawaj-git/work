import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from "@nestjs/mongoose";
import BrandModule from "./brands/brand.module";
import CategoryModule from "./categories/category.module";
import ProductTypeModule from "./productypes/productType.module";
import ModelTypeModule from "./models/model.module";
import RegisterTypeModule from "./registration/register.module";
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}`),
    // MongooseModule.forRoot('mongodb://localhost/supergeneraltest'),


    BrandModule,CategoryModule, ProductTypeModule, ModelTypeModule, RegisterTypeModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
