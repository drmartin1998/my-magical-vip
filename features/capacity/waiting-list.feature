Feature: Guests can join a waiting list for unavailable dates
  As a guest who cannot book preferred dates
  I want to request notification for one or more date-and-park combinations
  So that I can be contacted when availability opens up

  Background:
    Given a guest opens the waiting list page

  Scenario: The waiting list explains the purpose and next steps
    Then the guest should see that selected dates are currently unavailable
    And the guest should see that no payment is required to join the waiting list
    And the guest should see that availability will be monitored and shared by email

  Scenario: Guests can request multiple dates and parks
    When the guest adds additional day rows
    Then the guest should be able to enter multiple date-and-park combinations
    And the guest should be able to remove extra day rows while keeping at least one

  Scenario: Waiting list requests validate required information
    When the guest submits without a name
    Then the guest should be told to enter a name
    When the guest submits without a valid email address
    Then the guest should be told to enter a valid email address
    When any day is missing a date or a park
    Then the guest should be told to complete every date-and-park row

  Scenario: Successful waiting list submission confirms the request
    Given the guest provides a valid name, email address, and date-and-park selections
    When the request is submitted successfully
    Then the guest should see a thank-you message
    And the guest should be told they were added to the waiting list
    And the guest should be told they will be notified when dates become available

  Scenario: Failed waiting list submission can be retried
    When the waiting list request fails
    Then the guest should see a message asking them to try again
