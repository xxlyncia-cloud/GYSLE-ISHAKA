module.exports = async (sock, m, { args }) => {
  const jid = m.key.remoteJid
  const sub = (args[0] || '').toLowerCase()

  if (sub === 'harga') {
    return sock.sendMessage(jid, { text: `*🎬 ALIGHT MOTION PREMIUM RESMI*\n\n- 1 Bulan: Tanya owner\n- 1 Tahun: Tanya owner\n\nKetik .beli am buat order\nBayar = langsung diproses, aman no ban.` })
  }
  if (sub === 'tutorial') {
    return sock.sendMessage(jid, { text: `*🎬 TUTORIAL AM PEMULA*\n\n1. Buka project baru 9:16\n2. Tambah video / foto\n3. Pake keyframe buat gerakin\n4. Export 1080p 30fps\n\nMau gua bikinin preset jedag-jedug? Ketik .am preset` })
  }
  // default .am
  return sock.sendMessage(jid, { text: `*🎬 ALIGHT MOTION*\n\nKetik:\n.am harga - Harga premium resmi\n.am tutorial - Tutorial pemula\n\nMau beli yang resmi? Ketik .beli am` })
}
