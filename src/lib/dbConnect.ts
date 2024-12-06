import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

console.log("database connection page")
async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already database is connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log("What we get after connecting the database", db);
    console.log(db.connections);
    console.log("Connected to database:", db.connections[0].name);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
}

export default dbConnect;

// The readyState is a number indicating the state of the MongoDB connection:
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
