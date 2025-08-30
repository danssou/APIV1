
# Subscription Tracker API

A Node.js REST API for managing user subscriptions, reminders, and authentication. Built with Express, MongoDB, Arcjet, Upstash QStash, and more.

## Features

- User authentication (JWT)
- Subscription CRUD operations
- Automated renewal reminders (workflow)
- Rate limiting and bot protection (Arcjet)
- Email notifications (Nodemailer)
- Environment-based configuration

## Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- Arcjet (security)
- Upstash QStash (workflows)
- Nodemailer (email)
- Dayjs (date handling)

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/danssou/APIV1.git
   cd APIV1
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your `.env.development.local` file with required variables (see sample in repo).

4. Start the development server:

   ```sh
   npm run dev
   ```

### API Endpoints

- `POST /api/v1/auth/sign-in` — User login
- `POST /api/v1/subscriptions` — Create subscription
- `GET /api/v1/users/:id/subscriptions` — Get user subscriptions
- `POST /api/v1/workflows/subscription/reminder` — Trigger reminder workflow

## Workflows & Reminders

- Uses Upstash QStash for scheduling reminders before subscription renewal dates.
- Arcjet protects all routes from bots and abuse.

## Email Notifications

- Nodemailer is used to send reminder emails to users.

## Environment Variables

See `.env.development.local` for required variables:

- `PORT`, `SERVER_URL`, `DB_URI`, `JWT_SECRET`, `ARCJET_KEY`, `QSTASH_TOKEN`, etc.

## Other

Feel free to contribute or open issues for improvements!
