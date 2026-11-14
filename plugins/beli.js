const fs = require('fs')
module.exports = async (sock, m, { sender, args, participant }) => {
  let jenis = (args[0] || '').toLowerCase()
  if (!jenis) return sock.sendMessage(sender, { text: 'Cara pakai: *.beli viu* atau *.beli netflix*' })
  if (jenis !== 'viu' && jenis !== 'netflix') return sock.sendMessage(sender, { text: 'Cuma ada viu & netflix bos' })

  let file = jenis === 'viu' ? './stok-viu.json' : './stok-netflix.json'
  let stok = JSON.parse(fs.readFileSync(file))
  if (stok.length === 0) return sock.sendMessage(sender, { text: `Stok ${jenis} kosong bos 🙏` })

  let akun = stok.shift()
  fs.writeFileSync(file, JSON.stringify(stok, null, 2))

  let orders = JSON.parse(fs.readFileSync('./order.json'))
  orders.push({ buyer: participant, jenis, email: akun.email, tanggal: new Date().toLocaleString('id-ID') })
  fs.writeFileSync('./order.json', JSON.stringify(orders, null, 2))

  await sock.sendMessage(sender, { text: `*PESANAN ${jenis.toUpperCase()} BERHASIL!*\n\nEmail: ${akun.email}\nPass: ${akun.pass}\nProfil: ${akun.profil}\nPIN: ${akun.pin}\n\nMakasih udah beli di GYSLE-ISHAKA!` })
}
