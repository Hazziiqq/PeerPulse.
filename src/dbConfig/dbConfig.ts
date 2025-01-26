/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

export async function connectDB() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('Connected to DB');
    });

    connection.on('error', (err) => {
      console.log('Error connecting to DB:', err);
    });
  } catch (error: any) {
    console.error("Database connection failed:", error.stack || error);
  }
}
