import dotenv from "dotenv";
import { randomInt } from "crypto";
import Discord from "discord.js";
import { bark } from "./insulte.js";

dotenv.config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;

client.on("ready", () => {
  if (client.user && client.user.tag) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
  const channelId = getChannelToken();

  const channel = getChannel(channelId);

  const dayInMilisec = 24 * 3600 * 100; // hours * nbsec in minute * 100 for mili

  setInterval(() => {
    channel.send(createInsulte());
  }, dayInMilisec);
});

client.on("message", (msg) => {
  if (msg.content === "insulte gengu") {
    msg.channel.send(createInsulte());
  }

  if (msg.content === "bot-dog-gengu help") {
    msg.reply("Pour que le chien insulte gengu ```insulte gengu```");
  }
});

client.login(token);

function getChannel(channelId) {
  return client.channels.cache.get(channelId);
}

function getChannelToken() {
  if (process.env.CHANNEL_TEST_ID != undefined) {
    return process.env.CHANNEL_TEST_ID;
  }
  throw new Error("process.env.CHANNEL_TEST_ID not define");
}

/**
 * @deprecated
 * @deadCode
 */
function getServerId() {
  if (process.env.TEST_SERVER_ID != undefined) {
    return process.env.TEST_SERVER_ID;
  }
  throw new Error("process.env.CHANNEL_TEST_ID not define");
}

function createInsulte() {
  const dest = "@gengu";
  const insulte = bark[randomInt(bark.length)];
  return `${dest} ${insulte}`;
}
