const express = require('express');
const app = express();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
//require('dotenv').config();

// Configure IBM Watson Assistant
const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'fVG4_E1amb-49dMOMlL8uglbe1t17eemFCxawEwS0Dey',
  }),
  serviceUrl: 'https://api.au-syd.assistant.watson.cloud.ibm.com/instances/173d6124-68fa-4772-acec-3c3961114045',
});

// Set up Express middleware
app.use(express.json());

// Create a route for interacting with Watson Assistant
app.post('/api/message', async (req, res) => {
  const { text } = req.body;

  try {
    // Create a session, assistantID insert with Env ID
    const session = await assistant.createSession({
      assistantId: "8cdfe554-17a3-4e2c-9b27-2ce8e084320a",
    });

    // Send a message using the obtained session ID
    const response = await assistant.message({
      assistantId: "8cdfe554-17a3-4e2c-9b27-2ce8e084320a",
      sessionId: session.result.session_id,
      input: {
        message_type: 'text',
        text: text,
      },
    });

    res.json(response['result']);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while processing your request.' });
    console.error(err);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
