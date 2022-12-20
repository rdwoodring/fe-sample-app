/// <reference types="cypress" />

describe('happy path', () => {
  it('runs happy path successfully', () => {
    cy.visit('/');
    cy.getTestEl('table_link').should('be.visible');
    cy.getTestEl('you_go_link').should('be.visible');
    cy.getTestEl('policyholders_link').should('be.visible');

    cy.intercept('GET', 'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders')
      .as('post');

    cy.getTestEl('policyholders_link').click();

    cy.contains('body', 'Mrs. Holder');

    cy.get('@post')
      .its('response')
      .then((res) => {
        expect(res.statusCode).to.equal(200);
      });

    cy.get('body').should('contain', 'Mrs. Holder');
    cy.get('body').should('contain', '29');
    cy.get('body').should('contain', '123 Lane Ave, 3H, Santa Monica, CA 90405');
    cy.get('body').should('contain', '1-989-989-9898');
    cy.get('body').should('contain', 'true');

    /**
     * TODO: Challenge 10 - Update this test
     * - Click the Policyholders sidebar link
     * - Assert that a network request is made
     * - Assert that data from the network is displayed
     */
  });
});
