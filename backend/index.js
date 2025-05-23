import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer } from 'http';
import app from './app.js';

// Load environment variables
dotenv.config();

// MongoDB Connection Options
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, dbOptions);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

// Create HTTP server
const server = createServer(app);

// Port configuration
const PORT = process.env.PORT || 8000;

// Initialize server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start server
        server.listen(PORT, () => {
            console.log(`
🚀 Server ready at http://localhost:${PORT}
📝 API Documentation available at http://localhost:${PORT}/api-docs
            `);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Start the server
startServer();
