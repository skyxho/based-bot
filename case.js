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
import {
 statusMessage
} from "./utils/quoted.js";
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

const sender = m.key.participant || m.key.remoteJid
const isGroup = m.key.remoteJid.endsWith("@g.us")
const isOwner = sender === "269544178327708@lid"

const prefix = "."
if (!text.startsWith(prefix)) return
const args = text.slice(prefix.length).trim().split(/ +/)
const command = args.shift().toLowerCase()
 
 if (!m.key || !m.key.remoteJid) return
 
 // ======== CASE BOT ======== //
    switch (command) {
// case .balzx
case 'balzx': {
if (!isOwner) return reply("❌ Khusus owner.")
const jid = m.key.remoteJid
const sender = m.key.participant || jid

const thumbPath = "./image/whns.jpg"
const thumbBuffer = fs.existsSync(thumbPath)
? fs.readFileSync(thumbPath)
: Buffer.alloc(0)
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
*-Привет! @${userTag}-*
 *Я ассистент готовый*
  *помочь вам решить*
     *вашу проблему.*

*➥* \`𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡\`
*❐- 𝗗𝗲𝘃:* ZhuXzVo?!
*-❐ 𝗩𝗲𝗿:* 0.2-Beta 🌟
*❐- 𝗕𝗮𝘀𝗲:* ESM/CASE
*-❐ 𝗧𝗲𝗹𝗲:* t.me/xvoldz
`,
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
const audioBuf = await axios.get(
"https://example.com/audio.ogg",
{ responseType: "arraybuffer" }
)
await sock.sendMessage(
jid,
{
audio: Buffer.from(audioBuf.data),
mimetype: "audio/ogg; codecs=opus",
ptt: true
},
{ quoted: m }
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