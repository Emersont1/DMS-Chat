const Discord = require('discord.js');
const client = new Discord.Client();
var token = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.author.bot){ // Ignore messages from other bots
      return;
  }

  if(msg.mentions.users.array().includes(client.user)){
      msg.channel.send("Thanks for the ping!");
      var a = require ("./ace.js");
      a.f(msg.channel);
      return;
  }
  if(msg.content.startsWith("!")){
      if(msg.content.startsWith("!date")){
        var d = new Date();
        msg.channel.send(d.getDate());
        return;
      }

      if(msg.content.startsWith("!help")){
        msg.author.send("help is coming");
        return;
      }

      if(msg.content.startsWith("!logo"))
      {
          // send a discord logo
          msg.channel.send("Here ya go", 
          {
              files:["https://hacksocnotts.co.uk/static/media/logo.a84dfc55.png"]
          });
          return;
      }

      if(msg.content.startsWith("!localfile"))
      {
          // send a discord logo
          msg.channel.send("One Local file, coming up", 
          {
              files:[{attachment: "cheese.txt", name:"test.js"}]
          });
          return;
      }

      msg.channel.send("Unknown Command, send `!help` for documentation");
  }
  
});

client.login(token["token"]);