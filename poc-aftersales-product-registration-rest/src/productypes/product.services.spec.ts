
import { Test, TestingModule } from '@nestjs/testing';
import {AppModule} from "../app.module";
import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import BrandModule from "../brands/brand.module";
import CategoryModule from "../categories/category.module";
import BrandService from "../brands/brand.service";
import {TestData} from "../common/testData";
import ModelController from "../models/model.controller";
import ModelService from "../models/model.service";
import CategoryService from "../categories/category.service";
import ModelTypeModule from "../models/model.module";
import ProductTypeService from "./productType.service";
import ProductTypeModule from "./productType.module";




if(process.env.isDevOnly.includes("true")) {


    describe('Product Service', () => {
        let modelController: ModelController;
        let modelService: ModelService;
        let brandService: BrandService;
        let categoryService: CategoryService;
        let productService: ProductTypeService
        let app: INestApplication;

        beforeEach(async () => {
            const appSo: TestingModule = await Test.createTestingModule({
                // providers: [UsersService],

                controllers: [ModelController],
                imports: [AppModule, ModelTypeModule, BrandModule, CategoryModule, ProductTypeModule],
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


            it('Creating a new Model with 201 /POST"', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                await categoryService.createCategoryModel(TestData.mockCategory);

                return request(app.getHttpServer()).post('/types').expect(201).send(TestData.mockProduct).expect((response) => {
                    expect(response.body.product).toEqual("Galaxy Note JS X")


                });

            });

            it('Should retrieve all the Models with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/types').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Galaxy Note JS X")
                });

            })

            it('Should search the Models with brandID 200 /GET', async () => {
                return request(app.getHttpServer()).get('/types?brand=61c90f4b9873da63e851ccf9').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Galaxy Note JS X")
                });

            })

            it('Should give error message with Incorrect brandID 404 /GET', async () => {
                return request(app.getHttpServer()).get('/types?brand=61c967901d798be0df4c93c6').expect(404).expect((response) => {
                    expect(response.body.message).toEqual("Brand ID does not exist")
                });

            })

            it('Should search the Models with categoryID 200 /GET', async () => {
                return request(app.getHttpServer()).get('/types?category=61c1ae8556392f12086698c5').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Galaxy Note JS X")
                });

            })

            it('Should give error message with Incorrect categoryID 404 /GET', async () => {
                return request(app.getHttpServer()).get('/types?category=61c967901d798be0df4c93c6').expect(404).expect((response) => {
                    expect(response.body.message).toEqual("Category ID does not exist")
                });

            })

            it('Should result with regex search with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/types?keyword=note').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Galaxy Note JS X")
                });

            })

            it('Should get the default page limit as 25 while retrieving Categories 200 /GET', async () => {
                return request(app.getHttpServer()).get('/types').expect(200).expect((response) => {
                    // console.log(response)
                    expect(response.body.page.limit).toEqual(25)
                });

            })


        });


        afterAll(async () => {
            await brandService.clearAllBrands(true)
            await categoryService.clearAllCategories(true)
            await modelService.clearAllServices(true);
            await productService.clearAllProducts(true);
        })


    });

}
