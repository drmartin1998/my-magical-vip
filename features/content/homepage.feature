Feature: Homepage introduces the My Magical VIP service
  As a prospective guest
  I want the homepage to explain the service and available packages
  So that I can decide whether to start a booking

  Background:
    Given a visitor opens the My Magical VIP homepage

  Scenario: The homepage explains the service and offers a discovery path
    Then the visitor should see the My Magical VIP brand
    And the visitor should see the promise to plan their next magical adventure
    And the visitor should see an overview of the virtual VIP service
    And the visitor should be able to open the Typical Days page from the hero section

  Scenario: The homepage presents bookable packages
    Then the visitor should see an Available Packages section
    And the visitor should see at least five package cards
    And each package card should include a package name, duration, description, price, and a Get Started action

  Scenario: The homepage builds trust with social proof and service steps
    Then the visitor should see customer testimonials
    And the visitor should see a seven-step explanation of how a magical day works with the service

  Scenario: The homepage footer provides essential navigation and disclosures
    Then the visitor should be able to navigate to the main site pages from the footer
    And the visitor should be able to open the legal pages from the footer
    And the visitor should see the contact email address
    And the visitor should see the Facebook link
    And the visitor should see the copyright notice and brand disclaimer
