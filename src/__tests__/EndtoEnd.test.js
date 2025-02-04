/* eslint-disable no-undef */
import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  jest.setTimeout(30000);


  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      //slowMo: 250,//
      //timeout: 30000, // 
      //channel: "chrome"//
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default setting that causes timeout errors
    });
    page = await browser.newPage();
    await page.goto("http://localhost:5173/");
    await page.waitForSelector(".event");
  });

  afterAll(async () => {
    if (page) await page.close(); // Close the page
    if (browser) await browser.close(); // Close the browser
  });

  test('An event element is collapsed by default', async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto('http://localhost:5173/'); 

    await page.waitForSelector('.event');

    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
    await browser.close();
  });

  test("User can expand an event to see its details", async () => {
    //await page.waitForSelector(".event");//
    await page.click(".event button"); // Click on the button

    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeDefined(); // Ensure details are displayed
  });

  test('User can collapse an event to hide details', async () => {
    await page.click(".event button"); 
    const eventDetails = await page.$('.event .details');
    expect(eventDetails).toBeNull();
  });

});


