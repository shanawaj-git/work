import axios from 'axios';

/**
 * This method fetches config from /config endpoint
 */

let config = {};

const initEnvironmentConfig = async () => {
  config = (await axios.get('/config')).data;
};

const getEnvironmentConfig = () => config;

export { initEnvironmentConfig, getEnvironmentConfig };
