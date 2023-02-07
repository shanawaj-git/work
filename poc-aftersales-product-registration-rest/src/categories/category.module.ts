import {Module} from "@nestjs/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Category, CategorySchema} from "./category.schema";
import CategoryController from "./category.controller";
import CategoryService from "./category.service";
import BrandModule from "../brands/brand.module";


@Module({
    imports:[
        MongooseModule.forFeature([{name: Category.name, schema:CategorySchema}]),
        BrandModule
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService]
})
class CategoryModule {}

export default CategoryModule;