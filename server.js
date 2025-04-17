const express = require('express');
const axios = require('axios');  // Use axios instead of fetch
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/standings', async (req, res) => {
    const apiUrl = 'https://api-web.nhle.com/v1/standings/now'; // The official NHL API URL
  
    try {
      // Send a GET request to the official NHL API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          // If the API requires any specific headers (e.g., Authorization), include them here
          // 'Authorization': 'Bearer YOUR_API_KEY', // Example header
        },
      });
  
      // Check if the response was successful
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch data from NHL API' });
      }
  
      // Parse the response as JSON
      const data = await response.json();
  
      // Send the data to the client
      res.json(data);
    } catch (error) {
      console.error('Error fetching from NHL API:', error);
      res.status(500).json({ error: 'Failed to fetch data from the NHL API' });
    }
  });
  
  console.log("Server is starting...");
  
  app.listen(PORT, () => {
    console.log(`Proxy server is running at http://localhost:${PORT}`);
  });
