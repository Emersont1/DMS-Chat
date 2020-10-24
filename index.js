const {
  createServer
} = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const {
  createEventAdapter
} = require('@slack/events-api');
const {
  WebClient
} = require('@slack/web-api');
const fs = require('fs');



const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
const token = process.env.SLACK_TOKEN;
const port = process.env.PORT || 3000;
const slackEvents = createEventAdapter(slackSigningSecret);


const web = new WebClient(token);

// Create an express application
const app = express();

// Plug the adapter in as a middleware
app.use('/event', slackEvents.requestListener());

// Example: If you're using a body parser, always put it after the event adapter in the middleware stack
app.use(bodyParser());

// Map of events and debugging steps left
var map = {};

slackEvents.on('app_mention', (event) => {
  if (!('thread_ts' in event)) {
    var b = event.text.replace(/<@[A-Z0-9]+>/, "").trim();
    console.log(b);
    if (b == "") {
      var str = "List of availible machines:";
      //fs.readdirSync("routines");
      for(const val of fs.readdirSync("routines")){
        str += `\n+ ${val}  `;
      }
      const res = web.chat.postMessage({
        channel: event.channel,
        text: str,
        thread_ts: event.ts
      });
    } else {

      if (!fs.existsSync(`routines/${b}.js`)) {
        const res = web.chat.postMessage({
          channel: event.channel,
          text: "I'm sorry Dave, I'm afraid I can't let you do that",
          thread_ts: event.ts
        });
      } else {
        //populate data
        const res = web.chat.postMessage({
          channel: event.channel,
          text: '**Door Creaks Open**, You summoned me?',
          thread_ts: event.ts
        });
      }
    }
  }
});

slackEvents.on('message', (event) => {

});

// Initialize a server for the express app - you can skip this and the rest if you prefer to use app.listen()
const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});