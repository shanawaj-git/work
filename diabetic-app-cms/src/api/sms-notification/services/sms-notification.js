'use strict';

/**
 * sms-notification service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sms-notification.sms-notification');
