GYSLE-ISHAKA

*`plugins/menu.js`*
module.exports = async (sock, m) => {
  let text = `*${global.botName}*
  
*JUALAN*
.jualviu - Beli Viu Premium
.jualnetflix - Beli Netflix
.cekstok - Cek stok

*FITUR GRUP*
.hidetag - Tag semua member
.kick @tag - Kick member
.welcome on/off

*DOWNLOADER*
.tiktok <link>
.ig <link>
.ytmp3 <link>

*LAINNYA*
.stiker - Bikin stiker dari foto
.tempmail - Bikin email sementara
.cektoken <token> - Cek inbox tempmail
`
  await sock.sendMessage(m.key.remoteJid, { text })
}
