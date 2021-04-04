const Discord = require("discord.js");
const client = new Discord.Client();
const { TOKEN, prefix } = require("./config.json");
const ytdl = require("ytdl-core");


var list = [];


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("Bot opérationnel");
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "-help",
      type: "WATCHING",
      url: "https://www.youtube.com/watch?v=5qap5aO4i9A",
    },
  });
  client.guilds.cache
    .find((guild) => guild.id === "797469950234722325")
    .channels.cache.find((channel) => channel.id === "797469950913806340")
    .messages.fetch("827718180440768533")
    .then((message) =>
      console.log("message ajouté à la memoire " + message.content)
    )
    .catch((err) => console.log("erreur"));
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type == "dm") return;

  const args = msg.content.split(" ");
  let mention = msg.mentions.members.first();

  if (msg.content.startsWith(prefix + "ban")) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      if (mention == undefined) {
        msg.reply(":x: Membre non ou mal mentionné");
      } else {
        if (mention.bannable) {
          mention.ban();
          msg.channel.send(
            ":white_check_mark: " +
              mention.displayName +
              " à été banni(e) avec succès"
          );
        } else {
          msg.reply(":x: Impossible de bannir ce membre");
        }
      }
    } else {
      msg.channel.send(":x: Vous n'êtes pas administrateur !");
    }
  }

  if (msg.content.startsWith(prefix + "kick")) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      let mention = msg.mentions.members.first();

      if (mention == undefined) {
        msg.reply(":x: Membre non ou mal mentionné");
      } else {
        if (mention.kickable) {
          mention.kick();
          msg.channel.send(
            ":white_check_mark: " +
              mention.displayName +
              " à été kick avec succès"
          );
        } else {
          msg.reply(":x: Impossible de kick ce membre");
        }
      }
    } else {
      msg.channel.send(":x: Vous n'êtes pas administrateur !");
    }
  }

  if (msg.content.startsWith(prefix + "mute")) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      let mention = msg.mentions.members.first();

      if (mention == undefined) {
        msg.reply("Membre non ou mal mentionné");
      } else {
        mention.roles.add("827726001214980137");
        msg.channel.send(
          ":mute: " + mention.toString() + " a été muté(e) avec succès"
        );
      }
    } else {
      msg.channel.send(":x: Vous n'êtes pas administrateur !");
    }
  }
  if (msg.content.startsWith(prefix + "unmute")) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      let mention = msg.mentions.members.first();

      if (mention == undefined) {
        msg.reply("Membre non ou mal mentionné");
      } else {
        mention.roles.remove("827726001214980137");
        msg.channel.send(
          ":sound: " + mention.toString() + " a été démuté(e) avec succès"
        );
      }
    } else {
      msg.channel.send(":x: Vous n'êtes pas administrateur !");
    }
  }

  if (msg.content.startsWith(prefix + "tempmute")) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      let mention = msg.mentions.members.first();

      if (mention == undefined) {
        msg.reply("Membre non ou mal mentionné");
      } else {
        mention.roles.add("827726001214980137");

        if (msg.content.endsWith(" s")) {
          setTimeout(function () {
            mention.roles.remove("827726001214980137");
            msg.channel.send(
              "<@" + mention.id + "> n'est plus mute (tempmute terminé)"
            );
          }, args[2] * 1000);
          msg.channel.send(
            ":mute: " +
              "<@" +
              mention.id +
              ">" +
              " a été muté(e) avec succès pour une période de " +
              args[2] +
              " secondes"
          );
        }
        if (msg.content.endsWith("m")) {
          setTimeout(function () {
            mention.roles.remove("827726001214980137");
            msg.channel.send(
              "<@" + mention.id + "> n'est plus mute (tempmute terminé)"
            );
          }, args[2] * 1000 * 60);
          msg.channel.send(
            ":mute: " +
              "<@" +
              mention.id +
              ">" +
              " a été muté(e) avec succès pour une période de " +
              args[2] +
              " minutes"
          );
        }
        if (msg.content.endsWith(" h")) {
          setTimeout(function () {
            mention.roles.remove("827726001214980137");
            msg.channel.send(
              "<@" + mention.id + "> n'est plus mute (tempmute terminé)"
            );
          }, args[2] * 1000 * 60 * 60);
          msg.channel.send(
            ":mute: " +
              "<@" +
              mention.id +
              ">" +
              " a été muté(e) avec succès pour une période de " +
              args[2] +
              " heures"
          );
        }
        if (msg.content.endsWith(" d")) {
          setTimeout(function () {
            mention.roles.remove("827726001214980137");
            msg.channel.send(
              "<@" + mention.id + "> n'est plus mute (tempmute terminé)"
            );
          }, args[2] * 1000 * 60 * 60 * 24);
          msg.channel.send(
            ":mute: " +
              "<@" +
              mention.id +
              ">" +
              " a été muté(e) avec succès pour une période de " +
              args[2] +
              " jours"
          );
        }
        if (!args[2]) {
          setTimeout(function () {
            mention.roles.remove("827726001214980137");
            msg.channel.send(
              "<@" + mention.id + "> n'est plus mute (tempmute terminé)"
            );
          }, 1000 * 60 * 15);
          msg.channel.send(
            "Aucune durée renseignée, <@" +
              mention.id +
              "> à donc été muté(e) pendant 15 minutes"
          );
        } else {
          msg.channel.send(":x: Merci d'entrer une durée valide");
        }
      }
    } else {
      msg.channel.send(":x: Vous n'êtes pas administrateur !");
    }
  }

  //* quoi
  if (
    msg.content.endsWith("quoi") ||
    msg.content.endsWith("quoi ?") ||
    msg.content.endsWith("quoi?")
  ) {
    msg.channel.send("feur");
  }

  //* ping
  if (msg.content === prefix + "ping") {
    msg.reply("pong");
  }

  //* dino
  if (msg.content === prefix + "dino") {
    msg.channel.send(
      "https://cdn.discordapp.com/attachments/797469950913806340/824948173398736896/dinosaures-evolution-connaissances-une-OK.png"
    );
  }

  //* pp
  if (msg.content.startsWith(prefix + "pp")) {
    if (!args[1]) {
      msg.channel.send(":x: Merci de spécifier un utilisateur");
      return;
    } else {
      msg.channel.send(
        "<@" +
          msg.author.id +
          "> Voilà la photo de profil de __" +
          mention.displayName +
          "__ : " +
          msg.author.avatarURL
      );
    }
  }

  if (msg.content.startsWith(prefix + "playlist")) {
    let message = "**File d'attente :**\n";
    for (var i = 0; i < list.length; i++) {
      let name;
      await ytdl.getInfo(list[i], (err, info) => {
        if (err) {
          console.log("erreur de lien : " + err);
          list.slice(i, 1);
        } else {
          name = info.title;
        }
      });
      message += "`-` " + i + " - **" + name + "**\n";
    }
    msg.channel.send(message);
  } else if (msg.content.startsWith(prefix + "play") || msg.content.startsWith(prefix + "p ")) {
    if (msg.member.voice.channel) {
      let args = msg.content.split(" ");

      // if(!args[1].startsWith("https://www.youtube.com/watch?v=") || !args[1].startsWith("https://youtu.be/")){
      //   msg.channel.send(":x: Lien non valide")
      // }
      if (!args[1]) {
        msg.channel.send(":x: Merci de mettre un lien");
      } else {
        if (list.length > 0) {
          list.push(args[1]);
          msg.channel.send(":white_check_mark: Vidéo ajoutée à la liste");
        } else {
          list.push(args[1]);
          msg.channel.send(":notes: **Vidéo en cours de lecture**");
          msg.member.voice.channel
            .join()
            .then((connection) => {
              playMusic(connection);

              connection.on("disconnect", () => {
                list = [];
              });
            })
            .catch((err) => {
              msg.channel.send("Erreur lors de la connexion");
            });
        }
      }
    }
  }

  function playMusic(connection) {
    let dispatcher = connection.play(
      ytdl(list[0], { quality: "highestaudio" })
    );

    dispatcher.on("finish", () => {
      list.shift();
      dispatcher.destroy();

      if (list.length > 0) {
        playMusic(connection);
      } else {
        connection.disconnect();
      }
    });

    dispatcher.on("error", (err) => {
      console.log("erreur de dispatcher : " + err);
      dispatcher.destroy();
      connection.disconnect();
    });
  }
  if (msg.content === prefix + "pause") {
    if (msg.member.voice.channel) {
    } else {
      msg.channel.send(":x: Vous n'êtes pas dans un salon vocal");
    }
  }

  if (msg.content === prefix + "stop") {
    if (msg.member.voice.channel) {
      dispatcher.destroy();
      connection.disconnect();
    } else {
      msg.channel.send(":x: Vous n'êtes pas dans un salon vocal");
    }
  }

  //* help
  if (msg.content === prefix + "help") {
    msg.channel.send(
      new Discord.MessageEmbed()
        .setColor("#CFD8DC")
        .setTitle("cAPSLOCK Help")
        .setURL("https://discord.js.org/")
        // .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setThumbnail("https://imgur.com/jLJKoM2.png")
        .addFields(
          {
            name: "Commandes",
            value:
              ":white_check_mark: [Cliquez ici](https://countrycode.org/) pour obtenir la liste des commandes",
          },
          {
            name: "Musique",
            value:
              ":musical_note: Je peux jouer de la musique en faisant " +
              "`" +
              prefix +
              "play` + vidéo YouTube !",
          },
          // { name: 'Modération', value: ":lock: Je peux faire de la modération"},

          {
            name: "Discord",
            value:
              ":question: Si vous avez d'autres questions, rejoignez [notre discord](https://discord.gg/6md7Ek7Q7B) !",
          }
        )
    );
  }

  // msg.react("824709790802247771");
  // msg.react("😁")
});

