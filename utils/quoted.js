// File: ./utils/quoted.js
import {
 proto 
} from "@whiskeysockets/baileys";
import {
 Buffer 
} from "buffer";

export const statusMessage = {
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