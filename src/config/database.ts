import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("Kết nối MongoDB thành công");
  } catch (error) {
    console.error("Lỗi kết nối MongoDB:", error);
    process.exit(1); // Dừng ứng dụng nếu không thể kết nối
  }
};

export default connectDB;
