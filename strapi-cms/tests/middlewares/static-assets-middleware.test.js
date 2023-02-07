const request = require('supertest');
const mockFs = require('mock-fs');

const { setupStrapi, tearDown } =  require('../helpers/strapi');

const { CONTEXT_PATH_STATIC_ASSETS } = require('../../src/middlewares/static-assets-middleware.js');

jest.setTimeout(20000);

describe('static-assets-middleware', () => {
  const testAssetName = 'dummy-asset.png';
  const testRawAssetUrl = '/uploads/dummy-asset.12345678.png';
  const testRawAssetContent = 'some-dummy-image-content';
  const testLocale = 'en';
  let strapiEntityServiceFindManySpy,
  strapiQuerySpy, strapiQueryFindOneSpy;

  beforeAll(async () => {
    await setupStrapi(); // singleton so it can be called many times

    mockFs({
      [`${strapi.dirs.public}${testRawAssetUrl}`]: Buffer.from(testRawAssetContent, 'utf8'),
    });
  });

  beforeEach(() => {
    strapiEntityServiceFindManySpy = jest.spyOn(strapi.entityService, 'findMany')
      .mockResolvedValue([]);

    strapiQueryFindOneSpy = jest.fn();
    strapiQuerySpy = jest.spyOn(strapi, 'query').mockReturnValue( {
      findOne: strapiQueryFindOneSpy,
    });
  });

  afterEach(() => {
    strapiEntityServiceFindManySpy.mockRestore();
    strapiQuerySpy.mockRestore();
  });
  
  afterAll(async () => {
    mockFs.restore();
    await tearDown();
  });

  it('passes the correct arguments to strapi.entityService.findMany and strapi.query methods', async () => {
    await request(strapi.server)
      .get(`${CONTEXT_PATH_STATIC_ASSETS}/${testAssetName}?locale=${testLocale}`)
      .expect(404)
      .then(() => {
        expect(strapiEntityServiceFindManySpy).toHaveBeenCalledWith('api::localised-asset.localised-asset', {
          filters: { fileName: testAssetName },
          locale: testLocale,
          populate: { file: true },
        });

        expect(strapiQuerySpy).toHaveBeenCalledWith('plugin::upload.file');
        expect(strapiQueryFindOneSpy).toHaveBeenCalledWith({
          where: { name: testAssetName },
        });
    });
  });

  it('responds with the localised asset when found for the specified locale', async () => {
    strapiEntityServiceFindManySpy.mockResolvedValue([{
      file: {
        url: testRawAssetUrl,
      }
    }]);

    await request(strapi.server)
      .get(`${CONTEXT_PATH_STATIC_ASSETS}/${testAssetName}?locale=${testLocale}`)
      .expect(200)
      .then(response => {
        expect(response.body.toString('utf8')).toBe(testRawAssetContent);
      });
  });

  it('responds with the raw asset when the requested asset is in the uploaded files', async () => {
    strapiQueryFindOneSpy.mockResolvedValue({
      url: testRawAssetUrl,
    });

    await request(strapi.server)
      .get(`${CONTEXT_PATH_STATIC_ASSETS}/${testAssetName}?locale=${testLocale}`)
      .expect(200)
      .then(response => {
        expect(response.body.toString('utf8')).toBe(testRawAssetContent);
      });
  });
  
  it('returns NOT_FOUND on non-existing asset request', async () => {
    await request(strapi.server)
      .get(`${CONTEXT_PATH_STATIC_ASSETS}/${testAssetName}`)
      .expect(404);
  });
});
