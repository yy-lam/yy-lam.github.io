/*const withPlugins = require('next-compose-plugins')*/
/*const optimizedImages = require('next-optimized-images')*/

/*module.exports = withPlugins([*/
/*[*/
/*optimizedImages,*/
/*{*/
/*[> config for next-optimized-images <]*/
/*optimizedImages: false*/
/*}*/
/*]*/

/*// your other plugins here*/
/*])*/
module.exports = {
  //basePath: '/~ylam04',
  assetPrefix: '.',
  images: {
    loader: 'akamai',
    path: ''
  }
}
