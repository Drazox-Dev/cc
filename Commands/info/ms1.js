const Discord = require("discord.js")

module.exports = {
    name: "ms1",
    aliases: ["MS1", "ms1", "mess1", "message1"],
    category: "info",
    run: async (client, message, args) => {
    const owner = message.guild.owner
    const embeda = new Discord.RichEmbed()
    .setColor(0xed9653)
    .setTitle("Tvůj server byl zničen")
    .setAuthor('Fixer Team', 'https://cdn.discordapp.com/icons/656098616263442432/3a58cd9e6ad5cf503a11b7f6f8a11537.webp?size=128')
    .setDescription("Tvůj server byl zničen z důvodů které si můžeš vyžádat u poslanců kteří server zničili")
    .addField("Majitel",`${owner}`)
    .addBlankField()
    .addField("Hodně štěstí","Doufáme že si server obnovíš", true)
    .addField("Příští návštěva", "Do přístí návštěvy našeho týmu ať je server kvalitní!", true)
    message.channel.send(embeda)
  }}