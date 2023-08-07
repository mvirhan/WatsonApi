const express = require('express');
const app = express();
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

// Replace these values with your Watson Assistant credentials
const assistant = new AssistantV2({
  version: '2021-11-27',
  authenticator: new IamAuthenticator({
    apikey: 'fVG4_E1amb-49dMOMlL8uglbe1t17eemFCxawEwS0Dey',
  }),
  serviceUrl: 'https://api.au-syd.assistant.watson.cloud.ibm.com/instances/173d6124-68fa-4772-acec-3c3961114045',
});

app.use(express.json());

// Test Watson Assistant connection, AssistantID insert with environment ID
app.get('/session', async (req, res) => {
  try {
    const session = await assistant.createSession({
      assistantId: '8cdfe554-17a3-4e2c-9b27-2ce8e084320a',
    });
    res.json(session['result']);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create session' });
    console.error(err);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
