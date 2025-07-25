describe('Login Portal', () => {
  let users;

  before(() => {
    cy.fixture('loginUsers').then((data) => {
      users = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('TC001 - Shows the Login page', () => {
    cy.contains('qa.code-quiz.dev').should('exist');
    cy.get('input[placeholder="Enter Username"]').should('exist');
    cy.get('input[placeholder="password"]').should('exist');
    cy.contains('button', 'LOGIN').should('exist');
    cy.contains('If you do not have an account, contact an admin').should('exist');
  });

    it('TC002 - Login with valid credentials', () => {
    const { email, password } = users.validUser;
    cy.get('input[placeholder="Enter Username"]').type(email);
    cy.get('input[placeholder="password"]').type(password);
    cy.wait(500);
    cy.contains('button', 'LOGIN').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Welcome').should('exist');
  });

  it('TC003 - Login with Invalid Credentials', () => {
    const { email, password } = users.invalidUser;
    cy.get('input[placeholder="Enter Username"]').type(email);
    cy.get('input[placeholder="password"]').type(password);
    cy.wait(500);
    cy.contains('button', 'LOGIN').click();

    cy.contains('Invalid email or password').should('be.visible');
  });

  it('TC004 - Login with Empty Fields', () => {
    cy.get('input[placeholder="Enter Username"]').clear();
    cy.get('input[placeholder="password"]').clear();
    cy.wait(500);
    cy.contains('button', 'LOGIN').click();

    cy.contains('Username is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });
  
});