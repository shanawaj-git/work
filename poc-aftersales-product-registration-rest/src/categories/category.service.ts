import {Category, CategoryDocument} from "./category.schema";
import {Injectable, NotFoundException, Post} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Brand, BrandDocument} from "../brands/brands.schema";
import {FilterQuery, Model, Schema, Types} from "mongoose";
import NewcategoryDto from "./dto/newcategory.dto";

import {deserializeArray} from "class-transformer";
import BrandService from "../brands/brand.service";
import { ObjectID } from 'mongodb';
import {filter} from "rxjs";
import {common} from "../common/common";





@Injectable()
class CategoryService{
    public querySearch: boolean;
    constructor(@InjectModel(Category.name) private categoryModel : Model<CategoryDocument>,
                private brandService: BrandService)  {}


    async createCategory(newCategoryDto: NewcategoryDto, brand: Brand){
        const createdCategory = new this.categoryModel({
            ...newCategoryDto,
            brand,
        });
        return createdCategory.save();
    }

    async getAll(
        documentsToSkip?: number,
        limitOfDocuments?: number,
        startId?: string,
        searchQuery?: string,
        brandID?: ObjectID,
    ){
        const filters: FilterQuery<CategoryDocument> = startId
            ? {
                _id: {
                    $gt: startId,
                },
            }
            : {};

        const page = {
            page: documentsToSkip !== null ? parseInt(String(documentsToSkip), 10) || 0 : 0,
            limit: limitOfDocuments !== null ? parseInt(String(limitOfDocuments), 10) || common.defaultPageSize : common.defaultPageSize,
            hits: 0
        };
        const pageLimit = page.limit * (page.page -1)
        let categoryQuery;
        let brandExist;
        if(brandID){
            brandExist = await this.brandService.findBrandId(brandID);

            if(!brandExist){
                const errorMessage = {
                    "message" : "Brand ID does not exist"
                }
                throw new NotFoundException(errorMessage)
            }

            // categoryQuery = await this.categoryModel
            //     .find({"brandType": brandID}).populate('brandType')

        }


        if(searchQuery){
            filters.$text = {
                $search: searchQuery
            }
        }
        // let inputOneAns = brandID != null ? {"brandType": brandID} : searchQuery == null ? {} : {brand : regexSearch};

         let regexSearch = searchQuery == null ? "" : new RegExp(searchQuery, 'i');
         let filterSearch = null;

         if(brandID != null){

            filterSearch = {brandType: brandID};
        }else if(searchQuery != null){
            filterSearch = {category : regexSearch};
        }

        if(pageLimit >= 0){
            categoryQuery = this.categoryModel
                .find(filterSearch == null ? {} : filterSearch)
                .populate('brandType')
                .skip(page.limit * (page.page -1))
                .limit(page.limit)
        }else{
            page.limit = common.defaultPageSize;
            page.page  = 0;
            categoryQuery = this.categoryModel
                .find(filterSearch == null ? {} : filterSearch)
                .populate('brandType')
                .skip(page.page)
                .limit(page.limit);
        }

        const dbResult = await categoryQuery;
        // console.log(dbResult.length)

        if(dbResult <= 0){
            const errorMessage = {
                "message" : "No results found"
            }
            throw new NotFoundException(errorMessage);
        }

        var Category: Category = dbResult;
        var data = [];

        for (var _i = 0; _i < dbResult.length; _i++) {

            // console.log('Model Number' + Model[_i].modelNo);
            // console.log('Model Number' + Model[_i].brandType._id.toHexString());
            // console.log('Model Number' + Model[_i].categoryType._id.toHexString());

            const newData = {
                "_id": Category[_i]._id,
                "label": Category[_i].category,
                "brand": (Category[_i].brandType._id).toHexString(),
                // "category": (Model[_i].categoryType._id).toHexString(),
                // "typeId": (Model[_i].productType._id).toHexString(),
            }
            data.push(newData)

        }


        const count = await this.categoryModel
            .count(brandID == null ?  filters: {"brandType": brandID});

        page.hits = count;

        return{ data, page}
    }

    filterSearch(brandID: string, searchQuery){
        if(brandID){
           return this.querySearch = false;
        }

        if(searchQuery){
            return this.querySearch = true;
        }

        return null;
    }

    async clearAllCategories(proceed: boolean){
        proceed ? await this.categoryModel.deleteMany() : false;
    }

    async createCategoryModel(payload: Object){

        const newCategoryType = new this.categoryModel({ ... payload});

        await newCategoryType.save();
    }

    async findPhoneCategories() {
        const phoneCategories = await  this.categoryModel.find({category: "Phone"})
        console.log(phoneCategories)
        return phoneCategories;
    }

    async findCategoryId(categoryId: string){
        const category = await this.categoryModel.findById(categoryId);
        return category;
    }

    async findBrandTypes(brandId: string){
        return this.categoryModel
            .find({"brandType": ObjectID(brandId)})
            .populate('brandType')

    }





}

export default CategoryService;