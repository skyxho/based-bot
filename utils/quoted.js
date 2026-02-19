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
      totalCurrencyCode: "USD"
    }
  }),
  pushName: "Xezstrys Bot"
};

export const XR = { 
key: { 
remoteJid: '0@s.whatsapp.net', 
fromMe: false, 
id: `3g4n-x1z4`, 
participant: '18002428478@s.whatsapp.net' }, 
message: { 
requestPaymentMessage: { 
currencyCodeIso4217: "USD", 
amount1000: 8256, 
requestFrom: '0@s.whatsapp.net', noteMessage: { 
extendedTextMessage: { 
text: `-𝗭𝗵𝘂𝗫𝘇𝗩𝗼.𝟳𝟳𝟴💥` 
} 
}, 
expiryTimestamp: 2026, 
amount: { 
value: 2026, 
offset: 2620, 
currencyCode: "USD" 
}
}
}
}