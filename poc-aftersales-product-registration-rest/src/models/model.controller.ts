import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import ModelService from "./model.service";
import NewModelDto from "./dto/newModel.dto";
import {Category} from "../categories/category.schema";
import {ProductType} from "../productypes/productType.schema";
import {Brand} from "../brands/brands.schema";
import {PaginationParams} from "../utils/paginationParams";
import {MongodbCredentialsDto} from "../utils/mongodbCredentials.dto";


@Controller('models')
export default class ModelController{
    constructor(private modelControllerService: ModelService) {}


    @Post()
    async insertNewModel(@Body() model: NewModelDto,
                         @Body() category: Category,
                         @Body() product: ProductType,
                         @Body() brand: Brand){

        return this.modelControllerService.createNewModel(model,category,brand,product);
    }

    @Get()
    async getAll(
        @Query() {page, pageSize, startId}: PaginationParams,
        @Query('keyword') keyword: string,
        @Query() {brand, category, type}: MongodbCredentialsDto
    ){
      return this.modelControllerService.getAll(page,pageSize,startId,
         keyword, brand,category, type)  ;
    }



}