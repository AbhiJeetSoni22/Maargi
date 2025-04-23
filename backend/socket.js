import { Server } from 'socket.io';
import { User } from './models/user.model.js';
import { Captain } from './models/captain.model.js';

let io;

export const sendMessageToSocketId = (socketId, { event, data }) => {
    if (!io) {
        console.error('Socket.io not initialized');
        return;
    }
    io.to(socketId).emit(event, data);
};

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ['https://rapidcab-frontend.onrender.com', 'http://localhost:5173'],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"]
        },
        transports: ["websocket", "polling"],
        pingTimeout: 60000,
        pingInterval: 25000
    });

    io.on('connection', async (socket) => {
  

        socket.on('join', async (data) => {
            try {
                if (data.userType === 'captain') {
                    await Captain.findByIdAndUpdate(data.userId, { socketId: socket.id });
             
                } else {
                    await User.findByIdAndUpdate(data.userId, { socketId: socket.id });
        
                }
            } catch (error) {
                console.error('Error updating socket ID:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};