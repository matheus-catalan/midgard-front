export default ({ app, req, nuxtState, $vuetify }) => {
  if (process.client) {
    return {
      icons: {
        iconfont: "fa",
      },
      theme: {
        light: true,
        dark: false,
        themes: {
          light: {
            primary_color: "#FB6376",
            secondary_color: "#FFD7C8",
            primary_background_color: "#fff9ec",
            secondary_background_color: "#FCB1A6",
            primary_font_color: "#5D2A42",
            secondary_font_color: "#994056",
          },
          dark: {
            primary_color: "#E72576",
            secondary_color: "#DEDC00",
            primary_dark_background_color: "#585857",
            secondary_dark_background_color: "#1C1C1C",
            primary_light_color: "#F6F7FB",
            primary_font_color: "#FFFFFF",
            secondary_font_color: "#525252",
            container_signin: "#fff",
          },
        },
        options: {
          customProperties: true,
        },
      },
      rtl: false,
    };
  }

  return {
    icons: {
      iconfont: "fa",
    },
    theme: {
      light: true,
      dark: false,
      options: {
        customProperties: true,
      },
    },
    rtl: false,
  };
};
