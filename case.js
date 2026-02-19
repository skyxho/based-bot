// File: ./case.js
import * as baileys from "@whiskeysockets/baileys";
import {
  downloadContentFromMessage,
  generateWAMessageContent,
  generateWAMessageFromContent,
  areJidsSameUser,
  proto
} from "@whiskeysockets/baileys";
import {
 Buffer 
} from "buffer";
import {
 statusMessage,
 XR
} from "./utils/quoted.js";
import {
 devEval 
} from "./utils/dev.js";
import crypto from "crypto";
import chalk from "chalk";
import axios from "axios";
import https from "https";
import util from "util";
import fs from "fs";

export default async function handleMessage(sock, msgUpdate) {
try {
if (!msgUpdate.messages || !msgUpdate.messages.length) return
const m = msgUpdate.messages[0]
if (!m.message) return
const msg = m.message
const getText = (msg) => {
  if (!msg) return ""
  if (msg.ephemeralMessage) {
    msg = msg.ephemeralMessage.message
  }
  if (msg.viewOnceMessageV2) {
    msg = msg.viewOnceMessageV2.message
  }
  return (
    msg.conversation ||
    msg.extendedTextMessage?.text ||
    msg.imageMessage?.caption ||
    msg.videoMessage?.caption ||
    msg.documentMessage?.caption ||
    ""
  )
}
const text = getText(msg)
if (!text) return

const reply = (txt) =>
  sock.sendMessage(m.key.remoteJid, { text: txt }, { quoted: m })

if (!m.key || !m.key.remoteJid) return

const getQuotedMessage = (m) => {
  let msg = m.message;

  if (!msg) return null;

  if (msg.ephemeralMessage) {
    msg = msg.ephemeralMessage.message;
  }

  if (msg.viewOnceMessage || msg.viewOnceMessageV2) {
    msg = (msg.viewOnceMessage || msg.viewOnceMessageV2).message;
  }

  const ext = msg.extendedTextMessage;
  if (!ext?.contextInfo?.quotedMessage) return null;

  let q = ext.contextInfo.quotedMessage;

  if (q.ephemeralMessage) {
    q = q.ephemeralMessage.message;
  }

  if (q.viewOnceMessage || q.viewOnceMessageV2) {
    q = (q.viewOnceMessage || q.viewOnceMessageV2).message;
  }

  return q;
};

const sender = m.key.participant || m.key.remoteJid
const isGroup = m.key.remoteJid.endsWith("@g.us")
const owner = ["269544178327708@lid", "241442157031534@lid"]
const isOwner = owner.includes(sender)

const body =
  msg.conversation ||
  msg.extendedTextMessage?.text ||
  msg.imageMessage?.caption ||
  ""
if (await devEval({ body, m, sock, isOwner })) return

const forbidden = "https://github.com/skyxho/upload-image-based/raw/refs/heads/main/IMG-20260125-WA0539(1).jpg"
const thumb = "https://raw.githubusercontent.com/skyxho/upload-image-based/main/8e21c9809218091e7a2bf7f3514b4c3b.jpg"

const downloadQuoted = async (type, message) => {
  const stream = await downloadContentFromMessage(message, type);
  let buffer = Buffer.alloc(0);
  for await (const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk]);
  }
  return buffer;
};

 // ======== FUNCTION ======== //
function runtime(uptimeSeconds) {
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = Math.floor(uptimeSeconds % 60);

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  const normal = `${hh}-${mm}-${ss}`;

  const boldDigits = normal.replace(/[0-9]/g, (d) =>
    String.fromCharCode(d.charCodeAt(0) + 0x1D7CE)
  );

  return `[ ${boldDigits} ]`;
}

async function getThumbBuffer(url) {
  const res = await axios.get(url, {
    responseType: "arraybuffer"
  })
  return Buffer.from(res.data)
}

