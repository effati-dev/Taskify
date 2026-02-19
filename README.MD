# Taskify

Taskify is a task management REST API built with Node.js and TypeScript.
I built this project as a portfolio backend to demonstrate clean architecture,
authentication patterns, and production-ready API design.

It’s not just a CRUD project — it includes authentication, role-based access control,
pagination, filtering, sorting, validation, and Docker support.

## Tech Stack

- Node.js v24.11.0
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- JWT (Access + Refresh Tokens)
- Role-Based Access Control (RBAC)
- Zod (Request validation)
- Swagger (API documentation)
- Docker & Docker Compose

## What This Project Includes

### Authentication

- Register
- Login
- Refresh token flow
- Access token protection
- Role-based authorization

### Users Module

- Get all users (paginated)
- Search by name or email
- Dynamic sorting

### Tasks Module

- Create, update, delete tasks
- Get all tasks for a specific user (paginated)
- Filter by status
- Search by title
- Sort by different fields (e.g. creation date)

## Features

- Access & refresh token implementation
- Role-based access control
- Server-side pagination
- Dynamic sorting
- Search support
- Task status filtering
- Zod validation layer
- Swagger API documentation
- Health check endpoint
- Dockerized setup

## Environment Variables

rename `.env-example` file to `.env`

## Installation & Setup

1. Install dependencies

```bash
npm install
```

2. Generate Prisma client

```bash
npm run generate
```

3. Run database migrations

```bash
npm run migrate
```

4. Seed database

```bash
npm run seed
```

5. Start the application

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

## Docker

To run the project using Docker:

```bash
docker compose up --build
```

The app will be available at:

```
http://localhost:3000
```

## API Documentation

Swagger UI is available at:

```
http://localhost:3000/api-docs
```

## Health Check

```
GET /health-check
```

Response:

```json
{ "message": "Ok" }
```

## Why I Built This

I built Taskify to practice and demonstrate:

- Clean modular backend structure
- Authentication & authorization patterns
- Real-world API features (pagination, sorting, filtering)
- Prisma with PostgreSQL
- Docker-based development setup

The goal was to build something that feels production-ready,
not just a basic CRUD tutorial project.
