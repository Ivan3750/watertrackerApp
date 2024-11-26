import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';
import { connectMongo } from './mongodb.js';
import User from './db.js';

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7928500614:AAGl0v_uidAUp1dGsn98kQTJbFOCDW6ZGVA";
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://watertrackerapp.onrender.com/login';

const bot = new TelegramBot(TOKEN, { polling: true });

(async () => {
  await connectMongo(); // Ensure the bot connects to MongoDB before starting
})();

// Handle the /start command
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Find or create a user
    let user = await User.findOne({ username: String(chatId) });
    if (!user) {
      user = new User({
        username: String(chatId),
        email: `user${chatId}@example.com`, // Placeholder email
        password: `pass${chatId}`, // Placeholder password
        time: { wakeUp: new Date(), sleepTime: new Date() },
        waterTracker: [],
      });
      await user.save();
    }

    bot.sendMessage(
      chatId,
      'Привіт! Я Water Tracker Bot. Я буду нагадувати тобі пити воду відповідно до твоєї мети!'
    );
  } catch (error) {
    console.error('❌ Помилка реєстрації користувача:', error.message);
    bot.sendMessage(chatId, 'Виникла помилка під час реєстрації. Спробуй ще раз.');
  }
});

// Log water intake
bot.onText(/\/drink (\d+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const amount = parseInt(match[1]);

  try {
    const user = await User.findOne({ username: String(chatId) });
    if (!user) {
      return bot.sendMessage(chatId, 'Спочатку введіть /start, щоб зареєструватися!');
    }

    user.waterTracker.push({ amount, date: new Date() });
    await user.save();

    bot.sendMessage(chatId, `💧 Ви випили ${amount} мл води! Молодець!`);
  } catch (error) {
    console.error('❌ Помилка запису води:', error.message);
    bot.sendMessage(chatId, 'Не вдалося записати воду. Спробуйте ще раз.');
  }
});

// Schedule hourly reminders
setInterval(async () => {
  const users = await User.find({}); // Fetch all users

  for (const user of users) {
    // Calculate water consumption today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const waterConsumed = user.waterTracker.reduce((total, log) => {
      if (new Date(log.date) >= today) {
        return total + log.amount;
      }
      return total;
    }, 0);

    // Check if the user needs a reminder
    if (waterConsumed < user.goal) {
      bot.sendMessage(
        user.username,
        `💧 Пам'ятай випити воду! Ваша мета на сьогодні: ${user.goal} мл. Ви вже випили: ${waterConsumed} мл.`
      );
    }
  }
}, 60 * 60 * 1000); // Run every hour

// Configure the menu button
async function setMenuButton() {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/setChatMenuButton`, {
      menu_button: {
        type: 'web_app',
        text: '💧 Start',
        web_app: {
          url: WEB_APP_URL,
        },
      },
    });
    console.log('✅ Menu button configured:', response.data);
  } catch (error) {
    console.error('❌ Error configuring menu button:', error.message);
  }
}

setMenuButton();

console.log('Бот запущено!');
