const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const bot = require('./bot'); // імпортуй логіку Telegram бота

app.prepare().then(() => {
  const server = express();

  // Запуск Telegram бота
  bot();

  // Обробка Next.js роутів
  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
