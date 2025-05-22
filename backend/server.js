const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/api/llama', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(process.env.GROQ_API_URL, {
      model: "llama3-8b-8192", // or llama3-70b-8192
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
    });

    res.json({ result: response.data.choices });
  } catch (err) {
    console.error("LLaMA error:", err.response?.data || err.message);
    res.status(500).json({ error: "Something went wrong with LLaMA API." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
