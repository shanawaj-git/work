
import { Test, TestingModule } from '@nestjs/testing';
import {AppModule} from "../app.module";
import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import assert from "assert";
import {log} from "util";
import exp from "constants";
import CategoryController from "./category.controller";
import CategoryService from "./category.service";
import CategoryModule from "./category.module";
import {common} from "../common/common";
import BrandService from "../brands/brand.service";
import BrandModule from "../brands/brand.module";
import {response} from "express";
import {TestData} from "../common/testData";


if(process.env.isDevOnly.includes("true")) {
    describe('Category Service', () => {
        let categoryController: CategoryController;
        let categoryService: CategoryService;
        let brandService: BrandService;
        let app: INestApplication;

        beforeEach(async () => {
            const appSo: TestingModule = await Test.createTestingModule({
                // providers: [UsersService],

                controllers: [CategoryController],
                imports: [AppModule, CategoryModule, BrandModule],
            }).compile();

            app = appSo.createNestApplication();
            await app.init();
            categoryController = appSo.get<CategoryController>(CategoryController);
            categoryService = appSo.get<CategoryService>(CategoryService);
            brandService = appSo.get<BrandService>(BrandService);

        });

        describe('Running all tests', () => {
            let proceed = false;
            let genericBrandID;

            it('Creating a new Category with 201 /POST"', async () => {
                await brandService.createSuperBrand(TestData.mockBrand)
                // const brandId = await brandService.findAllSuperBrand().then((response) =>{
                //    const brandInherited =   JSON.stringify(response)
                //     let stringfy = JSON.parse(brandInherited)
                //     genericBrandID = stringfy[0]._id;
                //     return stringfy[0]._id;
                //      // console.log(stringfy[0]._id)
                // })

                // const mockCategory =
                //
                //     {
                //         "category": "Phone",
                //         "brandType": brandId
                //     }

                return request(app.getHttpServer()).post('/categories').expect(201).send(TestData.mockCategory).expect((response) => {
                    expect(response.body.category).toEqual("Smart Phone")
                    proceed = true;

                });

            });

            it('Should retrieve all the Categories with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/categories').expect(200).expect((response) => {
                    // console.log(response)
                    expect(response.body.data[0].label).toEqual("Smart Phone")
                });

            })


            it('Should result with keyword search with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/categories?keyword=Phone').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Smart Phone")
                });

            })

            it('Should result with regex search with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/categories?keyword=hone').expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Smart Phone")
                });

            })

            it('Should search with the brandID filter 200 /GET', async () => {
                let values = Object.keys(TestData.mockBrand).map(key => TestData.mockBrand[key]);
                return request(app.getHttpServer()).get(`/categories?brand=${values[0]}`).expect(200).expect((response) => {
                    expect(response.body.data[0].label).toEqual("Smart Phone")
                });

            })

            it('Should return error if no BrandID is found 404 /GET', async () => {
                return request(app.getHttpServer()).get(`/categories?brand=61b82f0a02d9acbf0c31d229`).expect(404).expect((response) => {
                    // expect(response.body.data[0].label).toEqual("Phone")
                });

            })

            it('Should get the default page limit as 25 while retrieving Categories 200 /GET', async () => {
                return request(app.getHttpServer()).get('/categories').expect(200).expect((response) => {
                    // console.log(response)
                    expect(response.body.page.limit).toEqual(25)
                });

            })


        });


        afterAll(async () => {
            await brandService.clearAllBrands(true)
            await categoryService.clearAllCategories(true)
        })


    });

}
