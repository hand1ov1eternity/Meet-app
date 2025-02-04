Feature: Specify Number of Events
 Scenario: Show 32 events by default
  Given the user has not specified the number of events  
  When the app displays the events list 
  Then 32 events should be shown by default

Scenario: Change the number of events displayed
 Given the user sees a field to specify the number of events 
 When the user enters a new number and confirms  
 Then the app should display the specified number of events