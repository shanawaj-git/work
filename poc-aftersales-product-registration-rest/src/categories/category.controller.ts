import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import CategoryService from "./category.service";
import NewcategoryDto from "./dto/newcategory.dto";
import {Brand} from "../brands/brands.schema";
import {PaginationParams} from "../utils/paginationParams";
import {query} from "express";
import { PipeTransform, Injectable, BadRequestException } from
        '@nestjs/common';
import { ObjectID } from 'mongodb';
import { ObjectId } from "mongoose";
import {MongodbCredentialsDto} from "../utils/mongodbCredentials.dto";


@Controller('categories')
export default class CategoryController{
    constructor(private  readonly categoryService: CategoryService) {}


    @Post()
    async createCategory(@Body() category: NewcategoryDto, @Body() brand: Brand){
        return this.categoryService.createCategory(category, brand);
    }

    @Get()
    async getAllCategories(
        @Query() {page, pageSize, startId}: PaginationParams,
        @Query('keyword') keyword: string,
        @Query() {brand }: MongodbCredentialsDto
    ){
        return this.categoryService.getAll(page, pageSize,startId,keyword, brand)

    }

}