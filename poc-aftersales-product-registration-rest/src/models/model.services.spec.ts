
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
import ModelTypeModule from "./model.module";
import CategoryModule from "../categories/category.module";
import ModelController from "./model.controller";
import CategoryService from "../categories/category.service";
import ModelService from "./model.service";
import ProductTypeService from "../productypes/productType.service";




if(process.env.isDevOnly.includes("true")) {

    describe('Model Service', () => {
        let modelController: ModelController;
        let modelService: ModelService;
        let brandService: BrandService;
        let categoryService: CategoryService;
        let productService: ProductTypeService
        let app: INestApplication;

        beforeEach(async () => {
            const appSo: TestingModule = await Test.createTestingModule({
                // providers: [UsersService],

                controllers: [BrandController],
                imports: [AppModule, BrandModule, ProductTypeModule, ModelTypeModule, CategoryModule],
            }).compile();

            app = appSo.createNestApplication();
            await app.init();
            modelController = appSo.get<ModelController>(ModelController);
            categoryService = appSo.get<CategoryService>(CategoryService);
            brandService = appSo.get<BrandService>(BrandService);
            modelService = appSo.get<ModelService>(ModelService);
            productService = appSo.get<ProductTypeService>(ProductTypeService)


        });

        describe('Running all tests', () => {


            it(' Creating a new Model with 201 /POST', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                await categoryService.createCategoryModel(TestData.mockCategory);
                await productService.createProducType(TestData.mockProduct)


                return request(app.getHttpServer()).post('/models').expect(201).send(TestData.mockModel).expect((response) => {
                    expect(response.body.modelNo).toEqual("SS-XWR-352-SFE")


                });

            })

            it(' Should not create Model with incorrect BrandID 404 /POST', async () => {


                return request(app.getHttpServer()).post('/models').expect(404).send(TestData.Incorrect_BrandID_mockModel).expect((response) => {
                    expect(response.body.message).toEqual("Brand ID has not been found")


                });

            })

            it(' Should not create Model with incorrect CategoryID 404 /POST', async () => {

                return request(app.getHttpServer()).post('/models').expect(404).send(TestData.Incorrect_CategoryID_mockModel).expect((response) => {
                    expect(response.body.message).toEqual("Category ID does not exist")


                });

            })

            it('Should result with keyword search with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/models?keyword=52-SF').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("SS-XWR-352-SFE")
                });

            })

            it('Should result with regex search with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/models?keyword=52-sf').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("SS-XWR-352-SFE")
                });

            })


            //
            // it('Should prevent duplicate entry of Brands with 409 /Conflict', async () => {
            //     return request(app.getHttpServer()).post('/brands').expect(409).send(TestData.mockBrand).expect((response) => {
            //         expect(response.body.message).toEqual("Brand had alredy been created")
            //     });
            //
            // })
            //
            // it('Should retrieve all the Brands with 200 /GET', async () => {
            //     return request(app.getHttpServer()).get('/brands').expect(200).expect((response) => {
            //         expect(response.body.data[0].brand).toEqual("Super General")
            //     });
            //
            // })
            //
            // it('Should result with keyword search with 200 /GET', async () => {
            //     return request(app.getHttpServer()).get('/brands?keyword=super').expect(200).expect((response) => {
            //         expect(response.body.data[0].brand).toEqual("Super General")
            //     });
            //
            // })


        });

        afterAll(async () => {
            await brandService.clearAllBrands(true)
            await categoryService.clearAllCategories(true)
            await modelService.clearAllServices(true);
            await productService.clearAllProducts(true);
        })


    });

}
