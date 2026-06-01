Feature: Typical Days shows sample park itineraries
  As a prospective guest
  I want to see what a guided day can look like in each park
  So that I can understand the value of the service

  Background:
    Given a visitor opens the Typical Days page

  Scenario: All four Walt Disney World parks are represented
    Then the visitor should see a typical day for Magic Kingdom
    And the visitor should see a typical day for EPCOT
    And the visitor should see a typical day for Hollywood Studios
    And the visitor should see a typical day for Animal Kingdom

  Scenario: Each park page section describes what the service can accomplish
    Then each park section should list sample attractions and experiences
    And each park section should explain how the day is typically planned

  Scenario: The page explains that days can be customized
    Then the visitor should see that itineraries can be customized
    And the visitor should see examples such as character meets, dining, shows, parades, shopping, and child-friendly attractions

  Scenario: Typical Days provides multiple booking calls to action
    Then each park section should offer a Book Now action
    And the page should offer a Get Started Today action
    And those actions should route the visitor into the booking flow
