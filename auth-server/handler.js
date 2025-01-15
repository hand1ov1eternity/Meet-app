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
  const accessToken = decodeURIComponent(`${event.pathParameters.access_token}`);

  // Return a new Promise for asynchronous operations
  return new Promise((resolve, reject) => {
    // Skeleton for fetching calendar events will go here
    // Use the access token and calendar API to get the events
    oAuth2Client.setCredentials({ access_token: accessToken });

    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        maxResults: 10, // Limit the results (adjust as needed)
        timeMin: new Date().toISOString(), // Fetch events from current time
      },
      (error, res) => {
        if (error) {
          return reject(error);
        }
        return resolve(res.data);
      }
    );
  })
    .then((results) => {
      // Respond with calendar events
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      // Handle errors
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};
