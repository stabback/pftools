const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Personal Finance Tools',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/nuxt-client-init'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit',
    ['@nuxtjs/google-analytics', {
      id: 'UA-131490787-1'
    }],
    [
      'nuxt-fire',
      {
        config: {
          production: {
            apiKey: "AIzaSyAJUCu5cc0jt9WYXL7hY9YwGs_BlzjYiI0",
            authDomain: "stabback-pftools-dev.firebaseapp.com",
            databaseURL: "https://stabback-pftools-dev.firebaseio.com",
            projectId: "stabback-pftools-dev",
            storageBucket: "stabback-pftools-dev.appspot.com",
            messagingSenderId: "19478447333"
          },
          development: {
            apiKey: "AIzaSyCyXMZSUYd9QgMEi_FWIs_APj4GbEDkbZ8",
            authDomain: "stabback-pftools.firebaseapp.com",
            databaseURL: "https://stabback-pftools.firebaseio.com",
            projectId: "stabback-pftools",
            storageBucket: "stabback-pftools.appspot.com",
            messagingSenderId: "566846405350"
          }
        }
      }
    ]
  ],

  markdownit: {
    injected: true
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
