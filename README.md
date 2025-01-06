# Phishing Simulation and Management

This workspace contains a phishing simulation and management system, including a frontend application built with React and Vite, and backend services built with NestJS.

## Prerequisites

- Docker
- Docker Compose

## Getting Started

### Running the Application

1. Clone the repository:

```sh
git clone <repository-url>
cd <repository-directory>
```

2. Create the environment files:

```sh
cp frontend/.env.example frontend/.env
cp phishing-management/.env.example phishing-management/.env
cp phishing-simulation/.env.example phishing-simulation/.env
```

3. Start the Mongo DB using Docker Compose:

```sh
docker-compose up --build -d
```

The following services will be started by:

```sh
yarn && yarn start:dev
```

- Phishing Simulation Service (NestJS)
- Phishing Management Service (NestJS)

The Frontend application will be started by:

```sh
cd frontend yarn && yarn dev
```

Accessing the Application

- Frontend application: [http://localhost:5137](http://localhost:5137)
- Phishing Simulation Service: [http://localhost:3000](http://localhost:3000)
- Phishing Management Service: [http://localhost:3001](http://localhost:3001)
