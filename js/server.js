const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const TELEGRAM_TOKEN = '7873217731:AAHZa7FLViCn-qyd4h2fFbXwy-TAac4rkp4';
const CHAT_ID = '-4799585247';

app.post('/send-to-telegram', async (req, res) => {
    try {
        const { name, phone, message, formType } = req.body;
        
        const text = `
            РќРѕРІР°СЏ Р·Р°СЏРІРєР° (${formType}):
            РРјСЏ: ${name}
            РўРµР»РµС„РѕРЅ: ${phone}
            РЎРѕРѕР±С‰РµРЅРёРµ: ${message || 'РќРµС‚ СЃРѕРѕР±С‰РµРЅРёСЏ'}
        `;

        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: text
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));