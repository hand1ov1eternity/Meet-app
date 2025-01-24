/* eslint-disable no-undef */
import puppeteer from "puppeteer";

describe('show/hide an event details', () => {

    let browser;
    let page;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 250,
            timeout: 0
        });
        page = await browser.newPage();
        await page.goto('http://localhost:5173/');
        await page.waitForSelector('.event');
    });

    afterAll(() => {
        browser.close();
    });

    test('User can expand an event to see its details', async () => {
        await page.waitForSelector('.event');
        await page.click('.event button'); // Click on the button instead of .details-btn
        
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined(); // Checks that the details are displayed
    });
});
