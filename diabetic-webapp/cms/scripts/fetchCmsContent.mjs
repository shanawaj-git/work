import fetch from 'node-fetch';
import fs from 'fs';
import { STRAPI_URL } from '../config.mjs';

const JSON_SPACING = 4;

const getCmsUrl = () => {
  const { NODE_ENV = 'development' } = process.env;

  return STRAPI_URL[NODE_ENV];
};

export const fetchContent = async ({
  locale = 'en',
  appName = 'escribe-webapp',
  contentType = 'messages',
  outputDirectory = `app/translations/${locale}.json`,
}) => {
  console.log(
    `${getCmsUrl()}/api/${contentType}?locale=${locale}&filters[app][name][$eq]=${appName}`,
  );
  const data = await fetch(
    `${getCmsUrl()}/api/${contentType}?locale=${locale}&filters[app][name][$eq]=${appName}`,
  );
  const responseBody = await data.json();
  const parsedData = transformDataToKeyValuePairs(responseBody);

  fs.writeFile(
    outputDirectory,
    JSON.stringify(parsedData, null, JSON_SPACING),
    err => {
      if (err) {
        console.error(err);
        return;
      }
    },
  );
};

const transformDataToKeyValuePairs = ({ data }) => {
  const keyValuePairArray = data
    .map(item => item.attributes)
    .map(attribute => ({
      [attribute.code]: attribute.value,
    }));

  return Object.assign({}, ...keyValuePairArray);
};
