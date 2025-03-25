const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://balconyrepair.vercel.app',
  methods: ['POST']
}));
app.use(express.json());

// Обработчик POST-запросов
app.post('/send', async (req, res) => {
  const { name, phone, formType } = req.body;

  try {
    // Проверка обязательных полей
    if (!name || !phone) {
      return res.status(400).json({ error: 'Заполните имя и телефон' });
    }

    // Отправка в Telegram
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: `📌 Новая заявка!\n├ Имя: ${name}\n├ Телефон: ${phone}\n└ Тип: ${formType || 'не указан'}`
      }
    );

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Ошибка:', {
      message: error.message,
      response: error.response?.data
    });
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = app;