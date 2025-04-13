# Sunday Group Formation App

A web application for forming small discussion groups in church settings, similar to Kahoot's join mechanism.

## Features

- **Host Page**: Displays a QR code and link for participants to join
- **Join Page**: Allows participants to enter their name and indicate if they're willing to lead a group
- **Participant List**: Shows names of people who have joined, with animations
- **Manual Addition**: Ability to add participants directly from the host device
- **Group Formation**: Automatically forms groups of 4-6 people, ensuring each group has a leader
- **Group Display**: Shows assigned groups to participants, with Bible book names as group identifiers

## Technology Stack

- **Framework**: Next.js 15.3.0
- **UI**: React 19
- **Styling**: Tailwind CSS
- **QR Code**: qrcode.react

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

1. The host opens the application on their device (laptop/tablet)
2. Participants scan the QR code or use the provided link to join
3. Participants enter their name and indicate if they're willing to lead a group
4. The host can see participants joining in real-time
5. When ready, the host clicks "Form Groups" to create balanced groups
6. Each participant sees their assigned group on their device

## Deployment on Netlify

This project is configured for easy deployment on Netlify:

1. Push your code to a GitHub repository
2. Log in to Netlify and click "New site from Git"
3. Select your repository and configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Click "Deploy site"

The included `netlify.toml` file contains the necessary configuration for deploying a Next.js application on Netlify.

## Project Structure

- `app/page.tsx`: Main host page
- `app/join/[roomId]/page.tsx`: Join page for participants
- `app/participant/[roomId]/[participantId]/page.tsx`: Group display for participants
- `app/components/`: UI components
- `app/context/`: State management
- `app/utils/`: Helper functions and types
