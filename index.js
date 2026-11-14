const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const path = require('path')

global.owner = ['6285143014791']
global.botName = 'GYSLE-ISHAKA'
global.pairingNumber = '6285792806395'

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({ logger: pino({ level: 'silent' }), auth: state, printQRInTerminal: false })

  sock.ev.on('creds.update', saveCreds)

  if (!sock.authState.creds.registered) {
    setTimeout(async () => {
      try {
        let code = await sock.requestPairingCode(global.pairingNumber)
        console.log('=== KODE PAIRING LU: ' + code + ' ===')
        console.log('Buka WA bot > Perangkat Tertaut > Tautkan dengan nomor telepon > Masukin kode ini')
      } catch (e) { console.log('Gagal minta pairing code', e) }
    }, 3000)
  }

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut
      console.log('Koneksi putus, reconnect...', shouldReconnect)
      if (shouldReconnect) start()
    } else if (connection === 'open') {
      console.log('✅ BOT UDAH CONNECT BOS! - ' + global.botName)
    }
  })

  sock.ev.on('group-participants.update', async (anu) => {
    try {
      let welcomeOn = false
      if (fs.existsSync('./welcome.json')) welcomeOn = JSON.parse(fs.readFileSync('./welcome.json')).on
      if (!welcomeOn) return
      for (let p of anu.participants) {
        if (anu.action === 'add') await sock.sendMessage(anu.id, { text: `👋 Selamat datang @${p.split('@')[0]} di grup! Ketik .menu`, mentions: [p] })
        else if (anu.action === 'remove') await sock.sendMessage(anu.id, { text: `👋 Bye @${p.split('@')[0]}`, mentions: [p] })
      }
    } catch {}
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return
    const jid = m.key.remoteJid
    const text = m.message.conversation || m.message.extendedTextMessage?.text || m.message.imageMessage?.caption || ''
    if (!text.startsWith('.')) return
    const args = text.slice(1).trim().split(' ')
    let command = args.shift().toLowerCase()
    // ALIAS
    if (command === 'tt') command = 'tiktok'
    if (command === 'ig') command = 'instagram'
    if (command === 'insta') command = 'instagram'

    const sender = m.key.participant || m.key.remoteJid
    const isOwner = global.owner.includes(sender.split('@')[0])
    const pluginPath = path.join(__dirname, 'plugins', command + '.js')
    if (!fs.existsSync(pluginPath)) return
    try {
      delete require.cache[require.resolve(pluginPath)]
      const plugin = require(pluginPath)
      await plugin(sock, m, { args, command, sender, isOwner, body: text })
    } catch (e) { console.log('Error plugin ' + command, e) }
  })
}
start()
