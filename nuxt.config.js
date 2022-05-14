export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target: 'static',

  head: {
    title: 'front_campfire_web',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no, viewport-fit-cover' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    ],
    script: [
      {type:'text/javascript', src:'https://unpkg.com/phosphor-icons'},
      {src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",type: "text/javascript"},
    ],
  },


  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~assets/scss/index.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/fontawesome.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    // ['@nuxtjs/vuetify', {}],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
  }
}
