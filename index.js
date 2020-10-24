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
app.use(bodyParser());  // Is this being used at all?

// Map of events and debugging steps left
var map = {};



function routinePost(event, question, answer) {
  msg = question;
  msg["channel"]=event.channel;
  msg["thread_ts"]=event.ts;
  const res=web.chat.postMessage(msg);
  console.log(msg);

  // Need to do reaction stuff here. For now just assuming :thumbsup: is picked.
  reaction = "thumbsup";

  if (answer == {}) {
    // Don't try if empty JSON is returned for a. This indicates the routine has finished
  } else if (reaction == "thumbsup") {
      answer_parsed = JSON.parse(answer);
      new_response = JSON.parse(answer_parsed.thumbsup());
      routinePost(event, new_response.q, new_response.a);

    } else if (reaction == "thumbsdown") {
      answer_parsed = JSON.parse(answer);
      new_response = JSON.parse(answer_parsed.thumbsdown());
      routinePost(event, new_response.q, new_response.a);
    }
}



slackEvents.on('app_mention', (event) => {
  if (!('thread_ts' in event)) {
    var b = event.text.replace(/<@[A-Z0-9]+>/, "").trim();
    console.log(b);
    if (b == "") {
      var str = "List of available machines:";
      //fs.readdirSync("routines");
      for(const val of fs.readdirSync("routines")){
        var a = val.replace(".js", "");
        str += `\n    ${a}`;
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
        // Populate data
        const res = web.chat.postMessage({
          channel: event.channel,
          text: '**Door Creaks Open**, You summoned me?',
          thread_ts: event.ts
        });
        // Import the selected routine
        routine = require(`./routines/${b}.js`);
        new_response = JSON.parse(routine.func0());
        routinePost(event, new_response.q, new_response.a);
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