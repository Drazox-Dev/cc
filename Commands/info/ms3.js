const Discord = require("discord.js")

module.exports = {
    name: "ms3",
    aliases: ["MS3", "ms3", "mess3", "message3"],
    category: "info",
    run: async (client, message, args) => {
    const owner = message.guild.owner
    const fivem = new Discord.RichEmbed()
    .setColor(0xed9653)
    .setTitle("Tvůj server byl zničen")
    .setAuthor('Drazox')
    .setDescription("Příště si rozmysli jestli mi dáš ban nebo ne, užívej FiveM server, který je za chvíli dead, muck :) TY POJEABANÉ DĚCKO ;)")
    .addField("Majitel",`${owner}`)
    .addBlankField()
    .addField("Login", "zap503448")
    .addField("Heslo", "bc8eb156e3")
    .addField("Užívejte", "Užívejte ZAP, máte čas než se majitel vzbudí :)")
    message.channel.send(fivem)
  }}