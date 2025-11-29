import { Message } from "discord.js-selfbot-v13";
import { config } from "./constants.js";
import { removeWaterMark } from "./gemini.js";
import FormData from "form-data";

async function handleMessageCreate(message: Message) {
  try {
    if (!message.inGuild()) return;

    const { channel, content, client, attachments } = message;

    const webhookURL = config[channel.id];

    // const channexxl = client.channels.cache.get(webhookURL);
    if (!webhookURL) return;
    // if (!channexxl || !channexxl.isText()) return;

    console.log(`Message sent in one of the channels: ${channel.name}`);

    const updatedContent = content.replace(
      /trading mafia/gi,
      "trading alliance"
    ); // case in-sensitive

    let file: Buffer<ArrayBuffer> | undefined | string;

    let fileExtension: string = "png";

    const fileInMessage = attachments.at(0);

    if (fileInMessage && fileInMessage.contentType?.startsWith("inage")) {
      const i = await removeWaterMark(fileInMessage);

      if (i) file = i;
    }

    if (fileInMessage && fileInMessage.contentType === "audio/ogg") {
      const res = await fetch(fileInMessage.url);

      const arrayBuff = await res.arrayBuffer();

      file = Buffer.from(arrayBuff);
      fileExtension = "ogg";
    }

    const form = new FormData();

    if (file) form.append(`files[0]`, file, `signal.${fileExtension}`);

    form.append("content", updatedContent || "");

    form.submit(
      `${webhookURL.replace("api", "api/v10")}?wait=true`,
      (err, res) => {
        if (!err) return;
        console.error(err);
        console.log(res);
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export default handleMessageCreate;
