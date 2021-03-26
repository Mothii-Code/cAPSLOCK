const Discord = require("discord.js");

const client = new Discord.Client();

const prefix = "!";

client.once("ready", () => {
  console.log("Bot opérationnel");

  client.user.setPresence({
    status: "idle",
    activity: {
    name: "Pornhub",
    type: "STREAMING",
    url: "https://www.youtube.com/watch?v=5qap5aO4i9A"

    }
  })
    
});

client.on("guildMemberAdd", (member) => {
  member.guild.channels.cache
    .find((channel) => channel.id === "797469950913806340")
    .send(
      "Bienvenue " +
        member.displayName +
        " ! \nNous sommes désormais **" +
        member.guild.memberCount +
        "** sur le serveur !"
    );
  member.roles
    .add("824278278906708018")
    .then(() =>
      console.log("Rôle attribué avec succès pour " + member.displayName)
    )
    .catch(() => console.log("Le rôle n'a pas pu être attribué"));
});

client.on("guildMemberRemove", (member) => {
  member.guild.channels.cache
    .find((channel) => channel.id === "797469950913806340")
    .send(member.displayName + " nous a quitté... 😭");
});

client.on("messageReactionAdd", (reaction, user) => {
  console.log("réction ajoutée");
});

client.on("messageReactionRemove", (reaction, user) => {
  console.log("reaction retirée");
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") {
    message.channel.send("mERCI DE NE PAS M4ENVOYER DE DM");
    return;
  }

  message.react("824709790802247771");
  message.react("😭");

  if (message.content == "ping") {
    message.channel.send("pong");
  }

  if (message.content == "ching") {
    message.channel.send("chong");
  }

  if (message.content.endsWith("quoi") || message.content.endsWith("quoi ?")) {
    message.channel.send("feur");
  }

  if (message.content == prefix + "dino") {
    message.channel.send("https://cdn.discordapp.com/attachments/797469950913806340/824948173398736896/dinosaures-evolution-connaissances-une-OK.png")
  }

  if (message.content == prefix + "stats") {
    message.channel.send(
      "**" +
        message.author.username +
        "**" +
        " avec l'identifiant " +
        message.author.id +
        " a envoyé un message"
    );
  }
});

client.login("Nzk3NDczODY4ODUxNDQ1Nzcw.X_m_ag.1y60j47KehRElx-kzjIlebQDe20");
