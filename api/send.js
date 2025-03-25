// api/send.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/send', (req, res) => {
  const { name, phone, formType } = req.body;
  console.log('Данные получены:', { name, phone, formType });
  
  // Здесь можно добавить логику бота (Telegram, Email и т.д.)
  res.status(200).json({ status: 'success' });
});

module.exports = app;
// Пример отправки в Telegram
const axios = require('axios');

app.post('/send', async (req, res) => {
  const { name, phone, formType } = req.body;
  
  await axios.post(`https://api.telegram.org/bot${YOUR_BOT_TOKEN}/sendMessage`, {
    chat_id: YOUR_CHAT_ID,
    text: `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nТип: ${formType}`
  });

  res.status(200).json({ status: 'success' });
});