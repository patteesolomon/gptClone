const PORT = 8000;
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const API_KEY = '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';

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: "user", content: req.body.message }],
            max_tokens: 100
        })
    };
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        res.send(data.error ? data.error : data.choices[0].message.content);
    } catch (error) {
        console.error(error);
    }
});


app.listen((PORT), () => {
    console.log(`Server is running on port ${PORT}`);
});