const Strapi = require('@strapi/strapi');
const http = require('http');
const fs = require('fs');

let instance;

async function setupStrapi() {
    if (!instance) {
        await Strapi().load();
        instance = strapi;

        await instance.server.mount();
    }
    return instance;
}


async function tearDown() {
    const dbSettings = strapi.config.get("database.connections.default.settings");

    //close server to release the db-file
    await strapi.server.httpServer.close();

    //delete test database after all tests have completed
    if (dbSettings && dbSettings.filename) {
        const tmpDbFile = `${__dirname}/../${dbSettings.filename}`;
        if (fs.existsSync(tmpDbFile)) {
            fs.unlinkSync(tmpDbFile);
        }
    }
    // close the connection to the database
    await strapi.db.connection.destroy();
}

module.exports = {setupStrapi, tearDown};
