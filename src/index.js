import dotenv from "dotenv";
import { randomInt } from "crypto";
import Discord, { Message, ReactionUserManager } from "discord.js";
import { bark } from "./insulte.js";
import { RiotAPI, RiotAPITypes, PlatformId } from "@fightmegg/riot-api";

dotenv.config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const rAPI = new RiotAPI(process.env.RIOT_API_KEY);
const summonerIds = {
  gengu: "XnaMcVFhTjgyMgJ-_31uLWHvZSHGJqd4uqifMHotVcXrjrapuHRe5XZj",
  swann: "Th-3ibbTKKYy5NVrMA6_29-tikdA_PFqmtolaxr-zqzJHII",
  jules: "",
  hugo: "rx5uni800cIreoG-6Bmn7shIoUufE0tqOLbJ5BQDg1HyOkA",
};

client.on("ready", () => {
  if (client.user && client.user.tag) {
    console.log(`Logged in as ${client.user.tag}!`);
  }
});

client.on("message", handleMessage);

function handleMessage(msg) {
  switch (msg.content.toLowerCase()) {
    case "board":
      handleBoard(msg.author.username, msg);
      break;
    case "insulte gengu":
    case "insulte jean-loup":
      msg.channel.send(createInsulte("gengu"));
      break;
    case "insulte namkwa":
    case "insulte hugo":
      msg.channel.send(createInsulte("namkwa"));
      break;
    case "insulte swann":
    case "insulte bard":
      msg.channel.send(createInsulte("bard"));
      break;
    case "insulte jules":
    case "insulte geciflard":
      msg.channel.send(createInsulte("geciflard"));
      break;
    case "bot-dog-gengu help":
      displayBotHelp(msg);
      break;
    default:
      break;
  }
}

/**
 *
 * @param {string} username
 * @param {Message} msg
 */
async function handleBoard(username, msg) {
  // GET SUMMONNER - LAST GAME
  const summoner = await getSummoner(username);
  const lastMatchs = await getMatchList(summoner.accountId);
  const lastMatch = await getLastMatch(lastMatchs.matches[0].gameId);
  // msg.reply(summoner.accountId);
  const messageContent = generateBoadContent(lastMatch);
  msg.reply(messageContent);
}

function displayBotHelp(msg) {
  msg.reply("Pour que le chien insulte quelqu'un ```insulte pseudo/prenom```");
}

client.login(token);

function generateBoadContent(lastMatch) {
  const ids = Object.values(summonerIds);
  const ServUserInGame = lastMatch.participantIdentities.filter(
    (participant) => {
      return ids.includes(participant.player.accountId);
    }
  );
  const idLol = ServUserInGame.map((participant) => participant.participantId);
  console.log(idLol);
  const participants = lastMatch.participants.filter((participant) => {
    return idLol.includes(participant.participantId);
  });
  const kda = [];
  participants.forEach((participant) => {
    kda.push(calculateKDA(participant));
  });
  console.dir(participants);
  return `\`\`\`JSON
    ${JSON.stringify(kda)}
  \`\`\``;
}

function calculateKDA(participant) {
  (participant.kills + participant.assists) / participant.deaths;
}

async function getLastMatch(id) {
  const lastMatch = await rAPI.match.getById({
    region: PlatformId.EUW1,
    matchId: id,
  });
  return lastMatch;
}

async function getMatchList(summonerId) {
  const lastMatchs = await rAPI.match.getMatchlistByAccount({
    region: PlatformId.EUW1,
    accountId: summonerId,
    params: {
      endIndex: 1,
    },
  });
  return lastMatchs;
}

async function getSummoner(name) {
  const summoner = await rAPI.summoner.getBySummonerName({
    region: PlatformId.EUW1,
    summonerName: name,
  });
  return summoner;
}

/**
 * @deprecated
 * @deadCode
 * @param {string} channelId
 */
function getChannel(channelId) {
  return client.channels.cache.get(channelId);
}
/**
 * @deprecated
 * @deadCode
 * @param {string} channelId
 */
function getChannelToken() {
  if (process.env.BARKING_HARD_ID != undefined) {
    return process.env.BARKING_HARD_ID;
  }
  throw new Error("process.env.BARKING_HARD_ID not define");
}

/**
 * @deprecated
 * @deadCode
 */
function getServerId() {
  if (process.env.TEST_SERVER_ID != undefined) {
    return process.env.TEST_SERVER_ID;
  }
  throw new Error("process.env.TEST_SERVER_ID not define");
}

function getUserToken(user) {
  switch (user) {
    case "namkwa":
      return "145994841560580096";
    case "gengu":
      return "302468272325001216";
    case "bard":
      return "297454107214741504";
    case "geciflard":
      return "466681862547570708";
    default:
      return "";
  }
}

function createInsulte(user) {
  const dest = getUserToken(user);
  const insulte = bark[randomInt(bark.length)];

  return `<@${dest}> ${insulte}`;
}
