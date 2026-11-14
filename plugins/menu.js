module.exports = async (sock, m, { sender }) => {
  let text = `*GYSLE-ISHAKA BOT*
  
*.menu* - liat menu
*.viu* - cek stok viu
*.netflix* - cek stok netflix
*.beli viu* - beli viu
*.beli netflix* - beli netflix
*.cekorder* - cek pesanan
*.welcome on/off* - nyala/matikan welcome`
  await sock.sendMessage(sender, { text })
}
