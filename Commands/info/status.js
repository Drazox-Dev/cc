const Discord = require("discord.js")
var approx = require('approximate-number');

module.exports = {
    name: "status",
    aliases: ["status", "game"],
    category: "info",
    run: async (client, message, args) => {
      if(!args[0]) return message.channel.send("Chyba!")
   
      if (message.author.id !== '393397531956084747') return message.channel.send("Nemáš oprávnění používat tento příkaz");
            if(args[0] == "reset" )
        message.channel.send("status byl resetován")
        client.user.setActivity(".help")
}
    }