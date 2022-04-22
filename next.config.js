/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		ENDPOINT: process.env.ENDPOINT,
		GRAPH_CMS_TOKEN: process.env.GRAPH_CMS_TOKEN,
	},
	images: {
		domains: ["media.graphassets.com"],
	},
};

module.exports = nextConfig;
