const path = require('path');
const url = require('url');

const CONTEXT_PATH_STATIC_ASSETS = '/static/assets';

const staticAssetsMiddlewareModule = module.exports = (config, { strapi })=> {

    const findLocalisedAssetFile = async (fileName, locale) => {
        const localisedAsset = await strapi.entityService.findMany('api::localised-asset.localised-asset', {
            filters: { fileName },
            locale,
            populate: { file: true },
          });
        
        // ideally it should have only one entry if found, hence returning first
        return localisedAsset.length > 0 ? localisedAsset[0].file : null;
    };
    
    const findRawAssetFile = async (fileName) => {
        return await strapi.query('plugin::upload.file').findOne({
            where: { name: fileName },
        });
    };

    const staticAssetsHandler = async (context, next) => {
      const reqUrl = url.parse(context.url, true);
      const fileName = path.basename(reqUrl.pathname);

      const [localisedAssetFile, rawAssetFile] = await Promise.all([
          findLocalisedAssetFile(fileName, reqUrl.query.locale),
          findRawAssetFile(fileName),
        ]);

      context.url = (localisedAssetFile || rawAssetFile || context).url;
      
      await next();
    }
    
    strapi.server.routes([
        {
          method: 'GET',
          path: `${CONTEXT_PATH_STATIC_ASSETS}/(.*)`,
          handler: staticAssetsHandler,
          config: { auth: false },
        }
      ]);

    return null;
};

staticAssetsMiddlewareModule.CONTEXT_PATH_STATIC_ASSETS = CONTEXT_PATH_STATIC_ASSETS;
