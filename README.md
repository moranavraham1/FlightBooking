# Flight Booking Website

## Project Overview
A comprehensive flight booking web application allowing users to search, book, and manage flight reservations.

## Prerequisites
- Docker Desktop
- Node.js (v18+)
- npm

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/moranavraham1/FlightBooking.git
cd FlightBooking
```

### 2. Backend Setup
Navigate to backend directory and start Docker containers:
```bash
cd flight-booking-backend
docker-compose up --build
```

### 3. Frontend Setup
In a new terminal:
```bash
cd flight-booking-frontend
npm install
npm start
```

## Features
- Flight search
- Booking management
- User authentication
- Responsive design

## Technologies
- Frontend: React
- Backend: [Specify backend framework]
- Database: PostgreSQL
- Containerization: Docker
- Testing: Cypress

## Testing
Run Cypress E2E tests:
```bash
cd flight-booking-frontend
npx cypress open
```

## Continuous Integration
Automated tests run on each commit/pull request

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request
