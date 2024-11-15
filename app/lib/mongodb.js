import mongoose from "mongoose"

const MONGODB_URI = "mongodb+srv://kohan3750:Data@cluster0.vdi3teq.mongodb.net/WaterDB?retryWrites=true&w=majority&appName=Cluster0"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let isConnected = false

export async function connectMongo() {
  if (isConnected) return
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("MongoDB connection error:", error)
  }
}
