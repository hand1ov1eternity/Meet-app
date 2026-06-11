# 📅 Meet App

---

🔗 **[Live Version »](https://meet-app-rust.vercel.app/)**

---

## 🎯 Key Features

- 🌍 **Filter Events by City**  
  Search and filter events by city to see only what's relevant to you.

- 📖 **Show/Hide Event Details**  
  Expand or collapse event elements to toggle between a summary and full view.

- 🔢 **Specify Number of Events**  
  Choose how many events you want displayed at a time.

- 📡 **Offline Accessibility**  
  Access previously viewed events even when you're offline.

- 📲 **Installable PWA**  
  Add the app to your device home screen for quick access.

- 📊 **Data Visualization**  
  See trends with interactive charts that show the number of events per city and category.

---

## ⚙️ Tech Stack

Frontend: React + Vite

Styling: CSS3

State & Data: useState, useEffect, Fetch API

PWA Support: Service Workers, Workbox

Charts: Recharts

Deployment: Vercel

---

## 🚀 Installation & Setup

Clone the repository:

git clone https://github.com/your-username/meet-app.git
cd meet-app

Install dependencies:
npm install

Start the development server:
npm run dev

Open your browser at:
http://localhost:5173

---

## 👤 User Stories & Scenarios

### Feature 1: Filter Events by City
User Story:
As a user, I want to filter events by city so I only see events relevant to my location.

Scenarios:

Display all events by default when no city is entered.

Show city suggestions while typing.

Display events for the selected city when a suggestion is clicked.

### Feature 2: Show/Hide Event Details
User Story:
As a user, I want to expand or collapse event details so I can view more or less info as needed.

Scenarios:

Events are collapsed by default.

Clicking "Show Details" expands the view.

Clicking "Hide Details" collapses the view.

### Feature 3: Specify Number of Events
User Story:
As a user, I want to control how many events are shown so I’m not overwhelmed.

Scenarios:

Show 32 events by default.

Allow users to input a custom number of events.

### Feature 4: Use the App When Offline
User Story:
As a user, I want to use the app offline so I can view cached data.

Scenarios:

Show cached event data when offline.

Show an error when trying to search or update settings offline.

### Feature 5: Add App Shortcut to Home Screen
User Story:
As a user, I want to install the app as a shortcut on my device for easy access.

Scenario:

If supported, user can click "Add to Home Screen" to install the PWA.

### Feature 6: Display Charts Visualizing Event Details
User Story:
As a user, I want to view charts so I can understand event trends.

Scenario:

Show a chart with the number of upcoming events in each city using Recharts.

---

## 📦 Build for Production
To generate a production build:

npm run build
You can then deploy the contents of the dist folder using any static hosting service (like Vercel, Netlify, or GitHub Pages).

## 🤝 Contributing
Contributions are welcome!
To contribute:

### Fork the repository
git clone https://github.com/your-username/meet-app.git

### Create a new feature branch
git checkout -b feature/your-feature

### Make your changes, then commit
git commit -m "Add your feature"

### Push and open a pull request
git push origin feature/your-feature

### Demo Data Notice
The original version of this project connected to a CareerFoundry Google Calendar via OAuth and AWS Lambda. Since the original third-party calendar is no longer available, the public demo now uses stable sample event data so visitors can reliably test the app’s core features.

The Google Calendar OAuth and serverless AWS integration code remains in the repository, and I plan to connect it to my own Google Calendar for a controlled live API demo.

---

> Meet App – Find the future, one event at a time. 🗓️✨ — always a work in progress 🚧.