const prefix = "."
if (!text.startsWith(prefix)) return
const args = text.slice(prefix.length).trim().split(/ +/)
const command = args.shift().toLowerCase()

 // ======== CASE BOT ======== //
    switch (command) {
// case .balzx
case 'balzx': {
	if (!isOwner) return
const jid = m.key.remoteJid
const users = m.key.participant || jid

const userTime = new Date().toLocaleTimeString("id-ID", { hour12: false });
const userJid = m.key.participant || m.key.remoteJid
const adminSt = "269544178327708@lid"
const userTag = adminSt.split("@")[0]
const userCommand = command || "unknown";
console.log(
chalk.white("\n") + "┏╾" + "<💭>" + "[" + "" +
chalk.bgGreen.black("𝗖𝗢𝗠𝗠𝗔𝗡𝗗") + "" +
chalk.white("]") + " " +
chalk.cyan.bold(`.${userCommand}`) + " <⏰>" +
chalk.bgGray.white.bold(`[${userTime}]`) + " " +
chalk.white(" ") + " " +
chalk.white("\n") + "┣" +
chalk.yellow.bold(`[ ${users} ]`) + " " + "©𝗥𝗲𝘅𝘇𝗦𝘂𝗸𝗶" +
chalk.white("\n") + "┗╾≫" + " " +
chalk.white("[") + "" +
chalk.bgRed.black("々") +
chalk.white("]") + " " +
chalk.white.bold("Sending with out message . . .") + " "
);
await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } })

const photo = "https://github.com/skyxho/upload-image-based/raw/refs/heads/main/IMG-20260125-WA0119.jpg"

await sock.sendMessage(
jid,
{
image: {
url: photo
},
caption: `> *\`💥\` -𝗭𝗵𝘂𝗫𝘇𝗩𝗼.𝟵𝟬𝟴?!*
*-Привет! —𝗡𝗮𝗻𝗗𝘇𝟰𝟬𝟰—*
 *Я ассистент готовый*
  *помочь вам решить*
     *вашу проблему.*

*➥* \`𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡\` *𝝮*
 *❐- 𝗗𝗲𝘃:* @ZhuXzVo?!
 *-❐ 𝗩𝗲𝗿:* 0.2-Beta 🌟
 *❐- 𝗕𝗮𝘀𝗲:* ESM/CASE
 *-❐ 𝗧𝗲𝗹𝗲:* t.me/xvoldz
         *goоgle.com*
`,
mentions: [userJid],
contextInfo: {
forwardingScore: 252,
isForwarded: true,
externalAdReply: {
title: "𝗱𝟳𝗲𝗽𝗽𝗲𝗹𝗶.𝗽𝗱𝗳",
body: "© 2025 - 2026",
thumbnailUrl: thumb,
renderLargerThumbnail: false,
sourceUrl: "t.me/xvoldz"
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363405191556298@newsletter",
newsletterName: "🕊️-𝗭𝗵𝘂𝗫𝘇 𝗚𝗻𝗫𝘇-",
serverMessageId: null
}
}
},
{ quoted: statusMessage }
);
await sock.sendMessage(
  m.key.remoteJid,
  {
    audio: fs.readFileSync("./utils/sound.opus"),
    mimetype: "audio/ogg; codecs=opus",
    ptt: true,
    seconds: 0
  },
  { quoted: m }
);
await sock.sendMessage(m.key.remoteJid, { react: { text: "🌟", key: m.key } })
console.log(
chalk.white(" ") + " " +
chalk.white("[") + "" +
chalk.bgBlue.black("𝗦𝗧𝗔𝗧𝗨𝗦") + "" +
chalk.white("]") + " " + "<" +
chalk.bgGreen.black("✅") + ">" + " " +
chalk.white.bold("Successfully Send Message . . .") + " "
);
break;
}

