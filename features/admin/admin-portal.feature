Feature: Authenticated administrators manage bookings, blackout dates, and waiting list requests
  As an authenticated administrator
  I want operational tools for bookings and availability
  So that I can manage guest demand and service capacity

  Scenario: The admin dashboard exposes the main management areas
    Given an authenticated administrator opens the admin dashboard
    Then the administrator should see links for Waiting List, Blackout Dates, and Bookings

  Scenario: Administrators can manage waiting list entries
    Given an authenticated administrator opens the waiting list area
    Then the administrator should see each entry's id, name, email, date, and park
    And the administrator should be able to delete an entry after confirming the action
    And the administrator should see an empty state when no entries exist

  Scenario: Administrators can manage blackout dates
    Given an authenticated administrator opens the blackout dates area
    Then the administrator should be able to create a blackout date by selecting a date
    And the administrator should see success or error feedback for create and delete actions
    And the administrator should be able to filter blackout dates by date range, year, and month
    And the administrator should be able to sort and paginate the blackout date list

  Scenario: Administrators can review bookings with search and filters
    Given an authenticated administrator opens the bookings area
    Then the administrator should see the total number of bookings
    And the administrator should be able to search by order, line item, park, attraction, or type
    And the administrator should be able to filter bookings by park, type, and date range
    And the administrator should be able to sort and paginate the bookings list

  Scenario: Admin APIs require authentication
    When an unauthenticated request is made to an admin waiting list, blackout date, or bookings API
    Then the request should be rejected as unauthorized
