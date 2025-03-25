const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Обработка POST-запроса
app.post("/send", async (req, res) => {
  const { name, phone, formType } = req.body;

  try {
    // Отправка сообщения в Telegram
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nТип: ${formType}`,
      }
    );

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Ошибка Telegram API:", error.response?.data);
    res.status(500).json({ error: "Не удалось отправить данные" });
  }
});

module.exports = app;