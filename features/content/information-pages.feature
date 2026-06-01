Feature: Informational and legal pages answer common guest questions
  As a prospective or current guest
  I want clear information about the service and policies
  So that I can book with confidence

  Scenario: The FAQ page answers common operational questions
    Given a visitor opens the FAQ page
    Then the visitor should see frequently asked questions about how the service works
    And the visitor should see answers about virtual guiding, communication, ride planning, park hopping, sold-out dates, and schedule expectations
    And the visitor should be invited to contact the business by email for more questions

  Scenario: The About page explains the service model
    Given a visitor opens the About page
    Then the visitor should learn that My Magical VIP is a virtual Disney touring service
    And the visitor should see what is included in the service day
    And the visitor should see what is not included, such as park admission and Disney Lightning Lane purchases
    And the visitor should see that the service uses Disney Lightning Lane rather than unauthorized access methods

  Scenario: Legal pages remain available from the site footer
    Given a visitor uses the site footer
    Then the visitor should be able to open the Terms and Conditions page
    And the visitor should be able to open the Privacy Policy page
    And the visitor should be able to open the Cancellation Policy page

  Scenario: The Terms page states the operating and purchasing terms
    Given a visitor opens the Terms and Conditions page
    Then the visitor should see that the site is operated by My Magical VIP
    And the visitor should see that the store is hosted on Shopify
    And the visitor should see that service access and purchases are governed by posted terms
    And the visitor should see the disclaimer that the company is not affiliated with Walt Disney

  Scenario: The Privacy Policy explains information handling
    Given a visitor opens the Privacy Policy page
    Then the visitor should see what personal information may be collected
    And the visitor should see that cookies and log data may be used
    And the visitor should see how to contact the business with privacy questions

  Scenario: The Cancellation Policy explains refund timing
    Given a visitor opens the Cancellation Policy page
    Then the visitor should see that cancellations made at least 30 days in advance receive a full refund
    And the visitor should see that cancellations made 15 to 29 days in advance receive a 50 percent refund
    And the visitor should see that cancellations made less than 14 days in advance receive no refund
