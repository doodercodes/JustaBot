// impports
require("dotenv").config();
const config = require("./config");

const { Client, ActivityType } = require("discord.js");
const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");

const ud = require("urban-dictionary");
const mysql = require("mysql");
const request = require("request");
const fs = require("fs");
const http = require("http");
const https = require("https");
const math = require("mathjs");

// create bot client with needed options
const client = new Client({
  partials: config.CLIENT.partials,
  intents: config.CLIENT.intents,
});

const unixTime = Math.floor(Date.now() / 1000);

// Create a connection to the mysql database
function mysqlConnect() {
  var mysqlParams = mysql.createConnection({
    // host: "127.0.0.1",
    // user: "ur user here",
    // password: "ur password here",
    // database: "ur db here",
  });
  return mysqlParams;
}

const objMysq = mysqlConnect();

// Functions needed for commands.
// Removes first word.
function rmF(str) {
  const indexOfSpace = str.indexOf(" ");
  if (indexOfSpace === -1) {
    return "";
  }
  return str.substring(indexOfSpace + 1);
}

// Sleep function, when you want the command to pause for a bit.
function sleep(time, callback) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {}
  callback();
}

const commands = [
  new SlashCommandBuilder()
    .setName("i")
    .setDescription("Searches Google Images")
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("enter search term")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("r")
    .setDescription("Performs your last /i search again"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken("ur token here");

rest
  .put(
    Routes.applicationGuildCommands(
      "ur server shit here ig",
      "ur server shit here ig"
    ),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);

// !
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  var senderID = interaction.user.id;
  (async () => {
    //await needs async
    const member = await interaction.guild.members.fetch(senderID); //remember you still need async
    var membersStatus = member.presence?.status;
    if (membersStatus === null || membersStatus === undefined) {
      var membersStatus = "offline";
    }

    // Determine if this chat is allowed to use the bot.
    var sql = "SELECT * FROM discord WHERE discord_id = ?";
    objMysq.query(sql, [senderID], function (err, rows, fields) {
      if (err) throw err;
      var preventError = rows.length;
      var errorCheck = preventError.toString();
      if (errorCheck > "0") {
        // Grab information about sender from the database.
        const myTeleID = rows[0].discord_id;
        const myBanned = rows[0].banned;
        const aiEnabled = rows[0].ai_enabled;
        const aaDmin = rows[0].ai_admin;
        const myLastI = rows[0].last_search;

        // Check whether or not the sender is banned from using JustaBot.
        if (commandName === "i") {
          if (myBanned === "yes") {
            //interaction.reply("im confused. it seems ur offline <:pepesmile:961516075135160330>");
          } else {
            var searchQuery = interaction.options.getString("search");
            //await interaction.reply('use -i for now <:pepeGrin:1001962955820245152>');
            let query =
              "UPDATE discord SET last_search='" +
              searchQuery +
              "' WHERE discord_id='" +
              senderID +
              "'";
            objMysq.query(query, (err, rows) => {});
            var r = request.get(
              "seledity inc secret url delete this if u cant figure out how to make your own web server with google custom search api" +
                searchQuery,
              function (err, res, body) {
                interaction.reply(body);
              }
            );
          }
        }

        if (commandName === "r") {
          if (myBanned === "yes") {
            //interaction.reply("im confused. it seems ur offline <:pepesmile:961516075135160330>");
          } else {
            var searchQuery = interaction.options.getString("search");
            //await interaction.reply('use -i for now <:pepeGrin:1001962955820245152>');
            var sql = "SELECT * FROM discord WHERE discord_id = ?";
            objMysq.query(sql, [senderID], function (err, rows, fields) {
              if (err) throw err;
              var preventError = rows.length;
              var errorCheck = preventError.toString();
              if (errorCheck > "0") {
                const myLastI = rows[0].last_search;
                var r = request.get(
                  "seledity inc secret url delete this if u cant figure out how to make your own web server with google custom search api" +
                    myLastI,
                  function (err, res, body) {
                    interaction.reply(body);
                  }
                );
              }
            });
          }
        }
      }
    });
  })();
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    activities: [{ name: `you. GET OFF INVIS`, type: ActivityType.Watching }],
    status: "online",
  });
});

