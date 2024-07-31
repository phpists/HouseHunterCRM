module.exports = {
  staticFileGlobs: [
    "build/static/js/*.js",
    "build/static/css/*.css",
    "build/index.html",
    "/",
  ],
  stripPrefix: "build/",
  runtimeCaching: [
    {
      urlPattern: /this\\.is\\.a\\.regex/,
      handler: "networkFirst",
    },
  ],
};
