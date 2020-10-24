const { createServer } = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const { createEventAdapter } = require('@slack/events-api');
const { createMessageAdapter } = require('@slack/interactive-messages');
const { WebClient } = require('@slack/web-api');
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const token = process.env.SLACK_TOKEN;
const port = process.env.PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);
const slackInteractions = createMessageAdapter(slackSigningSecret);

const web = new WebClient(token);

// Create an express application
const app = express();

// Plug the adapter in as a middleware
app.use('/', slackEvents.requestListener());

// Example: If you're using a body parser, always put it after the event adapter in the middleware stack
app.use(bodyParser());

slackEvents.on('message', (event) => {
    if(event.text == "w!help" || event.text == "w! help") {
      console.log(`${event.user} wants help.`);
      const res = await web.chat.postMessage({ channel: event.channel, text: 'Hello there' });
    } else {
      console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    }
  });

// Initialize a server for the express app - you can skip this and the rest if you prefer to use app.listen()
const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});

