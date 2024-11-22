import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: {type: Number, default: 18 },
  gender: String,
  time: {
    wakeUp: Date, 
    sleepTime: Date,
  },
  weight: {type: Number, default: 0 },
  height: {type: Number, default: 0 },
  goal: {type: Number, default: 2000},
  waterTracker: [{ amount: Number, date: Date }],

});


export default mongoose.models.User || mongoose.model('User', UserSchema);
