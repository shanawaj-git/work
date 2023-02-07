import {BadGatewayException, ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Brand, BrandDocument} from "./brands.schema";
import {FilterQuery, Model} from "mongoose";
import NewbrandDto from "./dto/newbrand.dto";
import {common} from "../common/common";


@Injectable()
class BrandService{

    constructor(@InjectModel(Brand.name) private brandModel : Model<BrandDocument>) {}


    async createBrand(newBrandDto: NewbrandDto){


            const brandsExist = await this.findOne(newBrandDto.brand);
            if(brandsExist > 0){
                throw new ConflictException('Brand had alredy been created')
                console.log('Brand has alread been created')
            }  else{

                const createdBrand = new this.brandModel({
                    ...newBrandDto
                });

                return createdBrand.save();
            }



    }


    async getAll(
        documentsToSkip?: number,
        limitOfDocuments?: number,
        startId?: string,
        searchQuery?: string,
    ) {
        const filters: FilterQuery<BrandDocument> = startId
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

        if (searchQuery){
            filters.$text ={
                $search: searchQuery
            }
        }
        //FIXED the pagination logic when pagination parameters not provided
        const pageLimit = page.limit * (page.page - 1)
        let brandQuery;


        let regexSearch = searchQuery == null ? "" : new RegExp(searchQuery, 'i');



        if(pageLimit >= 0){
             brandQuery = this.brandModel
                .find(searchQuery == null ? {} :{brand : regexSearch})
                .skip(page.limit * (page.page -1))
                .limit(page.limit);
        }else{
            page.limit = common.defaultPageSize;
            page.page = 0;
             brandQuery = this.brandModel
                .find(searchQuery == null ? {} :{brand : regexSearch})
                .skip(page.page)
                .limit(page.limit);
        }



        var data = [];
        const dbResult = await brandQuery;

        if(dbResult <= 0){
            throw new NotFoundException("No Results found")
        }

        var Brand: Brand = dbResult;

        for(var _i =0; _i < dbResult.length; _i++){
            const populateData = {
                "brand": Brand[_i].brand,
                "id": Brand[_i]._id
            }

            data.push(populateData)
        }
        const count = await this.brandModel.count(filters);
        page.hits =count

        return {data, page}
    }

    async createSuperBrand(payload: Object){

        const newSuperBrand = new this.brandModel({
            ...payload
        });

        await newSuperBrand.save();

    }
    async findAllSuperBrand(){
        const superBrand = await this.brandModel.find({brand: "Super General"})
        return superBrand;
    }

    async clearAllBrands(proceed: true){
        proceed ? await this.brandModel.deleteMany() : false;
    }

    async findOne(brand: string){
        const brandExist = await this.brandModel.find({ brand: brand }).count();
        return brandExist;
    }

    async findBrandId(brandId: string){
        const brand = await this.brandModel.findById(brandId);
        return brand;
    }
}

export default BrandService;