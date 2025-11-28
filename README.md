# Website Selling Accounts

A full-stack web application for selling digital accounts built with React, Vite, Node.js, Express, and PostgreSQL.

## Project Structure

```
root/
├── frontend/          # Frontend React + Vite (TypeScript)
├── backend/           # Backend Node/Express + PostgreSQL (TypeScript)
├── docker-compose.yml # Docker containerization
├── .env.example       # Environment variables template
└── README.md          # This file
```

## Prerequisites

- Node.js 18+ 
- PostgreSQL 14+ (or Docker)
- npm or yarn

## Quick Start with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/website_selling_accounts.git
   cd website_selling_accounts
   ```

2. Start all services:
   ```bash
   docker-compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api
   - Health check: http://localhost:3000/api/health

## Manual Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. Set up the database:
   ```bash
   # Create the database and run init.sql
   psql -U postgres -d website_selling_accounts -f src/database/init.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

| Method | Endpoint          | Description         |
|--------|-------------------|---------------------|
| GET    | /api/health       | Health check        |
| GET    | /api/accounts     | Get all accounts    |
| GET    | /api/accounts/:id | Get account by ID   |
| POST   | /api/accounts     | Create new account  |
| PUT    | /api/accounts/:id | Update account      |
| DELETE | /api/accounts/:id | Delete account      |

## Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

### Backend (.env)

| Variable      | Description                  | Default                |
|---------------|------------------------------|------------------------|
| PORT          | Server port                  | 3000                   |
| DB_HOST       | PostgreSQL host              | localhost              |
| DB_PORT       | PostgreSQL port              | 5432                   |
| DB_NAME       | Database name                | website_selling_accounts |
| DB_USER       | Database user                | postgres               |
| DB_PASSWORD   | Database password            | password               |
| FRONTEND_URL  | Frontend URL for CORS        | http://localhost:5173  |

### Frontend (.env)

| Variable      | Description                  | Default                     |
|---------------|------------------------------|-----------------------------|
| VITE_API_URL  | Backend API URL              | http://localhost:3000/api   |

## Tech Stack

### Frontend
- React 19
- Vite 7
- TypeScript
- ESLint

### Backend
- Node.js
- Express 5
- TypeScript
- PostgreSQL
- Helmet (security)
- CORS

## License

ISC
