module.exports = {
  "api::app-config": {
    controllers: {
      "app-config": {
        find: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "api::order": {
    controllers: {
      order: {
        initialize: {
          enabled: true,
          policy: "",
        },
        confirmPayment: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        find: {
          enabled: false,
          policy: "",
        },
        create: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "api::payment": {
    controllers: {
      payment: {
        initialize: {
          enabled: false,
          policy: "",
        },
        find: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        create: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "api::pharmacy": {
    controllers: {
      pharmacy: {
        find: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "api::prescription": {
    controllers: {
      prescription: {
        upload: {
          enabled: false,
          policy: "",
        },
        find: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        create: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "api::reminder": {
    controllers: {
      reminder: {
        find: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        create: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "api::sms-notification": {
    controllers: {
      "sms-notification": {
        find: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        create: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        delete: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "plugin::content-type-builder": {
    controllers: {
      components: {
        getComponents: {
          enabled: false,
          policy: "",
        },
        getComponent: {
          enabled: false,
          policy: "",
        },
      },
      "content-types": {
        getContentTypes: {
          enabled: false,
          policy: "",
        },
        getContentType: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "plugin::email": {
    controllers: {
      email: {
        send: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "plugin::upload": {
    controllers: {
      "content-api": {
        find: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        destroy: {
          enabled: false,
          policy: "",
        },
        upload: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "plugin::i18n": {
    controllers: {
      locales: {
        listLocales: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
  "plugin::users-permissions": {
    controllers: {
      auth: {
        callback: {
          enabled: false,
          policy: "",
        },
        changePassword: {
          enabled: false,
          policy: "",
        },
        resetPassword: {
          enabled: false,
          policy: "",
        },
        connect: {
          enabled: false,
          policy: "",
        },
        forgotPassword: {
          enabled: false,
          policy: "",
        },
        register: {
          enabled: false,
          policy: "",
        },
        emailConfirmation: {
          enabled: false,
          policy: "",
        },
        sendEmailConfirmation: {
          enabled: false,
          policy: "",
        },
      },
      user: {
        create: {
          enabled: false,
          policy: "",
        },
        update: {
          enabled: false,
          policy: "",
        },
        find: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        count: {
          enabled: false,
          policy: "",
        },
        destroy: {
          enabled: false,
          policy: "",
        },
        me: {
          enabled: false,
          policy: "",
        },
        generateOtp: {
          enabled: false,
          policy: "",
        },
      },
      role: {
        createRole: {
          enabled: false,
          policy: "",
        },
        findOne: {
          enabled: false,
          policy: "",
        },
        find: {
          enabled: false,
          policy: "",
        },
        updateRole: {
          enabled: false,
          policy: "",
        },
        deleteRole: {
          enabled: false,
          policy: "",
        },
      },
      permissions: {
        getPermissions: {
          enabled: false,
          policy: "",
        },
      },
    },
  },
};
