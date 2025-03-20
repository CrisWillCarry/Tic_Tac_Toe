// api/gemini.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { contents } = req.body;

      const response = await axios.post(
        'https://api.genai.google.com/v1/models/generate_content',  // Gemini API URL
        {
          model: 'gemini-2.0-flash',
          contents: contents,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,  // Use an environment variable for the API Key
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error interacting with Gemini API' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
