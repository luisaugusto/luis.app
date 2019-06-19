export default {
	mode: 'universal',
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
				hid: 'og:image',
				property: 'og:image',
				content: 'https://luis.codes/photos/banner.jpg'
			}
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'canonical', href: 'https://luis.codes' },
			{
				rel: 'stylesheet',
				href:
          'https://fonts.googleapis.com/css?family=Major+Mono+Display|Montserrat:400,700'
			}
		]
	},
	env: {
		CTF_SPACE_ID: process.env.CTF_SPACE_ID,
		CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN
	},
	loading: { color: '#fff' },
	css: ['@/assets/global.scss'],
	plugins: ['~/plugins/font-awesome', '~/plugins/observe-visibility'],
	modules: [
		// Doc: https://axios.nuxtjs.org/usag
		'@nuxtjs/axios',
		'@nuxtjs/pwa',
		'@nuxtjs/eslint-module',
		'@nuxtjs/dotenv'
	],
	axios: {},
	build: {
		extend(config, ctx) {}
	}
};