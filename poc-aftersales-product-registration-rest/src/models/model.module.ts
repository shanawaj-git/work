import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProductType, ProductTypeSchema} from "../productypes/productType.schema";
import CategoryModule from "../categories/category.module";
import BrandModule from "../brands/brand.module";
import ProductTypeController from "../productypes/productType.controller";
import ProductTypeService from "../productypes/productType.service";
import {ModelType, ModelTypeSchema} from "./model.schema";
import ProductTypeModule from "../productypes/productType.module";
import ModelController from "./model.controller";
import ModelService from "./model.service";


@Module({
    imports:[
        MongooseModule.forFeature([{name: ModelType.name, schema:ModelTypeSchema}]),
        CategoryModule,
        BrandModule,
        ProductTypeModule
    ],
    controllers: [ModelController],
    providers: [ModelService],
    exports: [ModelService]
})

class  ModelTypeModule {}

export default ModelTypeModule;