// case .mbud
case 'mbud': {
	if (!isOwner) return
const jid = m.key.remoteJid
const users = m.key.participant || jid

const userTime = new Date().toLocaleTimeString("id-ID", { hour12: false });
const userJid = m.key.participant || m.key.remoteJid
const adminSt = "269544178327708@lid"
const userTag = adminSt.split("@")[0]
const userCommand = command || "unknown";
const alwayss = "https://raw.githubusercontent.com/skyxho/upload-image-based/refs/heads/main/0b589484f3d69f870cea444c7ccadf18.jpg";
console.log(
chalk.white("\n") + "┏╾" + "<💭>" + "[" + "" +
chalk.bgGreen.black("𝗖𝗢𝗠𝗠𝗔𝗡𝗗") + "" +
chalk.white("]") + " " +
chalk.cyan.bold(`.${userCommand}`) + " <⏰>" +
chalk.bgGray.white.bold(`[${userTime}]`) + " " +
chalk.white(" ") + " " +
chalk.white("\n") + "┣" +
chalk.yellow.bold(`[ ${users} ]`) + " " + "©𝗥𝗲𝘅𝘇𝗦𝘂𝗸𝗶" +
chalk.white("\n") + "┗╾≫" + " " +
chalk.white("[") + "" +
chalk.bgRed.black("々") +
chalk.white("]") + " " +
chalk.white.bold("Sending with out message . . .") + " "
);
await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } })

const photo = "https://github.com/skyxho/upload-image-based/raw/refs/heads/main/1735ff27bca2a113feb1d189f1222ad3.jpg"

await sock.sendMessage(
jid,
{
image: {
url: photo
},
caption: `          *goоgle.com*`,
mentions: [userJid],
contextInfo: {
forwardingScore: 252,
isForwarded: true,
externalAdReply: {
title: "𝗠𝗿.𝗬𝗼𝘂𝘁𝗮𝗸𝗮?",
body: "© 2025 - 2026",
thumbnailUrl: alwayss,
renderLargerThumbnail: false,
sourceUrl: "t.me/xvoldz"
},
forwardedNewsletterMessageInfo: {
newsletterJid: "120363405191556298@newsletter",
newsletterName: "𝐘𝐓: 𝐘𝐨𝐤𝐚𝐭𝐚.𝐅𝐥𝐚𝐠'𝐬",
serverMessageId: null
}
}
},
{ quoted: XR }
);
await sock.sendMessage(m.key.remoteJid, { react: { text: "🌟", key: m.key } })
console.log(
chalk.white(" ") + " " +
chalk.white("[") + "" +
chalk.bgBlue.black("𝗦𝗧𝗔𝗧𝗨𝗦") + "" +
chalk.white("]") + " " + "<" +
chalk.bgGreen.black("✅") + ">" + " " +
chalk.white.bold("Successfully Send Message . . .") + " "
);
break;
}

// case .speed
case"speed":{
if(!isOwner) return
const start=Date.now()
const latency=Date.now()-start
await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } })
await sock.sendMessage(
m.key.remoteJid,
{
text:`> *⏱️ Speed: ${latency}ms*`,
contextInfo:{
forwardingScore: 252,
isForwarded: true,
externalAdReply:{
title:"𝗱𝟳𝗲𝗽𝗽𝗲𝗹𝗶.𝗽𝗱𝗳",
body:"© 2025 - 2026",
thumbnailUrl:thumb,
sourceUrl:"t.me/xvoldz",
renderLargerThumbnail:false
}
}
},
{quoted:statusMessage}
)
await sock.sendMessage(m.key.remoteJid, { react: { text: "🌟", key: m.key } })
break;
}

// case .runtime
case "runtime": {
if (!isOwner) return
const uptime = process.uptime()
const runtimeText = runtime(uptime)
const text = `> *⏰Runtime: ${runtimeText}*
`
await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } })
await sock.sendMessage(
m.key.remoteJid,
{
text: text,
contextInfo: {
forwardingScore: 252,
isForwarded: true,
externalAdReply: {
title: "𝗱𝟳𝗲𝗽𝗽𝗲𝗹𝗶.𝗽𝗱𝗳",
body: "© 2025 - 2026",
thumbnailUrl: thumb,
sourceUrl: "t.me/xvoldz",
renderLargerThumbnail: false
}
}
},
{ quoted: statusMessage }
)
await sock.sendMessage(m.key.remoteJid, { react: { text: "🌟", key: m.key } })
break
}

