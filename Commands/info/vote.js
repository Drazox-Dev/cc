const Discord = require("discord.js")

module.exports = {
    name: "vote",
    aliases: ["vote", "poll"],
    category: "info",
    run: async (client, message, args) => {
      message.channel.bulkDelete(1)  

const Discord = require('discord.js');

const agree    = "✅";
const disagree = "❎";

  let VOTE_TEXT = await message.channel.send("Vote now! (10 Seconds)");
  await VOTE_TEXT.react(agree);
  await VOTE_TEXT.react(disagree);
    

  const reactions = await VOTE_TEXT.awaitReactions(reaction => reaction.emoji.name === agree || reaction.emoji.name === disagree, {time: 10000});
  VOTE_TEXT.delete();
      

  var NO_Count = reactions.get(disagree).count;
  var YES_Count = reactions.get(agree);

  if(YES_Count == undefined){
    var YES_Count = 1;
  }else{
    var YES_Count = reactions.get(agree).count;
  }

  var sumsum = new Discord.RichEmbed()
  
            .addField("Voting Finished:", "----------------------------------------\n" +
                                          "Total votes (NO): " + `${NO_Count-1}\n` +
                                          "Total votes (Yes): " + `${YES_Count-1}\n` +
                                          "----------------------------------------", true)

            .setColor("0x#FF0000")

  await message.channel.send({embed: sumsum});      
      
  }}