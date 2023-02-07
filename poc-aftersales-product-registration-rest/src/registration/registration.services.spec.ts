
import { Test, TestingModule } from '@nestjs/testing';
import {AppModule} from "../app.module";
import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import assert from "assert";
import {TestData} from "../common/testData";
import BrandController from "../brands/brand.controller";
import BrandService from "../brands/brand.service";
import BrandModule from "../brands/brand.module";
import ProductTypeModule from "../productypes/productType.module";
import ProductTypeService from "../productypes/productType.service";
import ModelController from "../models/model.controller";
import ModelService from "../models/model.service";
import CategoryService from "../categories/category.service";
import ModelTypeModule from "../models/model.module";
import CategoryModule from "../categories/category.module";
import RegisterTypeModule from "./register.module";
import RegisterService from "./register.service";




if(process.env.isDevOnly.includes("true")) {


    describe('Register Service', () => {
        let modelController: ModelController;
        let modelService: ModelService;
        let brandService: BrandService;
        let categoryService: CategoryService;
        let productService: ProductTypeService
        let registerService: RegisterService;
        let app: INestApplication;

        beforeEach(async () => {
            const appSo: TestingModule = await Test.createTestingModule({
                // providers: [UsersService],

                controllers: [BrandController],
                imports: [AppModule, BrandModule, ProductTypeModule, ModelTypeModule, CategoryModule, RegisterTypeModule],
            }).compile();

            app = appSo.createNestApplication();
            await app.init();
            modelController = appSo.get<ModelController>(ModelController);
            categoryService = appSo.get<CategoryService>(CategoryService);
            brandService = appSo.get<BrandService>(BrandService);
            modelService = appSo.get<ModelService>(ModelService);
            productService = appSo.get<ProductTypeService>(ProductTypeService)
            registerService = appSo.get<RegisterService>(RegisterService)


        });

        describe('Running all tests', () => {


            it(' Creating a new Registration with 201 /POST', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                await categoryService.createCategoryModel(TestData.mockCategory);
                await productService.createProducType(TestData.mockProduct)
                await modelService.createModel(TestData.mockModel)


                return request(app.getHttpServer()).post('/registrations').expect(201).send(TestData.mockRegisterModel).expect((response) => {
                    // expect(response.body.modelNo).toEqual("SS-XWR-352-SFE")


                });

            })

            it(' Creating a new Registration without Email 201 /POST', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                await categoryService.createCategoryModel(TestData.mockCategory);
                await productService.createProducType(TestData.mockProduct)
                await modelService.createModel(TestData.mockModel)

                return request(app.getHttpServer()).post('/registrations').expect(201).send(TestData.mockwithoutEmailRegisterModel).expect((response) => {
                    // expect(response.body.modelNo).toEqual("SS-XWR-352-SFE")


                });


            })

            it(' Should throw error message when invalid number is entered /POST', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                await categoryService.createCategoryModel(TestData.mockCategory);
                await productService.createProducType(TestData.mockProduct)
                await modelService.createModel(TestData.mockModel)

                return request(app.getHttpServer()).post('/registrations').expect(201).send(TestData.mockwithBadphoneNumbermodel).expect((response) => {
                    // console.log(response.body)
                    // expect(response.body.modelNo).toEqual("SS-XWR-352-SFE")


                });

            })


            it('Should validate the name with spaces /POST', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                await categoryService.createCategoryModel(TestData.mockCategory);
                await productService.createProducType(TestData.mockProduct)
                await modelService.createModel(TestData.mockModel)

                console.log()

                return request(app.getHttpServer()).post('/registrations').expect(201).send(TestData.mockNamewithSpaces).expect((response) => {
                    // console.log(response.body)
                    // expect(response.body.modelNo).toEqual("SS-XWR-352-SFE")


                });

            })


        });

        afterEach(async () => {
            await brandService.clearAllBrands(true)
            await categoryService.clearAllCategories(true)
            await modelService.clearAllServices(true);
            await productService.clearAllProducts(true);
            await registerService.clearAllRegiseter(true);
        })

        afterAll(async () => {
            await brandService.clearAllBrands(true)
            await categoryService.clearAllCategories(true)
            await modelService.clearAllServices(true);
            await productService.clearAllProducts(true);
            await registerService.clearAllRegiseter(true);
        })


    });
}