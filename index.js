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


// JSON inclutions
const initial_message = require("./message.json");


const web = new WebClient(token);

// Create an express application
const app = express();

// Plug the adapter in as a middleware
app.use('/event', slackEvents.requestListener());
//app.use('/form', x);

// Example: If you're using a body parser, always put it after the event adapter in the middleware stack
app.use(bodyParser());

// Map of events and debugging steps left
var map = {};

slackInteractions.action({ type:"static_select" }, (payload, respond) => {
  console.log("Payload: ", payload);
  
  // Update original messageto remove buttons.
  //chat.update()
});

slackEvents.on('app_mention', (event) => {
  if(!('thread_ts' in event)) {
    //const res = web.chat.postMessage({ channel: event.channel, text: '**Door Creaks Open**, You summoned me?' , thread_ts: event.ts});
    var msg = initial_message;
    msg["channel"] = event.channel;
    msg["thread_ts"] = event.ts;
    const res = web.chat.postMessage(msg);
    // decipher machine id and poulate object
  }
})

slackEvents.on('message', (event) => {
  });

// Initialize a server for the express app - you can skip this and the rest if you prefer to use app.listen()
const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});

