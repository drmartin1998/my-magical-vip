Feature: Guests choose parks for each selected day
  As a guest with chosen trip dates
  I want to assign Disney parks to each service day
  So that My Magical VIP can plan the trip correctly

  Scenario: Park selection requires booking context
    Given a visitor opens park selection without selected dates or a package
    Then the visitor should be returned to the homepage

  Scenario: Park selection explains the booking rules
    Given a guest arrives with valid selected dates
    Then the guest should see each selected date listed separately
    And the guest should see the four supported Disney parks for every date
    And the guest should see that each day allows up to two parks
    And the guest should see that park hopping requires the appropriate Disney reservation
    And the guest should see that the service is limited to ten guests per party

  Scenario: Guests can choose up to two parks per day
    When the guest selects one park for a day
    Then the day should show that one park is selected and one more can be added
    When the guest selects a second park for that same day
    Then the day should show that the two-park maximum has been reached
    And the remaining unselected parks for that day should become unavailable

  Scenario: Guests can change selections independently by day
    When the guest selects different parks on different dates
    Then each date should keep its own independent park selections
    And removing one park from a full day should make the remaining parks available again

  Scenario: Every selected day must have at least one park before the guest can continue
    When the guest tries to continue without choosing a park for every date
    Then the guest should be told to select at least one park for each day

  Scenario: Confirming park choices advances the booking flow
    Given the guest has chosen at least one park for every selected date
    When the guest confirms the park choices
    Then the guest should be taken to booking confirmation
    And the selected dates, park choices, package, and product type should be preserved