// case .swgc
case "swgc": {
  if (!isGroup) return reply("grup only!");
  if (!isOwner) return
  await reply("*Wait a minute. . .*");

let jid = m.key.remoteJid;
let caption = "";

if (args.length > 0 && args[0].endsWith("@g.us")) {
  jid = args[0];
  caption = args.slice(1).join(" ").trim();
} else {
  caption = args.join(" ").trim();
}

  const options = { upload: sock.waUploadToServer };
  let content = {};

  let quotedMsg = getQuotedMessage(m);

  let directMsg = m.message;
  if (directMsg?.ephemeralMessage) directMsg = directMsg.ephemeralMessage.message;
  if (directMsg?.viewOnceMessage || directMsg?.viewOnceMessageV2) {
    directMsg = (directMsg.viewOnceMessage || directMsg.viewOnceMessageV2).message;
  }

  if (!quotedMsg) {
    if (directMsg?.imageMessage) quotedMsg = { imageMessage: directMsg.imageMessage };
    else if (directMsg?.videoMessage) quotedMsg = { videoMessage: directMsg.videoMessage };
    else if (directMsg?.audioMessage) quotedMsg = { audioMessage: directMsg.audioMessage };
  }

  if (!quotedMsg) {
    content = { text: caption || " " };
    options.backgroundColor = "#000000";
  }

  else {
    const mediaKey =
      quotedMsg.imageMessage ? "imageMessage" :
      quotedMsg.videoMessage ? "videoMessage" :
      quotedMsg.audioMessage ? "audioMessage" :
      null;

    if (!mediaKey) return reply("*reply media message untuk menggunakan fitur .swgc*");

    const mime = quotedMsg[mediaKey]?.mimetype || "";

    if (mediaKey === "imageMessage") {
      const buf = await downloadQuoted("image", quotedMsg.imageMessage);
      content = { image: buf, caption: caption || undefined };

    } else if (mediaKey === "videoMessage") {
      const buf = await downloadQuoted("video", quotedMsg.videoMessage);
      content = {
        video: buf,
        caption: caption || undefined,
        gifPlayback: /gif/i.test(mime)
      };

    } else if (mediaKey === "audioMessage") {
      const buf = await downloadQuoted("audio", quotedMsg.audioMessage);
      content = {
        audio: buf,
        mimetype: mime || "audio/mpeg",
        ptt: /opus|ogg/i.test(mime)
      };
    }
  }

  try {
    const inside = await generateWAMessageContent(content, options);
    const messageSecret = crypto.randomBytes(32);

    const msgToSend = generateWAMessageFromContent(
      jid,
      {
        groupStatusMessageV2: {
          message: {
            ...inside,
            messageContextInfo: { messageSecret }
          }
        }
      },
      {}
    );

    await sock.relayMessage(jid, msgToSend.message, {
      messageId: msgToSend.key.id
    });

    await reply("*✅ Berhasil upload status grup*");
  } catch (e) {
    console.error("upswgc error:", e);
    reply("*❌ Gagal upload status grup*");
  }
  break;
}

case 'ht': {
  if (!isGroup) return reply("*Group Only*");

  const metadata = await sock.groupMetadata(m.key.remoteJid);
  const participants = metadata.participants || [];

  if (!isOwner) return

  const htText =
    args.join(" ") ||
    m.message?.extendedTextMessage?.contextInfo?.quotedMessage?.conversation;

  if (!htText) return reply("*example: .ht halo semua*");

await sock.sendMessage(
  m.key.remoteJid,
  {
    text: htText,
    mentions: participants.map(p => p.id)
  },
  {
    quoted: statusMessage
  }
);
}

