import {Body, Controller, Get, Post, Query, UseInterceptors} from "@nestjs/common";
import {Brand as BrandModel} from "./brands.schema";
import MongooseClassSerializerInterceptor from "../utils/mongooseClassSerializer.interceptor";
import NewbrandDto from "./dto/newbrand.dto";
import BrandService from "./brand.service";
import {PaginationParams} from "../utils/paginationParams";

@Controller('brands')
export default class BrandController{
    constructor(private  readonly brandService: BrandService) {}


    @Post()
    async createBrand(@Body() brand: NewbrandDto){
        return this.brandService.createBrand(brand);
    }

    @Get()
    async getAllBrands(
        @Query() {page , pageSize, startId}: PaginationParams,
        @Query('keyword') keyword: string
    ){
        return this.brandService.getAll(page,pageSize,startId,keyword)
    }
}