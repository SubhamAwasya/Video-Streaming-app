import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log("_________________________________________________");
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log("MONGODB CONNECTION FAILD", error);
    process.exit(1);
  }
};
