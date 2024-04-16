# PaperWatch

PaperWatch is a web-based application developed for tracking the status of exam papers online. This system is designed specifically for the CSE350 course to facilitate the process of managing and monitoring exam papers handled by teachers and overseen by the chief exam controller.

## Features

- **Assignment of Exam Papers:** Teachers can be assigned specific exam papers to check.
- **Real-time Tracking:** The chief exam controller can monitor the status of each paper (e.g., checked, submitted, ongoing, accepted) in real-time.
- **Status Updates:** Teachers can update the status of the papers they are handling, and these updates are immediately visible to the chief exam controller.
- **Communicaton via Comments:** Teachers and Head can communicate with each other by leaving comments, such as requests to change due dates, provide additional instructions, or report issues.

## How It Works

1. **Assignment**: The chief exam controller assigns exam papers to teachers through the PaperWatch system.
2. **Checking**: Teachers access the assigned papers, and update the status (e.g., checked, ongoing).
3. **Communication**: Users (both teachers and chief exam controller) can leave comments on papers to communicate requests, instructions, or issues.
4. **Monitoring**: The chief exam controller can log in to PaperWatch to view the status of all assigned papers and monitor comments for any updates or requests. Besides, teachers get notifications when the due date is near.
5. **Updates**: Any updates made by users (including comments) are instantly reflected in the system for real-time tracking and communication.

## Technologies Used

- **Frontend:** Javascript(React.js), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT), Passport

## Installation

To run PaperWatch locally, ensure you have `Node.js` installed on your system.

### Backend

1. Clone the backend repository

```
mkdir Project_350_Backend
https://github.com/Fahad-Bin-Mahbub/Project_350_Backend.git
```

2. Install dependencies

```
cd Project_350_Backend
npm install
```

3. Start the development server:

```
npm run dev
```
