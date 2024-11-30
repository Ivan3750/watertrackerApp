const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const express = require('express');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

const bot = require('./bot');  // Просто імпортуємо бот, не викликаючи його як функцію

app.prepare().then(() => {
  const server = express();

  // Ви більше не викликаєте bot(), бо він вже запущений і працює

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
