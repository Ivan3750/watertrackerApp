import axios from 'axios';

const TELEGRAM_TOKEN = "7928500614:AAGl0v_uidAUp1dGsn98kQTJbFOCDW6ZGVA";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message) {
      const chatId = message.chat.id;

      await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
        chat_id: chatId,
        text: 'Привіт від Next.js!',
      });
    }

    return res.status(200).json({ status: 'success' });
  }

  return res.status(405).json({ error: 'Метод не дозволений' });
}
