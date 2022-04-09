module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://www.api.sumontech.com',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/' },
      },
    },
  },
}
