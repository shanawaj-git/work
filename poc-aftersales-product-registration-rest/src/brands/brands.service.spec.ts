
import { Test, TestingModule } from '@nestjs/testing';
import {AppModule} from "../app.module";
import {INestApplication} from "@nestjs/common";
import * as request from 'supertest';
import assert from "assert";
import BrandController from "./brand.controller";
import BrandService from "./brand.service";
import BrandModule from "./brand.module";
import {TestData} from "../common/testData";




if(process.env.isDevOnly.includes("true")) {

    describe('Brand Service', () => {
        let brandController: BrandController;
        let brandService: BrandService
        let app: INestApplication;

        beforeEach(async () => {
            const appSo: TestingModule = await Test.createTestingModule({
                // providers: [UsersService],

                controllers: [BrandController],
                imports: [AppModule, BrandModule],
            }).compile();

            app = appSo.createNestApplication();
            await app.init();
            brandController = appSo.get<BrandController>(BrandController);
            brandService = appSo.get<BrandService>(BrandService);


        });

        describe('Running all tests', () => {
            let proceed = false;


            it(' Creating a new Brand with 201 /POST', async () => {
                return request(app.getHttpServer()).post('/brands').expect(201).send(TestData.mockBrand).expect((response) => {
                    expect(response.body.brand).toEqual("Super General")
                    proceed = true;

                });


            })


            it('Should prevent duplicate entry of Brands with 409 /Conflict', async () => {
                return request(app.getHttpServer()).post('/brands').expect(409).send(TestData.mockBrand).expect((response) => {
                    expect(response.body.message).toEqual("Brand had alredy been created")
                });

            })

            it('Should retrieve all the Brands with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/brands').expect(200).expect((response) => {
                    expect(response.body.data[0].brand).toEqual("Super General")
                });

            })

            it('Should result with keyword search with 200 /GET', async () => {
                return request(app.getHttpServer()).get('/brands?keyword=super').expect(200).expect((response) => {
                    expect(response.body.data[0].brand).toEqual("Super General")
                });

            })


        });

        afterAll(async () => {
            await brandService.clearAllBrands(true)
        })


    });

}
