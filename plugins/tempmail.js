const fetch = require('node-fetch')
module.exports = async (sock, m) => {
  try {
    let domains = await (await fetch('https://api.mail.tm/domains')).json()
    let domain = domains['hydra:member'][0].domain
    let email = `user${Math.floor(Math.random()*99999)}@${domain}`
    let pass = '12345678'
    await fetch('https://api.mail.tm/accounts', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({address: email, password: pass}) })
    let token = await (await fetch('https://api.mail.tm/token', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({address: email, password: pass}) })).json()
    await sock.sendMessage(m.key.remoteJid, { text: `📧 Temp Mail\nEmail: ${email}\nPass: ${pass}\nToken: ${token.token}\n\nCek inbox: .cektoken ${token.token}` })
  } catch {
    await sock.sendMessage(m.key.remoteJid, { text: '❌ Gagal bikin tempmail, coba lagi nanti.' })
  }
}
