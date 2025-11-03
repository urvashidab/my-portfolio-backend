import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Server connected successfully..!!!`);
  } catch (err) {
    console.error(`Connection failed`, err.message);
    process.exit(1);
  }
};

export default connectDB;
