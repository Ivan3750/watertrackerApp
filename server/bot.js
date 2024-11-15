module.exports = () => {
  const TelegramBot = require('node-telegram-bot-api');
  const axios = require('axios');

  const TOKEN = process.env.TELEGRAM_BOT_TOKEN || "7928500614:AAGl0v_uidAUp1dGsn98kQTJbFOCDW6ZGVA";
  const WEB_APP_URL = process.env.WEB_APP_URL || 'https://example.com/api';

  const bot = new TelegramBot(TOKEN, { polling: true });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привіт! Я Telegram бот. Що бажаєш зробити?');
  });

  bot.onText(/\/getdata/, async (msg) => {
    const chatId = msg.chat.id;

    try {
      const response = await axios.get(`${WEB_APP_URL}/data`);
      const data = response.data;

      bot.sendMessage(chatId, `Ось ваші дані: ${JSON.stringify(data)}`);
    } catch (error) {
      console.error('Помилка при отриманні даних:', error.message);
      bot.sendMessage(chatId, 'На жаль, не вдалося отримати дані 😢');
    }
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (!msg.text.startsWith('/')) {
      bot.sendMessage(chatId, 'Вибачте, я поки що не розумію цього 😅. Спробуйте /start або /getdata.');
    }
  });

  console.log('Бот запущено!');
};
