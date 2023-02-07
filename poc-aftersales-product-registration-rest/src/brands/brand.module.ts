import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Brand, BrandSchema} from "./brands.schema";
import BrandController from "./brand.controller";
import BrandService from "./brand.service";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),
    ],
    controllers: [BrandController],
    providers: [BrandService],
    exports: [BrandService],
})
class BrandModule {}

export default BrandModule;
