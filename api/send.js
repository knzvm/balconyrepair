const express = require("express");
const axios = require("axios");
require("dotenv").config();
const app = express();

// Включите CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, phone, formType } = req.body;

  try {
    // Проверьте переменные окружения
    if (!process.env.BOT_TOKEN || !process.env.CHAT_ID) {
      throw new Error("Переменные окружения не заданы");
    }

    // Отправка в Telegram
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nТип: ${formType || "не указан"}`,
      }
    );
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Ошибка:", error.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = app;