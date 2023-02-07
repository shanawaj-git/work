import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import ProductTypeService from "./productType.service";
import NewProductTypeDto from "./dto/newProductType.dto";
import {Category} from "../categories/category.schema";
import {PaginationParams} from "../utils/paginationParams";
import {MongodbCredentialsDto} from "../utils/mongodbCredentials.dto";
import {Brand} from "../brands/brands.schema";


@Controller('types')
export default class ProductTypeController{
    constructor(private  productTypeService: ProductTypeService) {}


    @Post()
    async createProductType(@Body() product: NewProductTypeDto, @Body() category: Category,
                            @Body() brand: Brand){
        return this.productTypeService.createProductType(product, category, brand);
    }

    @Get()
    async getAll(
        @Query() {page, pageSize, startId}: PaginationParams,
        @Query('keyword') keyword: string,
        @Query() {brand, category }: MongodbCredentialsDto
    ){
        return this.productTypeService.
        getAll(page, pageSize, startId, keyword, brand, category);
    }

}