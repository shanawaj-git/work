import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProductType, ProductTypeSchema} from "./productType.schema";
import CategoryModule from "../categories/category.module";
import ProductTypeController from "./productType.controller";
import ProductTypeService from "./productType.service";
import BrandModule from "../brands/brand.module";


@Module({
    imports:[
        MongooseModule.forFeature([{name: ProductType.name, schema:ProductTypeSchema}]),
        CategoryModule,
        BrandModule
    ],
    controllers: [ProductTypeController],
    providers: [ProductTypeService],
    exports: [ProductTypeService]
})

class  ProductTypeModule {}

export default ProductTypeModule;