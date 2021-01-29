import dotenv from "dotenv";
import { randomInt } from "crypto";
import Discord, { Message, ReactionUserManager } from "discord.js";
import { bark } from "./insulte.js";
import { RiotAPI, RiotAPITypes, PlatformId } from "@fightmegg/riot-api";
import { throws } from "assert";

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
client.login(token);

function handleMessage(msg) {
  switch (msg.content.toLowerCase()) {
    case "board":
      // handleBoard(msg.author.username, msg);
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

function generateBoadContent(lastMatch) {
  const ServUserInGame = getServUserInGame(lastMatch);
  const participants = getServParticipantInGame(lastMatch, ServUserInGame);
  const kda = getKDA(participants, ServUserInGame);

  return createBoardMessage(kda);
}

function getServUserInGame(game) {
  const ids = Object.values(summonerIds);
  return game.participantIdentities.filter((participant) => {
    return ids.includes(participant.player.accountId);
  });
}

function getServParticipantInGame(game, ServUserInGame) {
  const idLol = ServUserInGame.map((participant) => participant.participantId);
  return game.participants.filter((participant) => {
    return idLol.includes(participant.participantId);
  });
}

function getKDA(participants, ServUserInGame) {
  const kda = new Map();
  participants.forEach((participant) => {
    kda.set(
      findSummonerNameByParticipantId(
        ServUserInGame,
        participant.participantId
      ),
      calculateKDA(participant.stats)
    );
  });
  return kda;
}

function createBoardMessage(kda) {
  let result = `\`\`\`JSON\n`;
  kda.forEach((value, key) => (result += `${key}: ${value}\n`));
  result += `\`\`\``;
  return result;
}

function findSummonerNameByParticipantId(participants, participantId) {
  const participant = participants.filter(
    (participant) => participant.participantId === participantId
  );
  if (
    participant[0] &&
    participant[0].player &&
    participant[0].player.summonerName
  ) {
    return participant[0].player.summonerName;
  }
  return 0;
}

function calculateKDA(stats) {
  if (stats.deaths === 0) {
    return `Perfect KDA K+A: ${stats.kills + stats.assists}`;
  }
  return (stats.kills + stats.assists) / stats.deaths;
}

async function getLastMatch(id) {
  try {
    const lastMatch = await rAPI.match.getById({
      region: PlatformId.EUW1,
      matchId: id,
    });
    return lastMatch;
  } catch (e) {
    console.error(e);
  }
}

async function getMatchList(summonerId) {
  try {
    const lastMatchs = await rAPI.match.getMatchlistByAccount({
      region: PlatformId.EUW1,
      accountId: summonerId,
      params: {
        endIndex: 1,
      },
    });
    return lastMatchs;
  } catch (e) {
    console.error(e);
  }
}

async function getSummoner(name) {
  try {
    const summoner = await rAPI.summoner.getBySummonerName({
      region: PlatformId.EUW1,
      summonerName: name,
    });
    return summoner;
  } catch (e) {
    console.error(e);
  }
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
