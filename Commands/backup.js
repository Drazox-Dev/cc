const { RichEmbed, discord, Client, Util, Message } = require("discord.js"); 
const fs = require("fs");
const hastebins = require("hastebin-gen");


var backups = JSON.parse(fs.readFileSync("./Data/backups.json", "utf8"));

module.exports = class backup {
  constructor() {
    (this.name = "backup"),
      (this.alias = ["backup,zaloha"]),
      (this.usage = "x!backup or !xbackup");
  }

  async run(client, message, args) {
    try {
   
     let guildsonlyEmbed = new discord.MessageEmbed()
        .setTitle(`$Chyba`)
        .setDescription(`Tento příkaz nemůže být použit v soukromých zprávách!`)
        .setColor("#a11616");

      let usersonlyEmbed = new discord.MessageEmbed()
        .setTitle(`$Chyba`)
        .setDescription(`Tento příkaz nemůže být použit botem`)
        .setColor("#a11616");

      if (message.channel.type === "dm")
        return message.channel.send(guildsonlyEmbed);
      if (message.author.bot) return message.channel.send(usersonlyEmbed);
      if (args[1] === "create" || args[1] === "c") {
        await message.guild.roles
          .filter(
            r =>
              r.name !== message.guild.member(client.user.id).highestRole.name
          )
          .forEach(r => {
            if (
              r.comparePositionTo(
                message.guild.member(client.user.id).highestRole
              ) > 0
            ) {
              let havnthighest = new RichEmbed()
                .setTitle(`$Varování`)
                .setDescription(
                  `Moje role není nejvyšší na serveru, něktěré části serveru se nemusí uložit!`
                )
                .setColor("#a11616");
              return;
            }
          });

        let creatingEmbed = new discord.MessageEmbed()
          .setTitle(`$Prosím vyčkejte`)
          .setDescription("Vytvářím zálohu");
        message.channel.send(creatingEmbed).then(m => {
          let id = makeid(16);

          const channels = message.guild.channels
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(c => {
              const channel = {
                type: c.type,
                name: c.name,
                postion: c.calculatedPosition
              };
              if (c.parent) channel.parent = c.parent.name;
              return channel;
            });

          const roles = message.guild.roles
            .filter(r => r.name !== "@everyone")
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(r => {
              const role = {
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                permissions: r.permissions,
                mentionable: r.mentionable,
                position: r.position
              };
              return role;
            });

          if (!backups[message.author.id]) backups[message.author.id] = {};
          backups[message.author.id][id] = {
            icon: message.guild.iconURL,
            name: message.guild.name,
            owner: message.guild.ownerID,
            members: message.guild.memberCount,
            createdAt: message.guild.createdAt,
            roles,
            channels
          };

          save();
          let result = new discord.MessageEmbed()
            .setTitle(`$Info`)
            .setDescription(
              `Vytvořil jsem zálohu ze serveru **${message.guild.name}** s ID: \`${id}\``
            )
            .addField(
              "Použití",
              `\`\`\`x!backup load ${id}\`\`\`
\`\`\`x!backup info ${id}\`\`\``
            )
            .setColor("#5DBCD2");

          message.author.send(result);

          let resultPublic = new discord.MessageEmbed()
            .setTitle(`Hotovo!`)
            .setDescription(
              `Vytvořil jsem zálohu serveru **${message.guild.name}** s ID: \`${id}\``
            )
            .addField(
              "Použití",
              `\`\`\`x!backup load ${id}\`\`\`
\`\`\`x!backup info ${id}\`\`\``
            )
            .setColor("#59C57B");

          m.edit(resultPublic);
        });
      }

      if (args[1] === "delete") {
        let code = args[2];
        let errorEmbed = new discord.MessageEmbed()
          .setTitle(`$Jejda!`)
          .setDescription(`Zapomněl jsi přidat do zprávy id zálohy`)
          .setColor("#a11616");
        if (!code) return message.channel.send(errorEmbed);

        let cantfindbackup = new discord.MessageEmbed()
          .setTitle(`$Chyba`)
          .setTitle(`Nevlastníš žádnou zálohu s ID ${code}.`)
          .setColor("#a11616");
        if (!backups[message.author.id][code])
          return message.channel.send(cantfindbackup);

        delete backups[message.author.id][code];
        save();

        let deletedsuc = new discord.MessageEmbed()
          .setTitle(`$Voila!`)
          .setDescription(`Successfully **deleted backup**.`)
          .setColor("#59C57B");
        message.channel.send(deletedsuc);
      }

      if (args[1] === "load" || args[1] === "l") {
        let error = client.emojis.get("655704809483141141") || "❌";
        let code = args[2];
        let errorEmbed = new discord.MessageEmbed()
          .setTitle(`${error} Jejda!`)
          .setDescription(`Zapomněl jsi přidat ID serveru.`);
        if (!code) return message.channel.send(errorEmbed);
        let cantfindbackup = new discord.MessageEmbed()
          .setTitle(`${error}  Error`)
          .setTitle(`Nevlastníš žádnou zálohu s ID ${code}.`)
          .setDescription("[Support](https://discord.club/discord)")
          .setColor("#a11616");
        if (!backups[message.author.id][code])
          return message.channel.send(cantfindbackup);

        message.guild.channels.forEach(channel => {
          channel
            .delete("Pro načtení zálohy")
            .catch(err => console.log(`❌ Error: ${err}`));
        });

        message.guild.roles
          .filter(role => role.members.every(member => !member.user.bot))
          .forEach(role => {
            role
              .delete("Pro načtení zálohy")
              .catch(err => console.log(`❌ Error: ${err}`));
          });
        await backups[message.author.id][code].roles.forEach(async function(
          role
        ) {
          message.guild
            .createRole({
              name: role.name,
              color: role.color,
              permissions: role.permissions,
              hoist: role.hoist,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(role => {
              role.setPosition(role.position);
            })
            .catch(err => console.log(`❌ Error: ${err}`));
        });

        await backups[message.author.id][code].channels
          .filter(c => c.type === "category")
          .forEach(async function(ch) {
            message.guild
              .createChannel(ch.name, {
                type: ch.type,
                permissionOverwrites: ch.permissionOverwrites
              })
              .catch(err => console.log(`❌ Error: ${err}`));
          });

        await backups[message.author.id][code].channels
          .filter(c => c.type !== "category")
          .forEach(async function(ch) {
            message.guild
              .createChannel(ch.name, {
                type: ch.type,
                permissionOverwrites: ch.permissionOverwrites
              })
              .then(c => {
                const parent = message.guild.channels
                  .filter(c => c.type === "category")
                  .find(c => c.name === ch.parent);
                ch.parent ? c.setParent(parent) : "";
              })
              .catch(err => console.log(`❌ Error: ${err}`));
          });
        message.guild.setName(backups[message.author.id][code].name);
        message.guild.setIcon(backups[message.author.id][code].icon);
      }

      if (args[1] === "info" || args[1] === "i") {
        let id = args[2];
        let MissingbackupinfoEmbed = new discord.MessageEmbed()
          .setTitle(`$Jejda!`)
          .setDescription(`Zapomněl jsi do zprávy přidat **ID** zálohy`)
          .setColor("#a11616");
        if (!id) return message.channel.send(MissingbackupinfoEmbed);

        let cantfindEmbed = new RichEmbed()
          .setTitle(`$Chyba`)
          .setDescription(`Nevlastníš **žádnou zálohu** s ID \`${id}\``)
          .setColor("#a11616");
        if (!backups[message.author.id][id])
          return message.channel.send(cantfindEmbed);

        try {
          let infoEmbed = new discord.MessageEmbed()
            .setTitle(backups[message.author.id][id].name)
            .setThumbnail(backups[message.author.id][id].icon)
            .addField(
              "Majitel",
              `<@${backups[message.author.id][id].owner}>`,
              true
            )
            .addField("Hráči", backups[message.author.id][id].members, true)
            .addField("Datum výroby", backups[message.author.id][id].createdAt)
            .addField(
              "Kanály",
              `\`\`\`${backups[message.author.id][id].channels
                .map(channel => channel.name)
                .join("\n")}\`\`\``,
              true
            )
            .addField(
              "Role",
              `\`\`\`${backups[message.author.id][id].roles
                .map(role => role.name)
                .join("\n")}\`\`\``,
              true
            );
          message.channel.send(infoEmbed);
        } catch (e) {
          hastebins(
            backups[message.author.id][id].channels
              .map(channel => channel.name)
              .join("\n"),
            "txt"
          ).then(ch => {
            hastebins(
              backups[message.author.id][id].roles
                .map(role => role.name)
                .join("\n"),
              "txt"
            ).then(ro => {
              let infoEmbed = new discord.MessageEmbed()
                .setTitle(backups[message.author.id][id].name)
                .setThumbnail(backups[message.author.id][id].icon)
                .addField(
                  "Majitel",
                  `<@${backups[message.author.id][id].owner}>`,
                  true
                )
                .addField("Členi", backups[message.author.id][id].members, true)
                .addField(
                  "Datum vytvoření",
                  backups[message.author.id][id].createdAt
                )
                .addField("Kanály", ch, true)
                .addField("Role", ro, true);
              message.channel.send(infoEmbed);
            });
          });
        }
      }

      if (args[1] === "purge") {
        let errorEmbed = new discord.MessageEmbed()
          .setTitle(`$Chyba`)
          .setDescription(`Ještě jsi nezálohoval žádný server`)
          .setColor("#a11616");
        if (!backups[message.author.id])
          return message.channel.send(errorEmbed);

        let warningEmbed = new discord.MessageEmbed()
          .setTitle(`$Varování`)
          .setDescription(`Jsi si jistý že chceš vymazat všechny své zálohy?`);
        message.channel.sendEmbed(warningEmbed).then(msg => {
          msg.react("✅").then(() => msg.react("❌"));

          let yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let noFilter = (reaction, user) =>
            reaction.emoji.name === "❌" && user.id === message.author.id;

          let yes = msg.createReactionCollector(yesFilter, { time: 0 });
          let no = msg.createReactionCollector(noFilter, { time: 0 });

          yes.on("collect", r => {
            delete backups[message.author.id];

            let deletedsuc = new RichEmbed()
              .setTitle(`Hotovo!`)
              .setDescription(`Vymazal jsem všechny tvé zálohy`)
              .setColor("#59C57B");
            message.channel.send(deletedsuc);
            msg.delete();
          });

          no.on("collect", r => {
            msg.delete();
          });
        });
      }

      if (!args[1]) {
        const embed = new discord.MessageEmbed()
          .setTitle(
            `**` +
              `*backup` +
              `**` +
              `
__**Commands**__
`
          )
          .setDescription(
            `
                .backup create        Vytvoří zálohu
                .backup delete        Smaže zálohu
                .backup info          Zobrazí info o záloze
                .backup list          Zobrazí list záloh
                .backup load          Nahraje zálohu
                .backup purge         Vymaže všechny vaše zálohy`
          )
          .addBlankField()
          .setFooter(`*backup pro pomoc při zálohách`)
          .setColor("#5DBCD2");
        message.channel.send(embed);
        return;
      }

      function makeid(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }

      function save() {
        fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
          if (err) console.error(err);
        });
      }
    } catch (e) {
      throw e;
    }
  }
};
