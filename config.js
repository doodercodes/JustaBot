const { GatewayIntentBits, Partials } = require("discord.js");

module.exports = {
  // clientID: "1040504952793071616",
  // guildID: "1028718616553721896",
  BOT_TOKEN: process.env.BOT_TOKEN,
  MYSQL: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
  },
  CLIENT: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences,
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  },
};
