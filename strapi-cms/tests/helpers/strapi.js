const Strapi  = require('@strapi/strapi');
const http = require('http');
const fs = require('fs');

let instance;

async function setupStrapi() {
  if (!instance) {
    /** the following code is copied from `./node_modules/@strapi/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    const app = instance.server.app;
    await app
      .use(instance.server.router.routes()) // populate KOA routes
      .use(instance.server.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(app.callback());
  }
  return instance;
}

async function tearDown() {
    const dbSettings = strapi.config.get('database.connections.default.settings');
    
    //close server to release the db-file
    await strapi.server.close();
  
    //delete test database after all tests
    if (dbSettings && dbSettings.filename) {
      const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
      if (fs.existsSync(tmpDbFile)) {
        fs.unlinkSync(tmpDbFile);
      }
    }
}

module.exports = { setupStrapi, tearDown };
