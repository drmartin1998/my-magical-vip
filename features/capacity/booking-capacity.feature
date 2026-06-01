Feature: Booking capacity and blackout dates are managed automatically
  As the business
  I want booked capacity and full dates reflected consistently
  So that guests only select dates that are still available

  Scenario: Public availability exposes blackout dates to the calendar
    Given blackout dates exist in the system
    When a guest opens the date picker
    Then those dates should be marked unavailable for selection

  Scenario: Completed bookings create appointments for each booked day
    Given a paid Shopify order includes booked dates and parks
    When the checkout webhook is accepted
    Then an appointment should be created for each booked date entry
    And each appointment should store the Shopify order, line item, date, park selection, and product type

  Scenario: Full dates become blackout dates for standard bookings
    Given a non-Multi-Pass booking is processed
    When a date reaches three or more appointments
    Then that date should be recorded as a blackout date

  Scenario: Multi-Pass bookings do not create blackout dates
    Given a booking has the product type Multi-Pass
    When the checkout webhook is accepted
    Then appointments should still be created
    But the booked dates should not be turned into blackout dates by that booking
