const express = require('express');
const axios = require('axios');  // Use axios instead of fetch
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/standings', async (req, res) => {
  const apiUrl = 'https://api-web.nhle.com/v1/standings/now';

  try {
    console.log('Fetching from NHL API...');
    const response = await axios.get(apiUrl);  // Use axios.get to fetch the data
    console.log('API Response Status:', response.status);  // Log the status of the response
    res.json(response.data);  // Axios automatically parses JSON for you
  } catch (error) {
    console.error('Error fetching from NHL API:', error);
    res.status(500).json({ error: `Failed to fetch data: ${error.message}` });
  }
});

console.log("About to start the server...");
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
