import contentful from './.contentful.json';

export default {
	mode: 'universal',
	/*
   ** Headers of the page
   */
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description || ''
			}
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},
	/*
   ** Customize the progress-bar color
   */
	loading: { color: '#fff' },

	env: {
		CONTENTFUL_SPACE_ID: contentful.CONTENTFUL_SPACE_ID,
		CONTENTFUL_ACCESS_TOKEN: contentful.CONTENTFUL_ACCESS_TOKEN
	},

	/*
   ** Global CSS
   */
	css: [],
	/*
   ** Plugins to load before mounting the App
   */
	plugins: [
		'~/plugins/font-awesome',
		'~/plugins/observe-visibility',
		'~/plugins/scroll-to'
	],
	/*
   ** Nuxt.js modules
   */
	modules: [
		// Doc: https://axios.nuxtjs.org/usag
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/eslint-module'
	],
	/*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
	axios: {},
	/*
   ** Build configuration
   */
	build: {
		/*
     ** You can extend webpack config here
     */
		extend(config, ctx) {}
	}
};
