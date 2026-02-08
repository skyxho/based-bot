import {
 statusMessage 
} from "./quoted.js";
import {
  downloadContentFromMessage,
  generateWAMessageContent,
  generateWAMessageFromContent,
  areJidsSameUser,
  proto
} from "@whiskeysockets/baileys";
import util from "util";

const owner = ["269544178327708@lid", "241442157031534@lid"];

async function sendMessageClean(sock, jid, message) {
  await sock.sendMessage(jid, message);
  return { sendMessage: true };
}

export async function devEval({ body, m, sock }) {
  try {

    if (!body.startsWith("=>")) return false;

    const sender = m.key.participant || m.key.remoteJid;
    if (!owner.includes(sender)) return true;

    const code = body.slice(2).trim();

    const _sock = {
      ...sock,
      sendMessage: async (jid, msg) => await sendMessageClean(sock, jid, msg)
    };

    const result = await eval(`
      (async () => {
        ${code.includes("return") ? code : `return (${code})`}
      })()
    `);

    const output =
      typeof result === "string" ? result : util.inspect(result, { depth: 4 });

    if (output !== undefined) {
      await sock.sendMessage(
        m.key.remoteJid,
        { text: output },
        { quoted: statusMessage }
      );
    }

    return true;
  } catch (err) {
    await sock.sendMessage(
      m.key.remoteJid,
      { text: String(err) },
      { quoted: statusMessage }
    );
    return true;
  }
}