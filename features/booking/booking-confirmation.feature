Feature: Guests review their booking before checkout
  As a guest who finished park selection
  I want to review my booking and accept the terms
  So that I can continue to checkout with the correct reservation details

  Scenario: Booking confirmation requires complete booking context
    Given a visitor opens booking confirmation without dates, parks, or a package
    Then the visitor should be returned to the homepage

  Scenario: Guests can review all selected dates and parks
    Given a guest arrives with valid booking details
    Then the guest should see every selected date in order
    And the guest should see the parks chosen for each date

  Scenario: Terms must be accepted before checkout can continue
    Given a guest is reviewing the booking
    Then the guest should see a terms and conditions agreement
    And the guest should be able to open the Terms and Conditions page
    And the Confirm Booking action should remain unavailable until the guest agrees to the terms

  Scenario: Accepted terms allow the guest to continue to checkout
    Given a guest agrees to the terms and conditions
    When the guest confirms the booking
    Then the selected dates and parks should be saved for the current session
    And the checkout request should include the booked dates, a unique line item identifier, and the product type
    And the guest should be redirected to the Shopify checkout URL when cart creation succeeds

  Scenario: Guests are informed when checkout cannot be started
    When checkout creation fails
    Then the guest should see a message asking them to try again
