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

if (!m.key || !m.key.remoteJid) return

const sender = m.key.participant || m.key.remoteJid
const isGroup = m.key.remoteJid.endsWith("@g.us")
const isOwner = sender === "269544178327708@lid"

const prefix = "."
if (!text.startsWith(prefix)) return
const args = text.slice(prefix.length).trim().split(/ +/)
const command = args.shift().toLowerCase()
 
 // ======== CASE BOT ======== //
    switch (command) {
// case .balzx
case 'balzx': {
if (!isOwner) return reply("❌ Khusus owner.")
const jid = m.key.remoteJid
const users = m.key.participant || jid

const thumb = "https://raw.githubusercontent.com/skyxho/upload-image-based/main/8e21c9809218091e7a2bf7f3514b4c3b.jpg"
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

const photo = "https://raw.githubusercontent.com/skyxho/upload-image-based/main/92b6c34029158052cb720e2c6f700433.jpg"

await sock.sendMessage(
jid,
{
image: {
url: photo
},
caption: `> *\`💥\` -𝗭𝗵𝘂𝗫𝘇𝗩𝗼.𝟵𝟬𝟴?!*
*-Привет!* @${userTag}-
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