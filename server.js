const express = require("express");
const app = express();

// our default array of dream

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port + "\nBot is now ready to destroy!");
});

// LOAD COMMANDS
const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true
})

// Collections
client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
});

// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
    const prefix = ".";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});
// -----

// XENOM LOAD
const { RichEmbed } = require("discord.js");
const { CommandHandler } = require("djs-commands");
var approx = require('approximate-number');


client.on("ready", () => {
    console.log("Ready !");
    client.user.setActivity(".help")
});

client.on("message", async (message) => {
  
const CH = new CommandHandler({
    folder: __dirname + "/Commands/",
    prefix: "."
});    
  
    if(message.author.type === 'bot') return;
    let args = message.content.split(" ");
    let command = args[0];
    let cmd = CH.getCommand(command);
    if(!cmd) return;

    try{
        cmd.run(client,message,args)
    }catch(e){
        console.log(e)
    }

});

let info = client.emojis.get

client.on("guildCreate", guild => {
  
      let channelID;
    let channels = guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
  
    let newserverEmbed = new RichEmbed()
    .setTitle(`${info}  Info`)
    .setDescription(`Děkuji že jsis přidal Help Bota na tvůj server!`)
    .setColor("#5DBCD2")
channel.send(newserverEmbed)
})






client.login(process.env.SECRET);
// NetForMe server :NjYyMTkzMTU4ODA5MTkwNDEy.Xm-Eug.xVqWpC0kcZ4GTkh4MmVVlmENPQ0
// Singlik server: Njk3MTM3NDU5MDUzNTkyNjQ2.XpSvEA.BDg0EjvDUEyEv-NPFzJenFGiR1k
// server : Njg5MTExNzc1OTM3MDM2MzY3.XqGfJQ.MEi2Zwr_HRBQ08CuEF_js8imbm4