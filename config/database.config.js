const mongoose = require('mongoose');

module.exports.connect = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || process.env.DATABASE;
    if (!mongoUri) {
      console.warn("[Database] Warning: MONGODB_URI is not defined in environment.");
      return;
    }
    mongoose.set('strictQuery', false);
    await mongoose.connect(mongoUri);
    console.log("Connect to MongoDB succeeded!");
  } catch (error) {
    console.error("[Database] Connect to MongoDB failed:", error.message || error);
  }
};
