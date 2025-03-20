export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { contents } = req.body;
  
        console.log("Request to Gemini API:", req);
  
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,  // Correct URL with query parameter for API key
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: contents }]
              }]
            })
          }
        );
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Gemini API response:", data);
        res.status(200).json(data);
      } catch (error) {
        console.error("Gemini API error:", error);
        res.status(500).json({ error: 'Error interacting with Gemini API', details: error.message });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  