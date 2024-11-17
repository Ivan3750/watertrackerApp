module.exports = () => {
  const TelegramBot = require('node-telegram-bot-api');
  const axios = require('axios');

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7928500614:AAGl0v_uidAUp1dGsn98kQTJbFOCDW6ZGVA";
  const WEB_APP_URL = process.env.WEB_APP_URL || 'https://watertrackerapp.onrender.com/login';

  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привіт! Я Water Tracker Bot. Я тобі допоможу не забувати пити воду!');
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!msg.text.startsWith('/')) {
      bot.sendMessage(chatId, 'Вибачте, я поки що не розумію цього 😅. Спробуйте /start.');
    }
  });

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
      console.error('❌ Error configuring menu button:', error);
    }
  }

  setMenuButton()

  console.log('Бот запущено!');
};
