# Website Selling Accounts

A full-stack web application for selling accounts, built with React + Vite (frontend) and Node.js/Express + PostgreSQL (backend).

## Project Structure

```
root/
├── frontend/          # Frontend React + Vite
├── backend/           # Backend Node/Express + PostgreSQL
├── docker-compose.yml # Docker configuration
├── .env.example       # Example environment variables
└── README.md
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL 15+ (or Docker)
- Docker & Docker Compose (optional)

## Getting Started

### Option 1: Using Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd website_selling_accounts

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# Frontend will be available at http://localhost:3000
# Backend API will be available at http://localhost:5000
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp ../.env.example .env

# Start development server
npm run dev
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env` and update the values as needed:

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `DB_HOST` | PostgreSQL host | localhost |
| `DB_PORT` | PostgreSQL port | 5432 |
| `DB_USER` | PostgreSQL user | postgres |
| `DB_PASSWORD` | PostgreSQL password | postgres |
| `DB_NAME` | Database name | selling_accounts |
| `VITE_API_URL` | API URL for frontend | http://localhost:5000/api |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api` | API welcome message |

## Development

### Frontend

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend

```bash
cd backend
npm run dev      # Start development server with nodemon
npm start        # Start production server
```

## License

ISC

