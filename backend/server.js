import { config } from 'dotenv';
config();

import http from 'http';
import dbConnection from './connection.js';
import app from './app.js';
import { initializeSocket } from './socket.js';

const PORT = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = initializeSocket(server);

// Connect to MongoDB and start server
dbConnection().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to database:', error);
  process.exit(1);
});
