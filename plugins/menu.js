module.exports = async (sock, m) => {
  let text = `*🤖 ${global.botName}*

*🛒 JUALAN*
.beli viu / .beli netflix - Order
.cekorder - Cek orderan
.viu - Liat harga Viu
.netflix - Liat harga Netflix
.amprem - 

*👥 GRUP*
.kick @tag - Kick member
.hidetag <teks> - Tag semua
.welcome on/off - Welcome

*⬇️ DOWNLOADER*
.tiktok <link>
.ig <link>
.ytmp3 <link>

*🛠️ TOOLS*
.stiker - Reply foto
.tempmail - Bikin email sementara
.cektoken <token> - Cek OTP tempmail
`
  await sock.sendMessage(m.key.remoteJid, { text })
}
