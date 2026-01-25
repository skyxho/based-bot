// File: ./utils/dev.js
import {
 statusMessage
} from "./quoted.js";
import util from "util";

export async function devEval({ body, m, sock, isOwner }) {
  if (!body.startsWith("=>")) return false
  if (!isOwner) return true

  try {
    const code = body.slice(2).trim()

    let result = eval(code)

    if (typeof result !== "string") {
      result = util.inspect(result, { depth: 3 })
    }

    await sock.sendMessage(
      m.key.remoteJid,
      { text: result },
      { quoted: statusMessage }
    )
  } catch (err) {
    await sock.sendMessage(
      m.key.remoteJid,
      { text: String(err) },
      { quoted: statusMessage }
    )
  }

  return true
}