case "post": {
  if (!isOwner) return reply("*Owner only*");

  if (args.length < 1) {
    return reply("*example: .post ...@g.us hallo*");
  }

  let targetJid = args[0];
  if (!targetJid.endsWith("@g.us")) {
    return reply("*ID grup tidak valid (@g.us)*");
  }

  let caption = args.slice(1).join(" ").trim();

  const options = { upload: sock.waUploadToServer };
  let content = {};

  let quotedMsg = getQuotedMessage(m);
  
  let metadata = await sock.groupMetadata(targetJid);
  let participants = metadata.participants || [];
  let mentions = participants.map(p => p.id);

  let directMsg = m.message;
  if (directMsg?.ephemeralMessage) directMsg = directMsg.ephemeralMessage.message;
  if (directMsg?.viewOnceMessage || directMsg?.viewOnceMessageV2) {
    directMsg = (directMsg.viewOnceMessage || directMsg.viewOnceMessageV2).message;
  }

  if (!quotedMsg) {
    if (directMsg?.imageMessage) quotedMsg = { imageMessage: directMsg.imageMessage };
    else if (directMsg?.videoMessage) quotedMsg = { videoMessage: directMsg.videoMessage };
    else if (directMsg?.audioMessage) quotedMsg = { audioMessage: directMsg.audioMessage };
  }

if (!quotedMsg) {
  content = {
    text: caption || " ",
    mentions
  };
} else {
    const mediaKey =
      quotedMsg.imageMessage ? "imageMessage" :
      quotedMsg.videoMessage ? "videoMessage" :
      quotedMsg.audioMessage ? "audioMessage" :
      null;

    if (!mediaKey) return reply("*reply media untuk .post*");

    const mime = quotedMsg[mediaKey]?.mimetype || "";

if (mediaKey === "imageMessage") {
  const buf = await downloadQuoted("image", quotedMsg.imageMessage);
  content = {
    image: buf,
    caption: caption || undefined,
    mentions
  };
} else if (mediaKey === "videoMessage") {
  const buf = await downloadQuoted("video", quotedMsg.videoMessage);
  content = {
    video: buf,
    caption: caption || undefined,
    mentions,
    gifPlayback: /gif/i.test(mime)
  };
} else if (mediaKey === "audioMessage") {
      const buf = await downloadQuoted("audio", quotedMsg.audioMessage);
      content = {
        audio: buf,
        mimetype: mime || "audio/mpeg",
        ptt: /opus|ogg/i.test(mime)
      };
    }
  }

  try {
    await sock.sendMessage(targetJid, content, {
      quoted: XR
    });

    reply("*✅ Berhasil post ke grup target*");
  } catch (e) {
    console.error("post error:", e);
    reply("*❌ Gagal post ke grup*");
  }
  break;
}

case "tovn": {
    try {
        const ctx = msg.message?.extendedTextMessage?.contextInfo;

        // react loading
        await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } });

        // download audio
        const stream = await downloadContentFromMessage(ctx.quotedMessage, "audio");
        let buffer = Buffer.from([]);
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk]);

        // temp file
        const tempDir = path.resolve("./temp");
        await fs.promises.mkdir(tempDir, { recursive: true });
        const audioPath = path.join(tempDir, `input_${Date.now()}.ogg`);
        const opusPath = path.join(tempDir, `output_${Date.now()}.opus`);
        await fs.promises.writeFile(audioPath, buffer);

        // convert ke opus
        await new Promise((resolve, reject) => {
            const ffmpeg = spawn("ffmpeg", [
                "-i", audioPath,
                "-c:a", "libopus",
                "-b:a", "128k",
                "-ar", "16000",
                "-ac", "1",
                "-vbr", "on",
                "-application", "voip",
                "-f", "opus",
                "-y",
                opusPath
            ]);
            ffmpeg.on("close", code => code === 0 ? resolve() : reject(new Error(`FFmpeg exited with code ${code}`)));
            ffmpeg.on("error", reject);
        });

        // kirim VN
        await sock.sendMessage(m.key.remoteJid, {
            audio: fs.readFileSync(opusPath),
            mimetype: "audio/ogg; codecs=opus",
            ptt: true
        }, { quoted: msg });

        // cleanup
        await fs.promises.unlink(audioPath).catch(() => {});
        await fs.promises.unlink(opusPath).catch(() => {});

    } catch (err) {
        console.error("❌ ToVn Error:", err);
        reply(`*⚠️ Gagal ubah ke VN:* ${err.message}`);
    }
    break;
}

