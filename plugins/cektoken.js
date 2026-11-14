const fetch = require('node-fetch')
module.exports = async (sock, m, { args }) => {
  if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Contoh: .cektoken TOKEN_KAMU' })
  try {
    let res = await (await fetch('https://api.mail.tm/messages', { headers: { Authorization: `Bearer ${args[0]}` } })).json()
    let msgs = res['hydra:member']
    if (!msgs || msgs.length === 0) return sock.sendMessage(m.key.remoteJid, { text: '📭 Inbox masih kosong, belum ada OTP masuk' })
    let teks = `📬 *INBOX (${msgs.length})*\n\n`
    msgs.slice(0,5).forEach((msg,i) => {
      teks += `${i+1}. Dari: ${msg.from.address}\n   Subjek: ${msg.subject}\n   Isi: ${msg.intro}\n\n`
    })
    await sock.sendMessage(m.key.remoteJid, { text: teks })
  } catch {
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Token salah / kadaluarsa. Bikin baru: .tempmail' })
  }
}
