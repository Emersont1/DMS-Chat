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
app.use(bodyParser()); // Is this being used at all?

// Map of events and debugging steps left
var map = [];

async function sendQuestion(ev, question) {
  for (var i = 0; i < map.length; i++) {
    if (map[i].thread_ts == ev.ts) {
      msg = question;
      msg["channel"] = ev.channel;
      msg["thread_ts"] = ev.ts;

      const v = await web.chat.postMessage(msg);
      map[i].last_msg = v.ts;
      for (const [key, value] of Object.entries(map[i].a)) {
        await web.reactions.add({
          channel: v.channel,
          name: key,
          timestamp: v.ts
        });
      }
    }

  }
}



slackEvents.on('app_mention', (event) => {
  if (!('thread_ts' in event)) {
    var b = event.text.replace(/<@[A-Z0-9]+>/, "").trim();
    console.log(b);
    if (b == "") {
      var str = "List of available machines:";
      //fs.readdirSync("routines");
      for (const val of fs.readdirSync("routines")) {
        var a = val.replace(".js", "");
        str += `\n    ${a}`;
      }
      const res = web.chat.postMessage({
        channel: event.channel,
        text: str,
        user: event.user,
        thread_ts: event.ts,
        last_msg: "",
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
        new_response = routine.func0();

        // populate map array here
        var obj = {
          chan: event.channel,
          thread_ts: event.ts,
          a: new_response.a,
          user: event.user,
        };
        map.push(obj);
        sendQuestion(event, new_response.q);
      }
    }
  }
});

slackEvents.on('reaction_added', (event) => {
  for (var i = 0; i < map.length; i++) {
    if (map[i].channel == event.channel && event.item.ts == map[i].last_msg && event.user == map[i].user) {
      // handle

      console.log(event);
      console.log(map[i].a);
      if (Object.keys(map[i].a).length === 0 && map[i].a.constructor === Object) {
        // Don't try if empty JSON is returned for a. This indicates the routine has finished
        console.log("empty object");
      } else {
        for (const [key, value] of Object.entries(map[i].a)) {
          console.log(key);
          console.log(event.reaction);
          if (event.reaction == key) {
            new_response = value();
            map[i].a = new_response.a;
            sendQuestion(event.item, new_response.q);
            return;
          }
        }
      }
    }

  }
});

// Initialize a server for the express app - you can skip this and the rest if you prefer to use app.listen()
const server = createServer(app);
server.listen(port, () => {
  // Log a message when the server is ready
  console.log(`Listening for events on ${server.address().port}`);
});