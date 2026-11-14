const fs = require('fs')
module.exports = async (sock, m, { sender, isOwner }) => {
  if (!isOwner) return sock.sendMessage(sender, { text: 'Khusus owner bos!' })
  let orders = JSON.parse(fs.readFileSync('./order.json'))
  if (orders.length === 0) return sock.sendMessage(sender, { text: 'Belum ada orderan' })
  let text = '*DAFTAR ORDER*\n\n' + orders.map((o, i) => `${i+1}. ${o.jenis} - ${o.email} - ${o.buyer}`).join('\n')
  await sock.sendMessage(sender, { text })
}
