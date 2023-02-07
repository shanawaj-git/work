module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: env("SMTP_HOST"),
        port: env("SMTP_PORT"),
        logger: true,
        auth: {
          user: env("EMAIL_USER"),
          pass: env("EMAIL_PASS"),
        },
      },
      settings: {
        defaultFrom: env("EMAIL_FROM_ID"),
        defaultReplyTo: env("EMAIL_REPLY_TO_ID"),
      },
    },
  },
});

