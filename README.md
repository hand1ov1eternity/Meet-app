# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



# Meet App

Meet App is a progressive web application (PWA) designed to help users find, view, and manage upcoming events in various cities. With features like offline access, customizable views, and detailed event information, Meet App offers a user-friendly way to stay informed about events.

## Features

1. **Filter Events By City**  
   Users can filter events based on their desired city to see relevant events only.

2. **Show/Hide Event Details**  
   Users can expand or collapse event elements to view more or less information.

3. **Specify Number of Events**  
   Users can control the number of events displayed on the page.

4. **Use the App When Offline**  
   Users can access cached event data when there is no internet connection.

5. **Add an App Shortcut to the Home Screen**  
   Users can install the app as a shortcut on their device home screen for quick access.

6. **Display Charts Visualizing Event Details**  
   Users can view visual charts showing event trends across cities.

## User Stories and Scenarios

### Feature 1: Filter Events By City
**User Story**:  
As a user, I want to filter events by city so that I can see events relevant to my location.

**Scenarios**:

- **Show upcoming events from all cities when no city is searched**:  
  ```gherkin
  Given the user has not entered a city in the search bar,  
  When the app displays events,  
  Then the user should see a list of upcoming events from all cities.  
  ```

- **Show suggestions when searching for a city**:  
  ```gherkin
  Given the user starts typing a city name in the search bar,  
  When the app processes the input,  
  Then the user should see a list of city suggestions.  
  ```

- **Select a city from the suggested list**:  
  ```gherkin
  Given the user sees a list of suggested cities,  
  When the user selects a city from the list,  
  Then the app should display upcoming events only from the selected city.  
  ```

### Feature 2: Show/Hide Event Details
**User Story**:  
As a user, I want to expand or collapse event details so that I can view more or less information as needed.

**Scenarios**:

- **Event element is collapsed by default**:  
  ```gherkin
  Given the user is viewing the list of events,  
  When the events are displayed,  
  Then each event element should be collapsed by default.  
  ```

- **Expand an event to see details**:  
  ```gherkin
  Given the user sees a collapsed event,  
  When the user clicks on the expand button,  
  Then the app should display additional details for that event.  
  ```

- **Collapse an event to hide details**:  
  ```gherkin
  Given the user sees an expanded event,  
  When the user clicks on the collapse button,  
  Then the app should hide the additional details for that event.  
  ```

### Feature 3: Specify Number of Events
**User Story**:  
As a user, I want to specify the number of events displayed so that I can control how many events I see at once.

**Scenarios**:

- **Show 32 events by default**:  
  ```gherkin
  Given the user has not specified the number of events,  
  When the app displays the events list,  
  Then 32 events should be shown by default.  
  ```

- **Change the number of events displayed**:  
  ```gherkin
  Given the user sees a field to specify the number of events,  
  When the user enters a new number and confirms,  
  Then the app should display the specified number of events.  
  ```

### Feature 4: Use the App When Offline
**User Story**:  
As a user, I want to use the app offline so that I can still see previously viewed event data.

**Scenarios**:

- **Show cached data when offline**:  
  ```gherkin
  Given the user has accessed event data previously,  
  And the user is offline,  
  When the app loads,  
  Then the app should display the cached event data.  
  ```

- **Show error when search settings change offline**:  
  ```gherkin
  Given the user is offline,  
  When the user attempts to change the city or number of events,  
  Then the app should display an error message indicating no internet connection.  
  ```

### Feature 5: Add an App Shortcut to the Home Screen
**User Story**:  
As a user, I want to add an app shortcut to my home screen so that I can quickly access the app.

**Scenarios**:

- **Install the app as a shortcut**:  
  ```gherkin
  Given the user is using a browser that supports PWA installation,  
  When the user clicks on the "Add to Home Screen" option,  
  Then the app should install as a shortcut on the user's device home screen.  
  ```

### Feature 6: Display Charts Visualizing Event Details
**User Story**:  
As a user, I want to see charts visualizing event details so that I can better understand event trends.

**Scenarios**:

- **Show a chart with the number of upcoming events in each city**:  
  ```gherkin
  Given the user is viewing the app,  
  When the app displays event data,  
  Then a chart should show the number of upcoming events in each city.  