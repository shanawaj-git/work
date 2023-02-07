import {BadRequestException, ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {RegisterTypeDocument, RegistrationType} from "./registration.schema";
import { Model, Schema, FilterQuery } from "mongoose";
import BrandService from "../brands/brand.service";
import CategoryService from "../categories/category.service";
import ModelService from "../models/model.service";
import ProductTypeService from "../productypes/productType.service";
import NewRegisterDto, {Address, Product} from "./dto/newRegister.dto";
import {common} from "../common/common";
import * as datefns from 'date-fns'


@Injectable()
class RegisterService{
    public proceedRegister: boolean;
    constructor(
        @InjectModel(RegistrationType.name)
        private registrationTypeModel: Model<RegisterTypeDocument>,
        private brandService: BrandService,
        private categoryService: CategoryService,
        private modelService: ModelService,
        private typeService: ProductTypeService
    ) {}

    async createNewRegistration(registerDto: NewRegisterDto) {
        
        var customer: Address = registerDto.customer

        this.proceedRegister = false;
        var product: Product = registerDto.product;


        const newRegisterType = {
            "fullName": customer.fullName,
            "email": customer.email,
            "phone": customer.phone,
            "brandType": product.brand,
            "productType": product.type,
            "categoryType": product.category,
            "modelType": product.model,
            "serialNumber": product.serialnumber,
            "date": product.invoiceDate,


        }
        // validate invocie date, cannot use class-validator for this.
            if(product.invoiceDate && datefns.isFuture( datefns.parse(product.invoiceDate.toString(),'dd-mm-yyyy', Date.now()))) {
                throw new BadRequestException({
                    message: [common.FUTURE_INVOICEDATE]
                })
            }


        if(customer.email){
            await this.validEmail(customer.email)
        }

        if(!product.serialnumber){
            product.serialnumber = "NOT SPECIFIED"

        }



        const serialExist = await this.serialNumberExists(product.serialnumber)
        const custExists = await this.customerExists(customer.phone)
        const IdsAccepted = await this.checkIdExists(customer, product);
        const proceed =  await this.proceedToRegister(custExists,serialExist)




        if (proceed) {

        const createRegisterType = await new this.registrationTypeModel({
            ...newRegisterType
        })
        await createRegisterType.save();

        var message = 'Product Registered Successfully';
        var registration = {
            customer,
            product,


        }
        return {message, registration}

        }else{
            const errorMessage = {
                "message" : ['Not Registered']
            }
            throw new BadRequestException(errorMessage)
        }
    }

    async validEmail(email: string){
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            return true;
        }
        else {
            const errorMessage = {
                "message" : [common.INVALID_EMAIL]
            }
            throw new BadRequestException(errorMessage)
        }

    }
    async checkIdExists(customer: Address, product: Product){
        let brandId = product.brand;
        let brandExist = await this.brandService.findBrandId(String(brandId))

        if(!brandExist){
            const errorMessage = {
                "message" : [common.BRANDID_NOT_EXIST]
            }
            throw new NotFoundException(errorMessage)
        }

        let categoryId = product.category;
        let CategoryExist = await this.categoryService.findCategoryId(String(categoryId))

        if(!CategoryExist){
            const errorMessage = {
                "message" : [common.CATEGORY_NOT_EXIST]
            }
            throw new NotFoundException(errorMessage)
        }

        let productId = product.type;
        let productExist = await this.typeService.findProductID(String(productId));

        if(!productExist){
            const errorMessage = {
                "message" : [common.PRODUCT_NOT_EXIST]
            }
            throw new NotFoundException(errorMessage)
        }

        let modelId = product.model;
        let modelExist = await this.modelService.findModelbyId(String(modelId));

        if(!modelExist){
            const errorMessage = {
                "message" : [common.MODEL_NOT_EXIST]
            }
            throw new NotFoundException(errorMessage)
        }
    }

    async proceedToRegister(custExists: any, serialExist: any){

        // if(custExists >= 1 && serialExist ==0 ){
        //
        // }
        if(custExists ==0 && serialExist ==0){
            return this.proceedRegister = true;
        }

        if (custExists > 0 && serialExist <= 0) {
            return this.proceedRegister = true;
        }

        if (serialExist > 0) {
            const errorMessage = {
                "message" : [common.PRODUCT_REGISTERED]
            }


            throw new ConflictException(errorMessage);
        }

        if (custExists > 0) {
            const errorMessage = {
                "message" : [common.CUSTOMER_REGISTERED]
            }
            throw new ConflictException(errorMessage)
        }

        return this.proceedRegister;
    }

    async clearAllRegiseter(proceed: boolean){
        proceed ? await this.registrationTypeModel.deleteMany() : false;
    }

    async serialNumberExists(serialId: string){
        const serial = await this.registrationTypeModel.find({serialNumber : serialId}).count();
        return serial;
    }

    async customerExists(customerPhone: string){
        const phone = await this.registrationTypeModel.find({phone : customerPhone}).count();
        return phone;
    }

}

export default RegisterService;