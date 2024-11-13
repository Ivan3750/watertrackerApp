import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullname: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  unit: {
    weight: String,
    volume: String,
  },
  time: {
    wakeUp: Date, 
    sleepTime: Date,
  },
  weight: String,
  height: String,
  waterTracker: [{ amount: Number, date: Date }],

});


export default mongoose.models.User || mongoose.model('User', UserSchema);
