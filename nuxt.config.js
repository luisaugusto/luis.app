export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Luis Augusto',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://luis.codes/banner.jpg'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://luis.codes'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'Luis Augusto'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Luis Augusto'
      }
    ],
    link: [
      { rel: 'icon', href: '/favicon.svg' },
      { rel: 'mask-icon', href: '/favicon.svg', color: '#F1FAEE' },
      { hid: 'canonical', rel: 'canonical', href: 'https://luis.codes' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/font-awesome'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],
  pwa: {
    meta: {
      theme_color: '#1D3557'
    },
    manifest: {
      name: 'luis.codes',
      short_name: 'luis.codes',
      background_color: '#1D3557',
      theme_color: '#1D3557'
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
