const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
	env: {
		name: process.env.CY_NAME,
		email: process.env.CY_EMAIL,
		password: process.env.CY_PASSWORD,
	},
	e2e: {
		setupNodeEvents() {},
		baseUrl: "http://localhost:8080/",
	},
	waitForAnimations: true,
	animationDistanceThreshold: 1,
	responseTimeout: 30000,
});
