import {InjectModel} from "@nestjs/mongoose";
import {ModelType, ModelTypeDocument} from "./model.schema";
import { Injectable, NotFoundException } from "@nestjs/common";
import mongoose, { Model, Schema, FilterQuery } from "mongoose";
import BrandService from "../brands/brand.service";
import CategoryService from "../categories/category.service";
import ProductTypeService from "../productypes/productType.service";
import NewModelDto from "./dto/newModel.dto";
import {ProductType, ProductTypeDocument} from "../productypes/productType.schema";
import {Category} from "../categories/category.schema";
import {Brand} from "../brands/brands.schema";
import { ObjectID } from "mongodb";
import {common} from "../common/common";


@Injectable()
class ModelService{
    constructor(
        @InjectModel(ModelType.name)
        private modelService: Model<ModelTypeDocument>,
        private brandService: BrandService,
        private categoryService: CategoryService,
        private productService: ProductTypeService

    ) {}

    async createNewModel(
        newModelTypeDto: NewModelDto,
        category: Category,
        brand: Brand,
        product: ProductType
    ){



        const createdModelType = new this.modelService({
            ...newModelTypeDto,
            category,
            brand,
            product
        });


        await this.checkBrandExist(createdModelType);
        await this.checkCategoryExist(createdModelType);
        await this.checkProductCategoryExists(createdModelType);

        return createdModelType.save();
    }

