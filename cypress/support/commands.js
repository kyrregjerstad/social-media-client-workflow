// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
Cypress.Commands.add("login", ({ email, password, name }) => {
	cy.session([email, password, name], () => {
		cy.visit("/", { timeout: 30000 });
		cy.get("#registerModalLabel").contains("Create Profile").should("be.visible");
		cy.get("#registerModalLabel").contains("Create Profile").click(); // workaround for login button not being clickable in cypress
		cy.get("#registerForm").contains("Login").click();

		cy.get("#loginModalLabel").contains("Login").should("be.visible");

		cy.wait(300);
		cy.get("#loginEmail").click();
		cy.get("#loginEmail").type(email);
		cy.get("#loginPassword").click();
		cy.get("#loginPassword").type(password);
		cy.get("#loginForm > .modal-footer > .btn-success").click();

		cy.get("#loginModalLabel").should("not.be.visible");
		cy.url().should("include", "?view=profile&name=" + name);
		cy.get("h4").contains(name).should("be.visible");
		cy.get("span").contains(email).should("be.visible");
	});
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
