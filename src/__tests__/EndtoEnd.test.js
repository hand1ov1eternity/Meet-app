/* eslint-disable no-undef */
import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
        headless: true, // Optional: Runs in headless mode
        args: ["--no-sandbox"], // Optional: Use for certain CI environments
      });
    page = await browser.newPage();
    await page.goto("http://localhost:5173/");
    await page.waitForSelector(".event");
  });

  afterAll(async () => {
    if (browser) {
      await browser.close(); // Close the browser only if it's initialized
    }
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull(); // Validate that event details are not visible
  });
});