case "sw": {
  if (!isOwner) return reply("*Owner only*");

  if (args.length < 1) return reply("*example: .swgc 120363333246957858@g.us Hallo semua*");

  let targetJid = args[0];
  if (!targetJid.endsWith("@g.us")) return reply("*ID grup tidak valid (@g.us)*");

  let caption = args.slice(1).join(" ").trim();

  const options = { upload: sock.waUploadToServer };
  let content = {};

  let quotedMsg = getQuotedMessage(m);

  // ambil metadata target grup untuk mentions
  let mentions = [];
  try {
    const metadata = await sock.groupMetadata(targetJid);
    mentions = metadata.participants.map(p => p.id);
  } catch (e) {
    console.error("Metadata grup error:", e);
  }

  let directMsg = m.message;
  if (directMsg?.ephemeralMessage) directMsg = directMsg.ephemeralMessage.message;
  if (directMsg?.viewOnceMessage || directMsg?.viewOnceMessageV2) {
    directMsg = (directMsg.viewOnceMessage || directMsg.viewOnceMessageV2).message;
  }

  if (!quotedMsg) {
    if (directMsg?.imageMessage) quotedMsg = { imageMessage: directMsg.imageMessage };
    else if (directMsg?.videoMessage) quotedMsg = { videoMessage: directMsg.videoMessage };
    else if (directMsg?.audioMessage) quotedMsg = { audioMessage: directMsg.audioMessage };
  }

  if (!quotedMsg) {
    content = { text: caption || " ", mentions };
    options.backgroundColor = "#000000";
  } else {
    const mediaKey =
      quotedMsg.imageMessage ? "imageMessage" :
      quotedMsg.videoMessage ? "videoMessage" :
      quotedMsg.audioMessage ? "audioMessage" :
      null;

    if (!mediaKey) return reply("*reply media untuk .swgc*");

    const mime = quotedMsg[mediaKey]?.mimetype || "";

    if (mediaKey === "imageMessage") {
      const buf = await downloadQuoted("image", quotedMsg.imageMessage);
      content = { image: buf, caption: caption || undefined, mentions };
    } else if (mediaKey === "videoMessage") {
      const buf = await downloadQuoted("video", quotedMsg.videoMessage);
      content = { video: buf, caption: caption || undefined, mentions, gifPlayback: /gif/i.test(mime) };
    } else if (mediaKey === "audioMessage") {
  const buf = await downloadQuoted("audio", quotedMsg.audioMessage);

  content = {
    backgroundColor: "#000000",
    mentions,
    audio: buf,
    mimetype: mime || "audio/mpeg",
    ptt: /opus|ogg/i.test(mime)
  };

  options.backgroundColor = "#000000";
}
  }

  try {
    const inside = await generateWAMessageContent(content, options);
    const messageSecret = crypto.randomBytes(32);

    // update status grup target
    const msgToSend = generateWAMessageFromContent(
      targetJid,
      {
        groupStatusMessageV2: {
          message: {
            ...inside,
            messageContextInfo: { messageSecret }
          }
        }
      },
      {}
    );

    await sock.relayMessage(targetJid, msgToSend.message, { messageId: msgToSend.key.id });

    await reply("*✅ Berhasil update status grup target*");
  } catch (e) {
    console.error("swgc error:", e);
    await reply("*❌ Gagal update status grup*");
  }
  break;
}

case "cekid": {
  if (!isOwner) return
  if (!args[0]) return reply("*Ex: .cekid <link>*");

  try {
    const link = args[0].trim();
    const match = link.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,})/);
    if (!match) return reply("*❌ Link tidak valid*");

    const code = match[1];

    const info = await sock.groupGetInviteInfo(code);

    await sock.sendMessage(
      m.key.remoteJid,
      {
        text: `${info.id}`,
      },
      { quoted: XR }
    );
  } catch (err) {
    console.error("cekid error:", err);
    reply("*❌ Gagal ambil info grup, pastikan link valid dan invite belum expired*");
  }
  break;
}

}
} catch (err) {
console.error("⚠️ Error di case.js :", err);
}
}