const Discord = require("discord.js")

module.exports = {
    name: "ms2",
    aliases: ["MS2", "ms2", "mess2", "message2"],
    category: "info",
    run: async (client, message, args) => {
    const owner = message.guild.owner
    const embeda = new Discord.RichEmbed()
    .setColor(0xed9653)
    .setTitle("Tvůj server byl zničen")
    .setAuthor('Manysek', 'https://cdn.discordapp.com/icons/656098616263442432/3a58cd9e6ad5cf503a11b7f6f8a11537.webp?size=128')
    .setDescription("Příště si to origo více promysli ;)")
    .addField("Majitel",`${owner}`)
    .addBlankField()
    .addField("Hodně štěstí","Doufám že si server obnovíš", true)
    .addField("Haha", "Už ti nikdy neudělám server, a ze všech mých serverů dostaneš ban", true)
    message.channel.send(embeda)
  }}