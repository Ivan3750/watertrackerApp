import mongoose from 'mongoose';
function setDefaultTime(hours, minutes) {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // Установка часу
  return date;
}

const UserSchema = new mongoose.Schema({
  chatId: { type: Number},
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: {type: Number, default: 18 },
  gender: String,
  time: {
    wakeUp: { 
      type: Date, 
      default: new Date().setHours(8, 0, 0, 0) // Set to 8:00 AM today
    },
    sleepTime: { 
      type: Date, 
      default: new Date().setHours(20, 0, 0, 0) // Set to 8:00 PM today
    },
  },
  weight: {type: Number, default: 0 },
  height: {type: Number, default: 0 },
  goal: {type: Number, default: 2000},
  waterTracker: [{ amount: Number, date: Date }],

});


export default mongoose.models.User || mongoose.model('User', UserSchema);
