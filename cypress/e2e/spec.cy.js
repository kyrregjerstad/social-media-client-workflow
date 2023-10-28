describe("template spec", () => {
	const name = Cypress.env("name");
	const email = Cypress.env("email");
	const password = Cypress.env("password");

	beforeEach(() => {
		cy.visit("/", { timeout: 30000 });
	});

	it("goes to the home page", () => {
		cy.get("#registerModalLabel").should("be.visible");
	});

	it("does not log in with wrong credentials", () => {
		cy.get("#registerModalLabel").contains("Create Profile").should("be.visible");
		cy.get("#registerModalLabel").contains("Create Profile").click(); // workaround for login button not being clickable in cypress
		cy.get("#registerForm").contains("Login").click();

		cy.get("#loginModalLabel").contains("Login").should("be.visible");

		cy.wait(300);
		cy.get("#loginEmail").click();
		cy.get("#loginEmail").type(email);
		cy.get("#loginPassword").click();
		cy.get("#loginPassword").type("wrong_password");
		cy.get("#loginForm > .modal-footer > .btn-success").click();

		cy.on("window:alert", (str) => {
			expect(str).to.equal(`Either your username was not found or your password is incorrect`);
		});
	});

	it("logs in", () => {
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
		cy.url().should("include", "?view=profile&name=noroff_test_user");
		cy.get("h4").contains("noroff_test_user").should("be.visible");
		cy.get("span").contains("noroff-test-user@noroff.no").should("be.visible");
	});
});
