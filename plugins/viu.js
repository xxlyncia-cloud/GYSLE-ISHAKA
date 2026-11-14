const fs = require('fs')
module.exports = async (sock, m, { sender }) => {
  let stok = JSON.parse(fs.readFileSync('./stok-viu.json'))
  if (stok.length === 0) return sock.sendMessage(sender, { text: 'Stok VIU lagi kosong bos 🙏' })
  await sock.sendMessage(sender, { text: `*STOK VIU: ${stok.length} akun*\n\nKetik *.beli viu* buat beli` })
}
