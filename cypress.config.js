const { defineConfig } = require("cypress");
require("dotenv").config();
console.log(process.env); // remove this after you've confirmed it is working

module.exports = defineConfig({
	env: {
		name: process.env.CY_NAME,
		email: process.env.CY_EMAIL,
		password: process.env.CY_PASSWORD,
	},
	e2e: {
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		baseUrl: "http://localhost:8080/",
	},
	waitForAnimations: true,
	animationDistanceThreshold: 1,
	responseTimeout: 30000,
});
