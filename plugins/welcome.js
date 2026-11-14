const fs = require('fs')
module.exports = async (sock, m, { args }) => {
  if (args[0] === 'on') {
    fs.writeFileSync('./welcome.json', JSON.stringify({ on: true }))
    await sock.sendMessage(m.key.remoteJid, { text: '✅ Welcome ON' })
  } else if (args[0] === 'off') {
    fs.writeFileSync('./welcome.json', JSON.stringify({ on: false }))
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Welcome OFF' })
  } else {
    await sock.sendMessage(m.key.remoteJid, { text: 'Contoh: .welcome on / .welcome off' })
  }
}
