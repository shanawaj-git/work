const sendTemplateEmail = async ({
  subject,
  text,
  html,
  params,
  recipients,
}) => {
  const emailTemplate = {
    subject,
    text,
    html,
  };
  await strapi.plugins.email.services.email.sendTemplatedEmail(
    {
      to: recipients,
    },
    emailTemplate,
    params
  );
};

module.exports = { sendTemplateEmail };
