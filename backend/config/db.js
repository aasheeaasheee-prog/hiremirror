import mongoose from 'mongoose';

/**
 * Connect to Mongoose database using environment URI.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI environment variable is missing.");
    }
    console.log("[Database] Connecting to MongoDB...");
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
    });
    console.log(`[Database] MongoDB Connected to host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Error] Mongoose Connection Failed: ${error.message}`);
    console.log("[Database] Server running in DATABASE FALLBACK mode (database operations will be unavailable).");
  }
};

export default connectDB;