    async getAll(
        documentsToSkip?: number,
        limitOfDocuments?: number,
        startId?: string,
        searchQuery?: string,
        brandId?: ObjectID,
        catId?: ObjectID,
        productId?: ObjectID
    ){

        const filters: FilterQuery<ModelTypeDocument> = startId ? { _id: { $gt: startId,},} : {};
        // console.log(brandId)

        const page = {
            page:
                documentsToSkip !== null
                    ? parseInt(String(documentsToSkip), 10) || 0
                    : 0,
            limit:
                limitOfDocuments !== null
                    ? parseInt(String(limitOfDocuments), 10) || common.defaultPageSize
                    : common.defaultPageSize,
            hits: 0,
        };

        const pageLimit = page.limit * (page.page - 1);

        if (searchQuery) {
            filters.$text = {
                $search: searchQuery,
                $caseSensitive: false,
            };

        }

        let modelCategoryQuery;
        let brandExist;
        let categoryExist;
        let productExist;
        let count;

        let regexSearch = searchQuery == null ? "" : new RegExp(searchQuery, 'i');
        let filterSearch = null;

        if(brandId != null){

            filterSearch = {brandType: brandId};
        }else if(catId != null){
            filterSearch = {categoryType: catId}
        }else if (productId != null){
            filterSearch = {productType: productId}
        }
        else if(searchQuery != null){
            filterSearch = {modelNo : regexSearch};
        }

        if(catId){

            categoryExist = await this.categoryService.findCategoryId(catId);

            if(!categoryExist){
                throw new NotFoundException('Category ID does not exist');
            }

            if(pageLimit >= 0){
                modelCategoryQuery = this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType', select:['brand']})
                    .populate({path: 'categoryType',  select:['category']})
                    .skip(page.limit * (page.page -1))
                    .limit(page.limit)

            }else{
                page.limit = common.defaultPageSize;
                page.page = 0;
                modelCategoryQuery = this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType', select:['brand']})
                    .populate({path: 'categoryType',  select:['category']})
                    .skip(page.page)
                    .limit(page.limit)

            }

            count = await this.modelService.count(
                filterSearch == null ? {} : filterSearch
            );
        }
        else if(brandId){
            brandExist = await this.brandService.findBrandId(brandId);
            // console.log(brandExist)
            if(!brandExist){
                throw new NotFoundException("Brand ID does not exist");
            }

            if(pageLimit >=0){
                modelCategoryQuery = this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType' , select:['brand']})
                    .populate({path: 'categoryType',  select:['category']})
                    .populate({path: 'modelNo'})

                    .skip(page.limit * (page.page -1))
                    .limit(page.limit)
            }else {
                page.limit = common.defaultPageSize;
                page.page = 0;
                modelCategoryQuery =  this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType' , select:['brand']})
                    .populate({path: 'categoryType',  select:['category']})
                    .populate({path: 'modelNo'})
                    .skip(page.page)
                    .limit(page.limit)
            }

            count = await this.modelService.count(
                filterSearch == null ? {} : filterSearch
            );
        }else if(productId){

            productExist = await  this.productService.findProductID(productId);

            if(!productExist){
                throw new NotFoundException('Product ID does not exists');
            }

            if(pageLimit >=0){
                modelCategoryQuery = this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType' , select:['brand']})
                    .populate({path: 'categoryType',  select:['category']})
                    .populate({path: 'productType'})

                    .skip(page.limit * (page.page -1))
                    .limit(page.limit)
            }else {
                page.limit = common.defaultPageSize;
                page.page = 0;
                modelCategoryQuery =  this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType' , select:['brand']})
                    .populate({path: 'categoryType',  select:['category']})
                    .populate({path: 'productType'})
                    .skip(page.page)
                    .limit(page.limit)
            }

            count = await this.modelService.count(filterSearch == null ? {} : filterSearch);
        }else{
            if(pageLimit >= 0){
                modelCategoryQuery = this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType'})
                    .populate({path: 'categoryType',  select:['category']})
                    .populate({path: 'productType'})
                    .skip(page.limit * (page.page -1))
                    .limit(page.limit)



            }else{
                page.limit = common.defaultPageSize;
                page.page = 0;
                modelCategoryQuery = this.modelService
                    .find(filterSearch == null ? {} : filterSearch)
                    .populate({path: 'brandType'})
                    .populate({path: 'categoryType',  select:['category']})
                    .populate({path: 'productType'})
                    .skip(page.page)
                    .limit(page.limit)


            }

            count = await this.
            modelService.count(filterSearch == null ? {} : filterSearch);

        }

        const dbResult = await modelCategoryQuery;

        if(dbResult <= 0){
            throw  new NotFoundException("No results found");
        }


        var Model: ModelType = dbResult

        // console.log(dbResult)


        var data = [];

        for (var _i = 0; _i < dbResult.length; _i++) {

            // console.log('Model Number' + Model[_i].modelNo);
            // console.log('Model Number' + Model[_i].brandType._id.toHexString());
            // console.log('Model Number' + Model[_i].categoryType._id.toHexString());

            const newData = {
                "_id": Model[_i]._id,
                "label": Model[_i].modelNo,
                "brand": (Model[_i].brandType._id).toHexString(),
                "category": (Model[_i].categoryType._id).toHexString(),
                "typeId": (Model[_i].productType._id).toHexString(),
            }
            data.push(newData)

        }




        page.hits = count;

        return {data, page}

    }

    async checkProductCategoryExists(createdModelType){
        var mongoose = require('mongoose');
        var productID = mongoose.Types.ObjectId(createdModelType.productType);
        const productIdexists = await this.productService.findProductID(productID);

        if(!productIdexists){
            throw new NotFoundException('Product ID not found')
        }
    }

    async checkCategoryExist(createdModelType){
        var mongoose = require('mongoose');
        var categoryId = mongoose.Types.ObjectId(createdModelType.categoryType);
        const categoryIdExists = await this.categoryService.findCategoryId(categoryId);

        if(!categoryIdExists){
            throw new NotFoundException('Category ID does not exist')
        }
    }

    async checkBrandExist(createdModelType){
        var mongoose = require('mongoose');
        var brandID = mongoose.Types.ObjectId(createdModelType.brandType)
        const brandIDexists =  await this.brandService.findBrandId(brandID)

        if(!brandIDexists){
            throw new NotFoundException('Brand ID has not been found')
        }


    }

    async createModel(payload: Object){
        const newRegisterModel = new this.modelService({
            ...payload
        })

        await newRegisterModel.save();
    }

    async clearAllServices(proceed: boolean){
        proceed ? await this.modelService.deleteMany() : false;
    }

    async findModelbyId(categoryId: string){
        const category = await this.modelService.findById(categoryId);
        return category;
    }
}

export default ModelService;