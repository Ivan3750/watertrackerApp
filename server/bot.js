const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7928500614:AAGl0v_uidAUp1dGsn98kQTJbFOCDW6ZGVA";
let WEB_APP_URL = process.env.WEB_APP_URL || `https://watertrackerapp.onrender.com/login`

const bot = new TelegramBot(TOKEN, { polling: true });



// Обробка команди /start
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  WEB_APP_URL = process.env.WEB_APP_URL || `https://watertrackerapp.onrender.com/login?chatId=${chatId}`

  try {
    // Реєстрація користувача в базі
    /* let user = await User.findOne({ chatId }); */
    

    bot.sendMessage(chatId, 'Привіт! Я Water Tracker Bot. Я буду нагадувати тобі пити воду щогодини!');
  } catch (error) {
    console.error('❌ Помилка реєстрації користувача:', error.message);
    bot.sendMessage(chatId, 'Виникла помилка під час реєстрації. Спробуй ще раз.');
  }
});
bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, chatId);

  }
);

// Нагадування кожну годину
setInterval(async () => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000); // Час годину назад

  try {
    // Знайти користувачів, які не пили воду більше години
    const usersToNotify = await User.find({
      $or: [
        { lastDrinkTime: null },
        { lastDrinkTime: { $lt: oneHourAgo } }
      ]
    });

    // Надіслати нагадування
    for (const user of usersToNotify) {
      bot.sendMessage(user.chatId, '💧 Не забудь випити води!');
      // Оновити час останнього нагадування
      user.lastDrinkTime = new Date();
      await user.save();
    }
  } catch (error) {
    console.error('❌ Помилка нагадування:', error.message);
  }
}, 60 * 60 * 1000); // Виконувати кожну годину

// Налаштування кнопки меню
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
