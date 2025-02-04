/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
 * Fetches events data, handling offline mode by storing the last fetched events in localStorage.
 * @returns {Promise<Array|null>} - The list of events or null if unavailable.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  // If the user is offline, load events from localStorage
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://02nicropke.execute-api.us-east-1.amazonaws.com/dev/api/get-events/${token}`;

    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result) {
        NProgress.done();
        localStorage.setItem("lastEvents", JSON.stringify(result.events)); // Store events in localStorage
        return result.events;
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }

  // Fallback if something goes wrong
  const storedEvents = localStorage.getItem("lastEvents");
  return storedEvents ? JSON.parse(storedEvents) : [];
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
      return (window.location.href = result.authUrl);
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
