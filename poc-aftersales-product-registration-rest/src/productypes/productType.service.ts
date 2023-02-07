import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductType, ProductTypeDocument } from "./productType.schema";
import { Model, Schema, FilterQuery } from "mongoose";
import NewProductTypeDto from "./dto/newProductType.dto";
import {Category, CategoryDocument} from "../categories/category.schema";
import { ObjectID } from "mongodb";
import BrandService from "../brands/brand.service";
import CategoryService from "../categories/category.service";
import { match } from "assert";
import * as mongoose from "mongoose";
import {Brand} from "../brands/brands.schema";
import {common} from "../common/common";

@Injectable()
class ProductTypeService {
  constructor(
    @InjectModel(ProductType.name)
    private productTypeModel: Model<ProductTypeDocument>,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {}

  async createProductType(
    newProductTypeDto: NewProductTypeDto,
    category: Category,
    brand: Brand
  ) {
    const createdProductType = new this.productTypeModel({
      ...newProductTypeDto,
      category,
      brand
    });

    return createdProductType.save();
  }

  async getAll(
    documentsToSkip?: number,
    limitOfDocuments?: number,
    startId?: string,
    searchQuery?: string,
    brandId?: ObjectID,
    catId?: ObjectID
  ) {
    const filters: FilterQuery<ProductTypeDocument> = startId ? { _id: { $gt: startId,},} : {};

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
      };

    }

    let productCategoryQuery;
    let brandExist;
    let categoryExist;
    let count;

    let regexSearch = searchQuery == null ? "" : new RegExp(searchQuery, 'i');
    let filterSearch = null;

    if(catId != null){
      filterSearch = {"categoryType": catId};
    } else if(brandId != null){
      filterSearch =  {"brandId": brandId}
    }else if(searchQuery != null){
      filterSearch = {product : regexSearch};
    }

    if (catId) {

      categoryExist = await this.categoryService.findCategoryId(catId);

      if (!categoryExist) {
        const errorMessage = {
          "message" : "Category ID does not exist"
        }
        throw new NotFoundException(errorMessage);
      }

      if(pageLimit >= 0){
        productCategoryQuery = this.productTypeModel
            .find(filterSearch == null ? {} : filterSearch)
            .populate({path: 'brandId'})
            .populate({path: 'categoryType',  select:['category']})
            .skip(page.limit * (page.page -1))
            .limit(page.limit)

      }else{
        page.limit = common.defaultPageSize;
        page.page = 0;
        productCategoryQuery = this.productTypeModel
            .find(filterSearch == null ? {} : filterSearch)
            .populate({path: 'brandId'})
            .populate({path: 'categoryType',  select:['category']})
            .skip(page.page)
            .limit(page.limit)
      }

      count = await this.productTypeModel.count(
          catId == null ? filters: {"categoryType": catId}
      );

    }else if (brandId) {

      brandExist = await this.brandService.findBrandId(brandId);


      if (!brandExist) {
        const errorMessage = {
          "message" : "Brand ID does not exist"
        }
        throw new NotFoundException(errorMessage);
      }

      if(pageLimit >= 0){
        productCategoryQuery = this.productTypeModel
            .find(filterSearch == null ? {} : filterSearch)
            .populate({path: 'brandId'})
            .populate({path: 'categoryType',  select:['category']})
            .skip(page.limit * (page.page -1))
            .limit(page.limit)

      }else{
        page.limit = common.defaultPageSize;
        page.page = 0;
        productCategoryQuery = this.productTypeModel
            .find(filterSearch == null ? {} : filterSearch)
            .populate({path: 'brandId'})
            .populate({path: 'categoryType',  select:['category']})
            .skip(page.page)
            .limit(page.limit)
      }

      count = await this.productTypeModel.count(
          filterSearch == null ? {} : filterSearch
      );

    }else {

      if(pageLimit >= 0){
        productCategoryQuery = this.productTypeModel
            .find(filterSearch == null ? {} : filterSearch)
            .populate({path: 'brandId'})
            .populate({path: 'categoryType',  select:['category']})
            .skip(page.limit * (page.page -1))
            .limit(page.limit)

      }else{
        page.limit = common.defaultPageSize;
        page.page = 0;
        productCategoryQuery = this.productTypeModel
            .find(filterSearch == null ? {} : filterSearch)
            .populate({path: 'brandId'})
            .populate({path: 'categoryType',  select:['category']})
            .skip(page.page)
            .limit(page.limit)
      }

      count = await this.productTypeModel.count(filterSearch == null ? {} : filterSearch);
    }





    const dbResult = await productCategoryQuery;
    // console.log(dbResult)
    if (dbResult <= 0) {
      const errorMessage = {
        "message" : "No results found"
      }
      throw new NotFoundException(errorMessage);
    }

    var Product: ProductType = dbResult;
    var data = [];

    for (var _i = 0; _i < dbResult.length; _i++) {

      // console.log('Model Number' + Model[_i].modelNo);
      // console.log('Model Number' + Model[_i].brandType._id.toHexString());
      // console.log('Model Number' + Model[_i].categoryType._id.toHexString());

      const newData = {
        "_id": Product[_i]._id,
        "label": Product[_i].product,
        "brand": (Product[_i].brandId._id).toHexString(),
        "category": (Product[_i].categoryType._id).toHexString(),

      }
      data.push(newData)

    }



    page.hits = count;

    return { data, page };
    // return this.productTypeModel.find().populate('categoryType');
  }

  async createProducType(payload: Object){
    const newProduct = new this.productTypeModel({
      ...payload
    })

    await newProduct.save();
  }

  async clearAllProducts(proceed: boolean){
    proceed ? await this.productTypeModel.deleteMany() : false;
  }


  async findProductID(productID: string){
    const product = await this.productTypeModel.findById(productID);
    return product;
  }


}

export default ProductTypeService;