// Add role if reaction is added.
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  // Verify member if they react to the message in #rules.
  if (reaction.message.id === "1007001408958103562") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("961462248281362453");
  }
  // 18+ Role.
  if (reaction.message.id === "1027217198445502494") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("975932941291114547");
  }
  // #95a9df Role.
  if (reaction.message.id === "1022701182071885904") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1007010851003322379");
  }
  // #518efa Role.
  if (reaction.message.id === "1022702263858376754") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1017995357734584392");
  }
  // #0da2a2 Role.
  if (reaction.message.id === "1022702315922276382") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1018714201218367559");
  }
  // #deb887 Role.
  if (reaction.message.id === "1022702368518852638") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1020092393288110153");
  }
  // #078b00 Role.
  if (reaction.message.id === "1022703032074518649") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1022696313453809674");
  }
  // #00e1ff Role.
  if (reaction.message.id === "1022703064114802728") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1022696509344579615");
  }
  // #a725ff Role.
  if (reaction.message.id === "1022703421993791619") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1022696608481157120");
  }
  // #ff6f6f Role.
  if (reaction.message.id === "1022703953466622062") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1022703622515064923");
  }
  // #ee15c3 Role.
  if (reaction.message.id === "1027215978867736646") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1023316979064508610");
  }
  // #ccc105 Role.
  if (reaction.message.id === "1027216081988878436") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1023317213287043204");
  }
  // #ffc128 Role.
  if (reaction.message.id === "1027216165229039668") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1023317358128930887");
  }
  // #6ceb00 Role.
  if (reaction.message.id === "1027216226495234099") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1023317500512968834");
  }
  // #25ffc1 Role.
  if (reaction.message.id === "1027216287899857077") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.add("1027215369468915712");
  }
});

// Remove role if reaction is removed.
client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  // 18+ Role.
  if (reaction.message.id === "1027217198445502494") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("975932941291114547");
  }
  // #95a9df Role.
  if (reaction.message.id === "1022701182071885904") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1007010851003322379");
  }
  // #518efa Role.
  if (reaction.message.id === "1022702263858376754") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1017995357734584392");
  }
  // #0da2a2 Role.
  if (reaction.message.id === "1022702315922276382") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1018714201218367559");
  }
  // #deb887 Role.
  if (reaction.message.id === "1022702368518852638") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1020092393288110153");
  }
  // #078b00 Role.
  if (reaction.message.id === "1022703032074518649") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1022696313453809674");
  }
  // #00e1ff Role.
  if (reaction.message.id === "1022703064114802728") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1022696509344579615");
  }
  // #a725ff Role.
  if (reaction.message.id === "1022703421993791619") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1022696608481157120");
  }
  // #ff6f6f Role.
  if (reaction.message.id === "1022703953466622062") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1022703622515064923");
  }
  // #ee15c3 Role.
  if (reaction.message.id === "1027215978867736646") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1023316979064508610");
  }
  // #ccc105 Role.
  if (reaction.message.id === "1027216081988878436") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1023317213287043204");
  }
  // #ffc128 Role.
  if (reaction.message.id === "1027216165229039668") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1023317358128930887");
  }
  // #6ceb00 Role.
  if (reaction.message.id === "1027216226495234099") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1023317500512968834");
  }
  // #25ffc1 Role.
  if (reaction.message.id === "1027216287899857077") {
    const member = await reaction.message.guild.members.fetch(user.id);
    member.roles.remove("1027215369468915712");
  }
});

