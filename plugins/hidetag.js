module.exports = async (sock, m, { args }) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return sock.sendMessage(m.key.remoteJid, { text: 'Cuma bisa di grup!' })
  let meta = await sock.groupMetadata(m.key.remoteJid)
  let members = meta.participants.map(p => p.id)
  let teks = args.join(' ') || 'Halo semua, dibaca ya!'
  await sock.sendMessage(m.key.remoteJid, { text: teks, mentions: members })
} 
