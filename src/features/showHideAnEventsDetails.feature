Feature: Show/Hide Event Details
 Scenario: Event details are hidden by default
  Given the user opens the Meet app
  When the event list is displayed
  Then each event should show only its basic information
  And the event details should be hidden

 Scenario: User can expand an event to see details
  Given the user is viewing the list of events
  When the user clicks on the "Show Details" button for an event
  Then the event details should be displayed

 Scenario: User can collapse an event to hide details
  Given the user has expanded an event to see details
  When the user clicks on the "Hide Details" button for that event
  Then the event details should be hidden again