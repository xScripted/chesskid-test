module.exports = {
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_main.scss";
        `
      }
    }
  },

  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "ChessKid | Miquel Toran";
          return args;
      })
  }

}
