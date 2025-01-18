/* eslint-disable no-undef */
import Event from "../components/Event";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockData from "../mock-data";
// eslint-disable-next-line no-unused-vars
import React from "react";

const event = mockData[0];

describe("<Event /> component", () => {
    beforeEach(() => {
        render(<Event event={event} />);
    });

    test("renders the event title", () => {
        expect(screen.getByText(event.summary)).toBeInTheDocument();
    });

   test("renders event location", () => {
        expect(screen.getByText(event.location)).toBeInTheDocument();
    });

    test('renders "show details" button', () => {
        expect(screen.getByText("show details")).toBeInTheDocument();
    });

    test("details are collapsed by default", () => {
        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
    });

    test('shows the details section when the user clicks on the "show details" button', async () => {
        const user = userEvent.setup();
        const button = screen.getByText("show details");
        await user.click(button);
        const normalizedDescription = event.description
            .replace(/\s+/g, " ")
            .trim();

        expect(screen.queryByText(normalizedDescription)).toBeInTheDocument();
    });
    test('hides event details when user clicks on "hide details" button', async () => {
        const user = userEvent.setup();
        const button = screen.getByText("show details");
        await user.click(button);
        await user.click(screen.getByText("hide details"));
        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
    });
});