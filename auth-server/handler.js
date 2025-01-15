'use strict';

const { google } = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID, REDIRECT_URI } = process.env;
const redirect_uris = [
  REDIRECT_URI || "https://meet-app-rust.vercel.app"
];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

module.exports.getCalendarEvents = async (event) => {
  // Decode the access token from the path parameters
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  // Set the access token as credentials in oAuth2Client
  oAuth2Client.setCredentials({ access_token });

  // Return a new Promise for asynchronous operations
  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(), // Fetch events starting from now
        singleEvents: true, // Expand recurring events into single events
        orderBy: "startTime", // Order by event start time
      },
      (error, response) => {
        if (error) {
          return reject(error); // Reject promise with the error
        }
        return resolve(response); // Resolve promise with the response
      }
    );
  })
    .then((results) => {
      // Respond with the fetched calendar events
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }), // Format the event data
      };
    })
    .catch((error) => {
      // Handle errors if the promise is rejected
      let errorMessage = "An error occurred while fetching calendar events.";
      if (error.response) {
        // Handle API errors (e.g., rate limit, authentication issues)
        errorMessage = error.response.data.error.message || errorMessage;
      } else if (error.message) {
        // Handle network errors or unexpected issues
        errorMessage = error.message;
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: errorMessage,
          error: error.message || "Unknown error",
        }),
      };
    });
};
