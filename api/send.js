const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, phone, formType } = req.body;

  try {
    await axios.post(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        chat_id: process.env.CHAT_ID,
        text: `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nТип: ${formType}`
      }
    );
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Ошибка Telegram:", error.response?.data);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

module.exports = app;