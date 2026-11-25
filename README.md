# TrashBillion

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=fff)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=fff)](https://expressjs.com/)
[![Pug](https://img.shields.io/badge/Pug-A86454?logo=pug&logoColor=fff)](https://pugjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=fff)](https://www.mysql.com/)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css&logoColor=fff)](https://developer.mozilla.org/docs/Web/CSS)

TrashBillion is a full-stack marketplace demo that lets users sign up, log in, and create listings for recyclable or reusable waste. It uses an Express and Pug web application backed by MySQL.

## Features

- Browse available trash listings
- View individual listing details
- Create a listing with category, quantity, location, contact number, and icon
- Sign up and log in
- Responsive server-rendered interface
- Automatic MySQL database and table initialization

## Tech Stack

- **Runtime:** Node.js
- **Backend:** Express 5
- **Frontend templates:** Pug
- **Database:** MySQL
- **MySQL client:** `mysql2`
- **Styling:** CSS
- **Development server:** Nodemon

## Project Structure

```text
trashBillion/
├── config/          # MySQL connection configuration
├── controllers/     # Application request handlers
├── data/            # File-based data for an alternative model implementation
├── models/          # MySQL and file-based data models
├── public/          # CSS and client-side JavaScript
├── routes/          # Express routes
├── utils/           # Logging and helper utilities
├── views/           # Pug templates
├── server.js        # Application entry point
└── package.json
```

## Prerequisites

- Node.js 18 or newer
- npm
- A running MySQL server

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd trashBillion
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file:

```bash
cp example.env .env
```

4. Update the MySQL credentials in `.env`:

```env
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your-mysql-password
MYSQL_DATABASE=trashBillion
```

The application creates the `trashBillion` database and the `user` and `trash` tables when it starts.

## Running the App

Start the development server:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Routes

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/` | Home page |
| `GET` | `/trash` | Listing marketplace |
| `GET` | `/trash/sell` | Create a listing form |
| `POST` | `/trash/sell` | Submit a listing |
| `GET` | `/trash/:id` | View listing details |
| `GET` | `/user/signup` | Sign-up page |
| `POST` | `/user/signup` | Create a user |
| `GET` | `/user/login` | Login page |
| `POST` | `/user/login` | Authenticate a user |

## Database Schema

The app initializes two MySQL tables:

- `user`: first name, last name, unique email, password, and creation timestamp
- `trash`: ID, category, title, icon, description, quantity, unit, location, phone, and creation timestamp

## Notes

- This project is a demo and stores passwords directly in the MySQL database. It should not be used as a production authentication implementation without adding password hashing and session management.
- The MySQL credentials are currently configured in `config/mysql.js`; move them to environment variables before deploying.
- The package currently has no automated test suite (`npm test` exits with an error by default).

## License

This project is proprietary software. All rights are reserved; use or
modification requires prior written permission from the copyright holder.
