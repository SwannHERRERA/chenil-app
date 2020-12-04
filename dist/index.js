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
});
client.on("message", (msg) => {
    if (msg.content === "insulte gengu") {
        const insulte = bark[randomInt(bark.length)];
        msg.reply(`@gengu ${insulte}`);
    }
});
client.login(token);
//# sourceMappingURL=index.js.map