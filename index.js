// File: ./index.js
import baileys, {
  makeWASocket,
  DisconnectReason,
  fetchLatestBaileysVersion,
  useMultiFileAuthState
} from "@whiskeysockets/baileys";
import pino from "pino";
import chalk from "chalk";
import readline from "readline";
import { Boom } from "@hapi/boom";
import handleMessage from "./case.js";
import path from "path"
import os from "os"
import fs from "fs";

const logger = pino({ level: "silent" });
const usePairingCode = true;

async function question(prompt) {
  process.stdout.write(prompt)
  const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => r1.question("", (ans) => {
    r1.close()
    resolve(ans)
  }))
}

async function connectToWhatsapp() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");
  console.log(chalk.blue("🌐 Menghubungkan..."));
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`⚙️  ZhuXz v0.0.2 | WA v${version.join(".")} | isLatest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: !usePairingCode,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    generateHighQualityLinkPreview: true,
    syncFullHistory: true,
    auth: state,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id)
        return msg?.message || undefined
      }
      return proto.Message.fromObject({})
    }
  });

if (usePairingCode && !sock.authState.creds.registered) {
  try {
    console.log(chalk.green("🪴 Masukan Nomor Kamu +62xxx:"));
    const phoneNumber = await question("> ");
    const code = await sock.requestPairingCode(phoneNumber.trim(), "ZHUXGANZ");
    console.log(chalk.cyan(`🔗 Kode Pairing: ${code}`));
  } catch (err) {
    console.error(chalk.red("Gagal ambil pairing code:"), err);
  }
}

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const reason = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = reason !== DisconnectReason.loggedOut;

      console.log(chalk.red("\n" + "❌ Koneksi terputus, mencoba ulang..."));
      if (shouldReconnect) {
        await new Promise((r) => setTimeout(r, 3000));
        connectToWhatsapp();
      } else {
        console.log(chalk.red("💀 Logout terdeteksi. Hapus session & scan ulang."));
      }
    } else if (connection === "open") {
      console.log(chalk.green("✅ Terhubung ke WhatsApp!"));
    }
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async (msgUpdate) => {
    try {
      if (!msgUpdate.messages?.length) return;
      const m = msgUpdate.messages[0];
      if (!m.message) return;
      await handleMessage(sock, msgUpdate);
    } catch (err) {
      console.error(chalk.red("⚠️ Error di handler pesan:"), err);
    }
  });
}

console.log(
  chalk.yellow.bold(`
⡏⠉⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣿
⣿⠀⠀⠀⠈⠛⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⠉⠁⠀⣿
⣿⣧⡀⠀⠀⠀⠀⠙⠿⠿⠿⠻⠿⠿⠟⠿⠛⠉⠀⠀⠀⠀⠀⣸⣿
⣿⣿⣷⣄⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿
⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣴⣿⣿⣿⣿
⣿⣿⣿⡟⠀⠀⢰⣹⡆⠀⠀⠀⠀⠀⠀⣭⣷⠀⠀⠀⠸⣿⣿⣿⣿
⣿⣿⣿⠃⠀⠀⠈⠉⠀⠀⠤⠄⠀⠀⠀⠉⠁⠀⠀⠀⠀⢿⣿⣿⣿
⣿⣿⣿⢾⣿⣷⠀⠀⠀⠀⡠⠤⢄⠀⠀⠀⠠⣿⣿⣷⠀⢸⣿⣿⣿
⣿⣿⣿⡀⠉⠀⠀⠀⠀⠀⢄⠀⢀⠀⠀⠀⠀⠉⠉⠁⠀⠀⣿⣿⣿
⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿
⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿
`) + chalk.cyan.bold(`@𝗟𝗲𝘅𝘇𝗦𝘁𝗼𝗿𝗲`) + "\n\n" + 
chalk.yellow.bold(`𝗥𝗲𝘅𝘇𝗦𝘂𝗸𝗶 𝗕𝗼𝘁 [ 𝗱𝗲𝘃 ] 𝗯𝗲𝘁𝗮 𝘃𝗲𝗿𝘀𝗶𝗼𝗻`)
);

connectToWhatsapp();