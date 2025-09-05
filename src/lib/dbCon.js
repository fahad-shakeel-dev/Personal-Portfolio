import mongoose from "mongoose";

let isConnected = false; // global connection state

export async function dbConnect() {
  if (isConnected) {
    // Already connected
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("❌ Please define the MONGO_URI environment variable in .env.local");
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "PortfolioDb", // change to your db name
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
