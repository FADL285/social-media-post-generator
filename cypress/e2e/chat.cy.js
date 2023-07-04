describe("Customer Support Bot 🤖 Testing...", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("should open chat widget if the chat icon was clicked", () => {
    cy.get('[data-test="chat-widget-box"]').should("not.exist")
    cy.get('[data-test="chat-widget-button"]').click()
    cy.get('[data-test="chat-widget-box"]').should("be.visible")
  })

  it("should display user message on input + enter and display bots responses", () => {
    // Test Data
    const message = "Hello, I'm a test message"
    const botResponse =
      "Hello! How can I assist you today with the 'Social Media Post Generator' application?"

    // Intercept the request and return a fixture
    cy.intercept("POST", "/api/ai", {
      fixture: "customer-support-response.json"
    }).as("ai-request")

    // Test Logic
    cy.get('[data-test="chat-widget-button"]').click()
    cy.get('[data-test="chat-widget-input"]')
      .should("be.visible")
      .type(`${message}{enter}`)

    // wait for the request to finish and check if the response returned successfully
    cy.wait("@ai-request").its("response.statusCode").should("equal", 200)
    
    cy.get(
      '[data-test="chat-bubble"]:last-of-type [data-test="chat-bubble-message"] p'
    ).should("contain.text", botResponse)
  })

  // it("should close chat widget if the close button was clicked", () => {})
})
