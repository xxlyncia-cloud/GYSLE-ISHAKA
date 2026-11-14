const fs = require('fs')
module.exports = async (sock, m, { sender }) => {
  let stok = JSON.parse(fs.readFileSync('./stok-netflix.json'))
  if (stok.length === 0) return sock.sendMessage(sender, { text: 'Stok Netflix lagi kosong bos 🙏' })
  await sock.sendMessage(sender, { text: `*STOK NETFLIX: ${stok.length} akun*\n\nKetik *.beli netflix* buat beli` })
}
