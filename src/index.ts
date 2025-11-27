import { Client } from "discord.js-selfbot-v13";
import handleMessageCreate from "./utils/messageHandler.js";

const client = new Client();

client.on("ready", async (readyClient: Client<true>) => {
  console.log(`${readyClient.user.username} is ready!`);
});

client.on("messageCreate", handleMessageCreate);

client.login(process.env.TOKEN);
