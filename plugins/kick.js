module.exports = async (sock, m, { isOwner }) => {
  if (!m.key.remoteJid.endsWith('@g.us')) return sock.sendMessage(m.key.remoteJid, { text: 'Cuma bisa di grup!' })
  let mentioned = m.message.extendedTextMessage?.contextInfo?.mentionedJid
  if (!mentioned || !mentioned[0]) return sock.sendMessage(m.key.remoteJid, { text: 'Contoh: .kick @temen' })
  try {
    await sock.groupParticipantsUpdate(m.key.remoteJid, mentioned, 'remove')
    await sock.sendMessage(m.key.remoteJid, { text: `✅ Berhasil kick @${mentioned[0].split('@')[0]}`, mentions: mentioned })
  } catch {
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Bot bukan admin, jadiin bot admin dulu.' })
  }
}
