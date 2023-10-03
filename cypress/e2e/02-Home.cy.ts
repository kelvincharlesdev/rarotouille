describe("Home Component", () => {
  beforeEach(() => {
    cy.visit("seu-local-host/home"); //Troque para o seu :)
  });

  it("should render the Home component correctly", () => {
    cy.get(".teste").should("exist"); 
    cy.get(".teste").should("contain", "Home Slogan Text");
  });

  it("should interact with SectionDishesClose", () => {
    cy.get(".section-dishes-close").should("be.visible");

    cy.get(".section-dishes-close button").click();

    cy.get(".modal").should("be.visible");

  });

  it("should test the SectionFavoritesCarousel", () => {
    cy.get(".section-favorites-carousel").should("be.visible");

    cy.get(".section-favorites-carousel .next-button").click();

    cy.get(".section-favorites-carousel .carousel-item").should(
      "have.length.gt",
      0
    );
  });

  it("should test HomeDishes", () => {
    cy.get(".home-dishes").should("be.visible");
    cy.get(".home-dishes .category-button").first().click();
    cy.get(".home-dishes .dish").should("be.visible");
  });

  it("should test SectionMap", () => {
    cy.get(".section-map").should("be.visible");

    cy.get(".section-map .map-marker").first().click();

    cy.get(".location-details").should("be.visible");
  });
});
