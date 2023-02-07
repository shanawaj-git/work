module.exports = {
  "api::order": {
    controllers: {
      order: {
        initialize: {
          enabled: true,
        },
        confirmPayment: {
          enabled: true,
        },
        findOne: {
          enabled: true,
        },
      },
    },
  },
  "api::payment": {
    controllers: {
      payment: {
        initialize: {
          enabled: true,
        },
      },
    },
  },
  "api::prescription": {
    controllers: {
      prescription: {
        upload: {
          enabled: true,
        },
      },
    },
  },
  "api::pharmacy": {
    controllers: {
      pharmacy: {
        find: {
          enabled: true,
        },
      },
    },
  },
};
