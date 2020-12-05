var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    setInterval(() => {
        channel.send(createInsulte());
    }, 50000);
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
    return __awaiter(this, void 0, void 0, function* () {
        return client.channels.find((channel) => channel.id === channelId);
    });
}
function getChannelToken() {
    if (process.env.CHANNEL_TEST_ID != undefined) {
        return process.env.CHANNEL_TEST_ID;
    }
    throw new Error("process.env.CHANNEL_TEST_ID not define");
}
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
//# sourceMappingURL=index.js.map