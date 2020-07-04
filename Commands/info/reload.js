const Discord = require("discord.js")
module.exports = {
        name: "reload",
        usage: "!reload",
        category: "general",
        aliases: ["creload", "commandreload"],
        run: async (bot, message, args) => {
	if (message.author.id !== '393397531956084747') return message.channel.send("you are not a Owner"); 
    
    let dir = "info"
    if(!args[0]) return message.channel.send("Write command name")

    let commandName = args[0].toLowerCase()

    try {
        delete require.cache[require.resolve(`../../commands/${dir}/${commandName}.js`)] // usage !reload <name>
        bot.commands.delete(commandName)
        const pull = require(`../../commands/${dir}/${commandName}.js`)
        bot.commands.set(commandName, pull)
    } catch(e) {
        return message.channel.send(`Could not reload: \`${args[1].toUpperCase()}\``)
    }

    message.channel.send(`Príkaz \`${args[0].toUpperCase()}\` byl reloadnutý`)

    }
}