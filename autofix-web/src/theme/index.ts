const PRIMARY_COLOR = "#E3F607";
const SECONDARY_COLOR = "#050C09";
const borderColor = "#dcdcdc33";

export const autoFixTheme = {
  color: {
    c100: PRIMARY_COLOR,
    c200: "#FFFFFF",
    c300: "#E8E8E6",
    c400: "#9A9D9D",
    c500: "#FAFAF7",
    p100: "#F6FAFB",
    p200: "#FCF7F7",
    p300: PRIMARY_COLOR,
    p400: "#535858",
    p500: "#FFFFFFCC",
    p600: SECONDARY_COLOR,
    p700: "#1F2222",
    p800: "#2E4341",
    b100: borderColor,
    e100: "#949E9B",
    e101: "#949E9B66",
  },
  overrides: {
    button: {
      backgroundColor: PRIMARY_COLOR,
      borderRadius: "4px",
      color: SECONDARY_COLOR,
    },
  },
};
