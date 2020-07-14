module.exports = {
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/_vars.scss";`,
      },
    },
  },
};
