const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7928500614:AAGl0v_uidAUp1dGsn98kQTJbFOCDW6ZGVA";
let WEB_APP_URL = process.env.WEB_APP_URL || `https://watertrackerapp.onrender.com/login`

const bot = new TelegramBot(TOKEN, { polling: true });

const MONGODB_URI = "mongodb+srv://kohan3750:Data@cluster0.vdi3teq.mongodb.net/WaterDB?retryWrites=true&w=majority&appName=Cluster0"

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

let isConnected = false

async function connectMongo() {
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
connectMongo()

const UserSchema = new mongoose.Schema({
  chatId: { type: Number},
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

const User = mongoose.model('User', UserSchema);


bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  WEB_APP_URL = process.env.WEB_APP_URL || `https://watertrackerapp.onrender.com/login/${chatId}/`
  try {
    bot.sendMessage(chatId, 'Привіт! Я Water Tracker Bot. Я буду нагадувати тобі пити воду щогодини!');
  } catch (error) {
    console.error('❌ Помилка реєстрації користувача:', error.message);
    bot.sendMessage(chatId, 'Виникла помилка під час реєстрації. Спробуй ще раз.');
  }
});
bot.onText(/\/support/, async (msg) => {
  const chatId = msg.chat.id;
    bot.sendMessage(chatId, `В тебе проблеми з нашим застосунком? /n @ivan_kohan_60`);
  
});
bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, chatId);

  }
);

// Нагадування кожну годину
setInterval(async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); 
  try {
    const usersToNotify = await User.find({
      $or: [
        { "waterTracker.0": { $exists: false } }, // Користувач не має жодного запису
        {
          "waterTracker.date": {
            $lt: oneHourAgo, // Останнє споживання води було більше години тому
          },
        },
      ],
    });
    for (const user of usersToNotify) {
      bot.sendMessage(user.chatId, '💧 Не забудь випити води!');
      user.lastDrinkTime = new Date();
      await user.save();
    }
  } catch (error) {
    console.error('❌ Помилка нагадування:', error.message);
  }
}, 60 * 60 * 1000); 

async function setMenuButton() {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/setChatMenuButton`, {
      menu_button: {
        type: 'web_app',
        text: '💧 Start',
        web_app: {
          url: WEB_APP_URL
        }
      }
    });
    console.log('✅ Menu button configured:', response.data);
  } catch (error) {
    console.error('❌ Error configuring menu button:', error.message);
  }
}

setMenuButton();

console.log('Бот запущено!');
module.exports = bot;