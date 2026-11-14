module.exports = async (sock, m, { sender }) => {
  let text = `*🤖 ${global.botName}*

Halo @${sender.split('@')[0]}!

*🛒 JUALAN*
.beli viu / .beli netflix - Order
.cekorder - Cek orderan
.viu - Liat harga Viu
.netflix - Liat harga Netflix

*🎬 ALIGHT MOTION*
.am - Info Alight Motion
.am harga - Harga Premium Resmi
.am tutorial - Tutorial AM pemula

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
  await sock.sendMessage(m.key.remoteJid, { text, mentions: [sender] })
}
