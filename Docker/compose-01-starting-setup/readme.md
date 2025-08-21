# Dockerized Goals App

This project is a full-stack web application for managing goals, built with a React frontend, a Node.js/Express backend, and MongoDB for data storage. The entire stack is containerized using Docker and orchestrated with Docker Compose.

## Project Structure

```
.
├── backend/
│   ├── app.js
│   ├── Dockerfile
│   ├── package.json
│   ├── models/
│   │   └── goal.js
│   └── logs/
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   └── components/
│   ├── Dockerfile
│   ├── package.json
│   └── public/
├── env/
│   ├── backend.env
│   └── mongo.env
├── docker-compose.yaml
└── docker-commands.txt
```

## Features

- Add, view, and delete goals
- Persistent storage with MongoDB
- REST API backend ([backend/app.js](backend/app.js))
- Responsive React frontend ([frontend/src/App.js](frontend/src/App.js))
- Logging with Morgan
- Dockerized for easy setup and deployment

## Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/) installed

## Getting Started

1. **Clone the repository**

   ```sh
   git clone <your-repo-url>
   cd <project-directory>
   ```

2. **Start the application**

   ```sh
   docker-compose up --build
   ```

   This will build and start the MongoDB, backend, and frontend containers.

3. **Access the app**

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:80/goals](http://localhost:80/goals)

## Development

- The frontend source code is mounted as a volume for hot-reloading.
- The backend logs are persisted in a Docker volume.
- Environment variables for MongoDB and backend are managed in the [`env/`](env/) directory.

## Useful Docker Commands

See [`docker-commands.txt`](docker-commands.txt) for common Docker CLI commands, such as building images, running containers, and stopping all services.

## Environment Variables

- MongoDB credentials: see [`env/mongo.env`](env/mongo.env)
- Backend credentials: see [`env/backend.env`](env/backend.env)

## License

MIT

---

This project is based on the Udemy