const contentful = require('contentful');

const config = {
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
};

module.exports = {
	createClient() {
		return contentful.createClient(config);
	}
};
