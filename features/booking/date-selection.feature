Feature: Guests select trip dates before booking
  As a guest choosing a package
  I want to select the right number of available dates
  So that I can continue into the booking flow

  Background:
    Given a guest starts from a package card on the homepage

  Scenario: Starting a package opens a date picker
    When the guest chooses Get Started for a package
    Then the guest should see a trip date picker
    And the guest should see the current month
    And the guest should be able to move between months within the booking window

  Scenario: Guests can only select the number of dates included in their package
    Given the package allows a fixed number of service days
    When the guest selects available dates
    Then the guest should be able to select up to that number of dates
    And the guest should be able to remove a selected date before confirming
    And the guest should only be allowed to confirm after selecting the required number of dates

  Scenario: Unavailable dates cannot be booked
    Then past dates should not be selectable
    And dates more than 12 months ahead should not be selectable
    And blackout dates should not be selectable

  Scenario: Guests can request help when dates are full
    Given blackout dates exist
    Then the date picker should invite the guest to join the waiting list

  Scenario: Confirming dates advances the guest to park selection
    When the guest confirms the required number of dates
    Then the guest should be taken to park selection
    And the selected dates should be carried into the next step
