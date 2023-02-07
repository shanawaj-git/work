const Handlebars = require("handlebars");

const getMessageText = async (MessageTemplate, params) => {
  const messageTemplate = await retrieveTemplate(MessageTemplate);
  const templateFunction = Handlebars.compile(messageTemplate);
  return templateFunction(params);
};

const retrieveTemplate = async (messageTemplate) => {
  const response = await strapi.query("api::app-config.app-config").findOne();
  const template = response[messageTemplate];
  if (!template) {
    throw new Error(
      `Template is not defined for ${messageTemplate} in App Config`
    );
  }
  return template;
};

module.exports = { getMessageText };
