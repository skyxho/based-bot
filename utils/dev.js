import {
 areJidsSameUser 
} from "@whiskeysockets/baileys"
import {
 statusMessage 
} from "./quoted.js"
import util from "util";

const owner = "269544178327708@lid"

export async function devEval({ body, m, sock }) {
  if (!body.startsWith("=>")) return false

  const sender = m.key.participant || m.key.remoteJid
  const isOwner = areJidsSameUser(sender, owner)
  if (!isOwner) return true

  try {
    const code = body.slice(2).trim()

    const result = await eval(`
      (async () => {
        ${code.includes("return") ? code : `return (${code})`}
      })()
    `)

    const output =
      typeof result === "string"
        ? result
        : util.inspect(result, { depth: 4 })

    if (output !== undefined) {
      await sock.sendMessage(
        m.key.remoteJid,
        { text: output },
        { quoted: statusMessage }
      )
    }

  } catch (err) {
    await sock.sendMessage(
      m.key.remoteJid,
      { text: String(err) },
      { quoted: statusMessage }
    )
  }

  return true
}