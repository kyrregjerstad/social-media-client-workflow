describe("template spec", () => {
	it("goes to the home page", () => {
		cy.visit("/");
		cy.get("footer").contains("Noroff FEU");
	});
});