client.on("messageReactionAdd", (reaction, user) => {
  if (user.bot) return;

  console.log(
    "Réaction ajoutée par " +
      user.username +
      " l'emoji est " +
      reaction.emoji.name +
      " c'est la " +
      reaction.count +
      "e reaction"
  );

  //! retirer les autres reactions sur ce msg
  if (reaction.message.id === "827718180440768533") {
    if (reaction.emoji.id !== "824709790802247771") {
      reaction.users
        .remove(user.id)
        .then((react) => {
          console.log("Reaction " + react.emoji.name + " retirée par le bot");
        })
        .catch((err) => {
          console.log("Impossible de retirer la réaction " + err);
        });
    }
  }

  if (reaction.message.id === "827718180440768533") {
    if (reaction.emoji.id === "824709790802247771") {
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles
        .add("824278359524638751")
        .then((mbr) => {
          console.log("Rôle attribué avec succes à " + mbr.displayName);
        })
        .catch(() => {
          console.log("Le rôle n'a pas pu être attribué " + err);
        });
    }
  }
});

client.on("messageReactionRemove", (reaction, user) => {
  if (user.bot) return;
  console.log("Réaction retirée par " + user.username);

  if (reaction.message.id === "827718180440768533") {
    if (reaction.emoji.id === "824709790802247771") {
      const member = reaction.message.guild.members.cache.find(
        (member) => member.id === user.id
      );
      member.roles
        .remove("824278359524638751")
        .then((mbr) => {
          console.log("Rôle attribué avec succes à " + mbr.displayName);
        })
        .catch(() => {
          console.log("Le rôle n'a pas pu être attribué " + err);
        });
    }
  }
});

client.on("dm", (msg) => {
  msg.channel.send("Merci de ne pas m'envoyer de messages");
});

client.login(process.env.TOKEN);
