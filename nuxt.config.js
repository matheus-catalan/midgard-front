import colors from "vuetify/es5/util/colors";
import { POSITION } from "vue-toastification";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "midgard",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: ["@nuxtjs/vuetify"],
  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    [
      "vue-toastification/nuxt",
      {
        position: POSITION.TOP_CENTER,
        "z-index": "999999999999999",
      },
    ],
  ],
  axios: {
    baseURL: "http://localhost:8080/v1",
  },
  vuetify: {
    optionsPath: "./vuetify.options.js",
    options: {
      customProperties: true,
    },
  },
  auth: {
    rewriteRedirects: true,
    resetOnError: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/sessions",
            method: "post",
            propertyName: "session.token",
            credentials: true,
          },
          user: { url: "/sessions/me", method: "get" },
          logout: {
            url: "/sessions",
            method: "delete",
            propertyName: "token",
            credentials: true,
          },
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        redirect: {
          login: "/",
          logout: "/",
          home: "/user",
        },
      },
    },
  },
  build: {},
};
