const fetch = require('node-fetch')
module.exports = async (sock, m, { args }) => {
  if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Contoh: .ytmp3 https://youtu.be/xxx' })
  await sock.sendMessage(m.key.remoteJid, { text: '⏳ Convert ke MP3...' })
  try {
    let res = await (await fetch(`https://api.zenkey.my.id/api/downloader/ytmp3?url=${args[0]}`)).json()
    let url = res.result?.download || res.result?.url
    if (!url) throw new Error('Gagal')
    await sock.sendMessage(m.key.remoteJid, { audio: { url }, mimetype: 'audio/mpeg', fileName: 'lagu.mp3' })
  } catch {
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Gagal convert, coba link lain.' })
  }
}
