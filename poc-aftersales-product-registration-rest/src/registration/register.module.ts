import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProductType, ProductTypeSchema} from "../productypes/productType.schema";
import CategoryModule from "../categories/category.module";
import BrandModule from "../brands/brand.module";
import ProductTypeController from "../productypes/productType.controller";
import ProductTypeModule from "../productypes/productType.module";
import RegisterController from "./register.controller";
import RegisterService from "./register.service";
import {RegistrationFullSchema, RegistrationType} from "./registration.schema";
import ModelTypeModule from "../models/model.module";


@Module({
    imports:[
        MongooseModule.forFeature([{name: RegistrationType.name, schema:RegistrationFullSchema}]),
        CategoryModule,
        BrandModule,
        ModelTypeModule,
        ProductTypeModule
    ],
    controllers: [RegisterController],
    providers: [RegisterService],
    exports: [RegisterService]
})

class  RegisterTypeModule {}

export default RegisterTypeModule;