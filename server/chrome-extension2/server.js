const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // Enable CORS


// Endpoint to get email
app.get('/api/get_email', async (req, res) => {
    try {
        console.log("Sending request to the other server to get the email...");

        // Fetch data from the external server
        const response = await axios.get('https://172.25.7.18:5000/get_email');
        const emailData = response.data;

        // Extract email address
        const email = emailData.email_addr || "No email found";
        console.log(`Email extracted: ${email}`);

        // Send back email as JSON
        res.json({ email_addr: email });
    } catch (error) {
        console.error(`Error occurred while making request: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
