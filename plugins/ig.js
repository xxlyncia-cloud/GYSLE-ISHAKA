const fetch = require('node-fetch')
module.exports = async (sock, m, { args }) => {
  if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Contoh: .ig https://www.instagram.com/reel/xxx' })
  await sock.sendMessage(m.key.remoteJid, { text: '⏳ Lagi download IG...' })
  try {
    let res = await (await fetch(`https://api.zenkey.my.id/api/downloader/instagram?url=${args[0]}`)).json()
    let url = res.result?.[0]?.url || res.downloadUrl
    if (!url) throw new Error('Gagal')
    await sock.sendMessage(m.key.remoteJid, { video: { url }, caption: '✅ IG Download Berhasil' })
  } catch {
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Gagal, coba link Reels yang public aja.' })
  }
}
