/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import NProgress from "nprogress";
import "nprogress/nprogress.css"; 
import mockData from "./mock-data";

/**
 * Extracts unique locations from an array of events.
 * @param {Array} events - The events array.
 * @returns {Array} - A list of unique locations.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

/**
 * Checks if an access token is valid.
 * @param {string} accessToken - The access token.
 * @returns {Promise<Object>} - The token validation result.
 */
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  return await response.json();
};

/**
 * Fetches event data for the app.
 *
 * In local development or when demo mode is enabled, mock data is returned.
 * In production, the function attempts to fetch events from the Google Calendar API
 * via the AWS API Gateway backend. If the request fails, returns cached events from
 * localStorage or falls back to mock data.
 *
 * @returns {Promise<Array>} A list of event objects.
 */
export const getEvents = async () => {
  const forceMockData =
    window.location.href.startsWith("http://localhost") ||
    import.meta.env.VITE_USE_DEMO_DATA === "true";

  if (forceMockData) {
    return mockData;
  }

  if (!navigator.onLine) {
    const storedEvents = localStorage.getItem("lastEvents");
    return storedEvents ? JSON.parse(storedEvents) : mockData;
  }

  try {
    const token = await getAccessToken();

    if (!token) {
      return mockData;
    }

    removeQuery();

    const encodedToken = encodeURIComponent(token);
    const url = `https://02nicropke.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${encodedToken}`;

    NProgress.start();

    const response = await fetch(url);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      console.error("Failed to fetch events:", response.status, errorBody);

      const storedEvents = localStorage.getItem("lastEvents");
      return storedEvents ? JSON.parse(storedEvents) : mockData;
    }

    const result = await response.json();

    if (Array.isArray(result?.events) && result.events.length > 0) {
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    }

    console.warn("No events returned from Google Calendar. Using fallback data.");

    const storedEvents = localStorage.getItem("lastEvents");
    return storedEvents ? JSON.parse(storedEvents) : mockData;
  } catch (error) {
    console.error("Error fetching events:", error);

    const storedEvents = localStorage.getItem("lastEvents");
    return storedEvents ? JSON.parse(storedEvents) : mockData;
  } finally {
    NProgress.done();
  }
};


/**
 * Retrieves or requests an access token for authentication.
 * @returns {Promise<string|null>} - The access token.
 */
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");

    if (!code) {
      const response = await fetch(
        "https://02nicropke.execute-api.us-east-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      window.location.href = result.authUrl;
      return null;
   }

    return code && getToken(code);
  }

  return accessToken;
};

/**
 * Exchanges an authorization code for an access token.
 * @param {string} code - The authorization code.
 * @returns {Promise<string>} - The access token.
 */
const getToken = async (code) => {
  const encodedCode = encodeURIComponent(code);
  const response = await fetch(
    `https://02nicropke.execute-api.us-east-1.amazonaws.com/dev/api/token/${encodedCode}`
  );
  const { access_token } = await response.json();
  if (access_token) {
    localStorage.setItem("access_token", access_token);
  }
  return access_token;
};

/**
 * Removes query parameters from the URL to keep it clean.
 */
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};
