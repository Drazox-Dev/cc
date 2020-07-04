const Discord = require("discord.js")

module.exports = {
    name: "ping",
    aliases: ["ping"],
    category: "info",
    run: async (client, message, args) => {
      message.channel.bulkDelete(1) 
      	var ping = (new Date().getTime() - message.createdTimestamp);
      message.channel.send(ping)
    }}