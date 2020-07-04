const Discord = require("discord.js")

module.exports = {
    name: "purge",
    aliases: ["purge", "del"],
    category: "info",
    run: async (client, message, args) => {

const Discord = require('discord.js');

    const deleteCount = parseInt(args[0], 10);
    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply(
        "please provide number between 2 and 100 to delete"
      );
    const fetched = await message.channel.bulkDelete(deleteCount);
    message.channel
      .bulkDelete(fetched)
      .catch(error =>
        message.reply(`this i can´t delete sorry :(: ${error}`)
      );
  }
      

}