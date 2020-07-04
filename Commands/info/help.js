const Discord = require("discord.js")

module.exports = {
    name: "help",
    aliases: ["help"],
    category: "info",
    run: async (client, message, args) => {
    const owner = message.guild.owner
    const embeda = new Discord.MessageEmbed()
    .setColor(0xed9653)
    .setTitle("Help")
    .setDescription("banall - zabanuje všechny lidi na serveru\nkickall - kickne všechny lidi\nping - zobrazí tvuj ping ktery máš\nvote - slouži k hlasovaní\nbackup - backupne server\npurge - smaže zprávu v rozmzí 2 až 100")
    message.channel.send(embeda)
  }}