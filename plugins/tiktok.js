const fetch = require('node-fetch')
module.exports = async (sock, m, { args }) => {
  if (!args[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Contoh: .tiktok https://vt.tiktok.com/xxx' })
  await sock.sendMessage(m.key.remoteJid, { text: '⏳ Lagi download TikTok...' })
  try {
    let res = await (await fetch(`https://api.tiklydown.eu.org/api/download?url=${args[0]}`)).json()
    let video = res.video?.noWatermark || res.video?.play
    if (!video) throw new Error('Gagal')
    await sock.sendMessage(m.key.remoteJid, { video: { url: video }, caption: `✅ TikTok\nAuthor: ${res.author?.nickname || '-'}` })
  } catch {
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Gagal download, link salah / API lagi down.' })
  }
}
