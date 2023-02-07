import AuthLogo from "./extensions/mpclogo.png";
import MenuLogo from "./extensions/mpcicon.png";
import favicon from "./extensions/mpcicon.png";
export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: MenuLogo,
    },
    // Override or extend the theme
    theme: {
      colors: {
        primary100: "#FAFAFA",
        primary200: "#FAFAFA",
        primary500: "#FAFAFA",
        primary600: "#008080",
        primary700: "#050C09",
        neutral100: "#FAFAFA",
        buttonPrimary500: "#00664F",
        buttonPrimary600: "#00664F",
      },
    },

    // Extend the translations
    translations: {
      en: {
        "Auth.form.welcome.title": "MPC Pharmacy",
        "Auth.form.welcome.subtitle": "Login with your credentials",
        "app.components.LeftMenu.navbrand.title": "MPC Pharmacy",
        "app.components.LeftMenu.navbrand.workplace": "@anext-diabetic-cms",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { release: false },
    contentTypesToShow: [
      {
        label: "No General",
        destination: "app.components.LeftMenu.general",
      },
    ],
  },

  bootstrap() {},
};