client.on("messageCreate", (msg) => {
  //console.log(msg);
  const chatmsg = msg.content;
  var senderID = msg.author.id;
  (async () => {
    //await needs async
    const member = await msg.guild.members.fetch(senderID); //remember you still need async
    var membersStatus = member.presence?.status;
    if (membersStatus === null || membersStatus === undefined) {
      var membersStatus = "offline";
    }
    //console.log(membersStatus);
    //if(membersStatus === 'offline') {
    //  console.log(membersStatus);
    //  msg.react('<:getoffinvis:1011041876096323714>');
    //  msg.react('❌');
    //  msg.react('💩');
    //  member.timeout(1 * 60 * 1000, 'chatting while invis')
    //  .then()
    //   .catch();
    //   }

    //console.log(membersStatus);
    const senderName = "<@" + senderID + ">";
    const senderUsername = msg.author.username;
    const senderQuery = rmF(chatmsg);
    // tiktok 'command' (detects a tiktok url and uploads the video from it)
    if (
      chatmsg.startsWith("https://vm.tiktok.com/") === true ||
      chatmsg.startsWith("https://www.tiktok.com/") === true
    ) {
      msg.delete();
      request(
        {
          uri:
            "seledity inc secret url delete this if u cant figure out how to make your own web server with tiktok video grabbing sht" +
            chatmsg,
        },
        function (error, response, body) {
          (async function () {
            await new Promise((resolve) =>
              request(body)
                .pipe(fs.createWriteStream("tiktok.mp4"))
                .on("finish", function () {
                  msg.channel.send({
                    content: senderName + " sent a tiktok :)",
                    files: ["./tiktok.mp4"],
                  });
                })
            );
          })();
        }
      );
    }
    // ifunny 'command' (detects a ifunny url and uploads the video from it)
    //  if(chatmsg.startsWith('https://ifunny.co/video/') === true) {
    //    msg.delete();
    //    request({uri: "http://192.168.8.141/ifunny/?u=" + chatmsg},
    //    function(error, response, body) {
    //    (async function(){
    //        await new Promise(resolve =>
    //        request(body)
    //        .pipe(fs.createWriteStream('ifunny.h264'))
    //        .on('finish', async function () {
    //          console.log('ok now next');
    //          console.log('....');
    //          const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
    //          const ffmpeg = require('fluent-ffmpeg');
    //          ffmpeg.setFfmpegPath(ffmpegPath);
    //          var inFilename = "ifunny.h264";
    //            var outFilename = "ifunny.mp4";
    //          await new Promise(resolve =>
    //            ffmpeg(inFilename)
    //            .outputOptions('-r 24') // this will copy the data instead or reencode it
    //            .save(outFilename)
    //            .on('end', function () {
    //            console.log('ok');
    //              msg.channel.send({
    //                content: senderName + " sent an ifunny video :)",
    ///                files: [
    //                "./ifunny.mp4"
    //              ]
    //              });
    //            }));
    //      }));
    //    })()
    //  });
    ///  }
    // if a command was detected, by a message starting with "-", this is called
    const commandCheck = chatmsg.startsWith("-");
    if (commandCheck === true) {
      console.log("cmd");
      // Determine if this chat is allowed to use the bot.
      var sql = "SELECT * FROM discord WHERE discord_id = ?";
      objMysq.query(sql, [senderID], function (err, rows, fields) {
        if (err) throw err;
        var preventError = rows.length;
        var errorCheck = preventError.toString();
        if (errorCheck > "0") {
          // Grab information about sender from the database.
          const myTeleID = rows[0].discord_id;
          const myBanned = rows[0].banned;
          const aiEnabled = rows[0].ai_enabled;
          const aaDmin = rows[0].ai_admin;
          const myLastI = rows[0].last_search;
          const invis_crackdown = rows[0].invis_crackdown;
          // Check whether or not the sender is banned from using JustaBot.
          if (myBanned === "yes") {
            msg.react("❌");
          }
          // If they aren't banned, listen to and respond to 'dash' commands.
          else {
            // Listen for command: -purge (deletes X msgs)
            if (chatmsg.startsWith("-purge") === true && aaDmin === "true") {
              if (senderQuery === "") {
                msg.react("🤨");
              } else {
                if (Number.isInteger(+senderQuery)) {
                  if (senderQuery >= 100 || senderQuery <= 0) {
                    msg.react("🤨");
                  } else {
                    var senderQueer = +senderQuery + 1;
                    var senderQueer = senderQueer.toString();
                    async function clear() {
                      const fetched = await msg.channel.messages.fetch({
                        limit: senderQueer,
                      });
                      msg.channel.bulkDelete(fetched);
                    }
                    clear();
                  }
                } else {
                  //not a num
                  msg.react("🤨");
                }
              }
            }
            // joey cmd
            if (chatmsg.startsWith("-joey") === true) {
              msg.channel.send({
                content: senderName + ", fuuuuuUTTTUREE",
                files: ["./joey.mp4"],
              });
            }
            // Listen for command: -ud (searches Urban Dictionary)
            if (chatmsg.startsWith("-ud") === true) {
              // If sender forgot to include a search query, let them know.
              if (senderQuery === "") {
                var botResponse =
                  senderName +
                  ", you also have to include what you'd like to search for on Urban Dictionary.";
                msg.reply(botResponse);
              } else {
                // Search the query on UD.
                ud.define(senderQuery)
                  .then((results) => {
                    var word = results[0].word;
                    var def = results[0].definition;
                    var botResponse = "**" + word + "**" + ": " + def;
                    msg.reply(botResponse);
                    // If there was an error, describe it below.
                  })
                  .catch((error) => {
                    var botResponse =
                      senderName +
                      ', I could not find anything for "' +
                      senderQuery +
                      '" on Urban Dictionary.';
                    msg.reply(botResponse);
                  });
              }
            }
            // Listen for command: -calc (does math n sht)
            if (chatmsg.startsWith("-calc") === true) {
              if (senderQuery !== "") {
                const re = /\d+(\+|\-|\*|\/)\d+/;
                if (re.test(senderQuery) === true) {
                  var doMath = math.evaluate(senderQuery);
                  var doMath = senderQuery + " = " + doMath;
                  msg.reply(doMath + "\n" + senderName);
                } else {
                  msg.react("🤨");
                  msg.react("👎");
                }
              } else {
                msg.react("🤨");
              }
            }
            // Listen for command: -i, -R34, -gif, -r (searches Google Images through Google Custom Search API)
            if (
              chatmsg.startsWith("-i") === true ||
              chatmsg.startsWith("-R34") === true ||
              chatmsg.startsWith("-gif") === true ||
              chatmsg.startsWith("-r") === true
            ) {
              if (senderQuery === "" && chatmsg.startsWith("-r") === false) {
                var botResponse =
                  senderName +
                  ", you also have to include what you'd like to search for on Google Images.";
                msg.reply(botResponse);
              } else {
                var searchQuery = senderQuery;
                if (chatmsg.startsWith("-R34") === true) {
                  var searchQuery = senderQuery + " rule 34";
                }
                if (chatmsg.startsWith("-gif") === true) {
                  var searchQuery = senderQuery + " gif";
                }
                if (chatmsg.startsWith("-r") === true) {
                  var searchQuery = myLastI;
                }
                let query =
                  "UPDATE discord SET last_search='" +
                  searchQuery +
                  "' WHERE discord_id='" +
                  senderID +
                  "'";
                objMysq.query(query, (err, rows) => {});
                var r = request.get(
                  "seledity inc secret url delete this if u cant figure out how to make your own web server with google custom search api" +
                    searchQuery,
                  function (err, res, body) {
                    if (err !== null || body === "failed" || body === "quota") {
                      if (body === "quota") {
                        var botResponse =
                          senderName +
                          ', the daily quota for Google Images was exceeded. I saved "' +
                          searchQuery +
                          '" as your last search. Type "-r" later to try again.';
                      } else {
                        var botResponse =
                          senderName +
                          ', an error occured while searching for "' +
                          searchQuery +
                          '" on Google Images. I will make one more search attempt for you.';
                        // vv Attempt to search for the image again, if it failed. vv
                        var retryI = request.get(
                          "seledity inc secret url delete this if u cant figure out how to make your own web server with google custom search api" +
                            searchQuery,
                          function (err, res, body) {
                            if (
                              err !== null ||
                              body === "failed" ||
                              body === "quota"
                            ) {
                              if (body === "quota") {
                                var botResponse =
                                  senderName +
                                  ', the daily quota for Google Images was exceeded. I saved "' +
                                  searchQuery +
                                  '" as your last search. Type "-r" later to try again.';
                              } else {
                                var botResponse =
                                  senderName +
                                  ', searching for "' +
                                  searchQuery +
                                  '" on Google Images failed again. Type "-r" to retry your search.';
                              }
                              msg.reply(botResponse);
                            } else {
                              var optionalPhotoRetry = {
                                caption: '"' + searchQuery + '" ' + senderName,
                              };
                              var embed = {
                                image: {
                                  url: body.toString(),
                                },
                              };
                              msg.reply(body);
                            }
                          }
                        );
                        // ^^ Attempt to search for the image again, if it failed. ^^
                      }
                      msg.reply(botResponse);
                    } else {
                      var embed = {
                        image: {
                          url: body.toString(),
                        },
                      };
                      msg.reply(body);
                    }
                  }
                );
              }
            }
            // ai
            if (chatmsg.startsWith("-ai") === true) {
              if (aiEnabled === "no") {
                msg.react("❌");
              } else {
                const got = require("got");
                const question = senderQuery;
                (async () => {
                  const url =
                    "https://api.openai.com/v1/engines/davinci/completions";
                  const prompt = `${question}`;
                  const params = {
                    prompt: prompt,
                    max_tokens: 150,
                    temperature: 0.7,
                    frequency_penalty: 1,
                    presence_penalty: 0.4,
                    stop: "\nHuman",
                  };
                  const headers = {
                    Authorization: `Bearer ${process.env.OPENAI_SECRET_KEY}`,
                  };

                  try {
                    const response = await got
                      .post(url, { json: params, headers: headers })
                      .json();
                    output = `${prompt}${response.choices[0].text}`;
                    msg.reply(senderName + "\n\n" + output + "...");
                  } catch (err) {
                    console.log(err);
                  }
                })();
              }
            }
            // ai
          }
        } else {
          var insdata = {
            discord_id: senderID,
            username: senderUsername,
            last_search: "undefined",
          };
          objMysq.query(
            "INSERT INTO discord SET ?",
            insdata,
            function (err, result) {}
          );
          msg.react("🤨");
        }
      });
    }
  })(); // erase this
});

client.login(config.BOT_TOKEN);
