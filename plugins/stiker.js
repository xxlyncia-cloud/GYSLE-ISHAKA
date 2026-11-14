module.exports = async (sock, m) => {
  let q = m.message.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage
  if (!q) return sock.sendMessage(m.key.remoteJid, { text: 'Reply foto + ketik .stiker' })
  await sock.sendMessage(m.key.remoteJid, { text: 'Fitur stiker butuh ffmpeg, install dulu di VPS / Termux: pkg install ffmpeg' })
}
