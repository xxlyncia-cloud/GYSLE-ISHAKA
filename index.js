const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const path = require('path')
const qrcode = require('qrcode-terminal')

global.owner = ['6285143014791']
global.botName = 'GYSLE-ISHAKA'

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({ logger: pino({ level: 'silent' }), auth: state, printQRInTerminal: true })

  sock.ev.on('creds.update', saveCreds)

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

  // WELCOME OTOMATIS
  sock.ev.on('group-participants.update', async (anu) => {
    try {
      let welcomeOn = false
      if (fs.existsSync('./welcome.json')) {
        welcomeOn = JSON.parse(fs.readFileSync('./welcome.json')).on
      }
      if (!welcomeOn) return
      for (let p of anu.participants) {
        if (anu.action === 'add') {
          await sock.sendMessage(anu.id, { text: `👋 Selamat datang @${p.split('@')[0]} di grup!\nKetik .menu buat liat fitur ${global.botName}`, mentions: [p] })
        } else if (anu.action === 'remove') {
          await sock.sendMessage(anu.id, { text: `👋 Bye @${p.split('@')[0]}, semoga betah di luar!`, mentions: [p] })
        }
      }
    } catch {}
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0]
    if (!m.message || m.key.fromMe) return
    const jid = m.key.remoteJid
    const text = m.message.conversation || m.message.extendedTextMessage?.text || ''
    if (!text.startsWith('.')) return

    const args = text.slice(1).trim().split(' ')
    const command = args.shift().toLowerCase()
    const sender = m.key.participant || m.key.remoteJid

    // Cek owner
    const isOwner = global.owner.includes(sender.split('@')[0])

    // Cek file plugin ada gak
    const pluginPath = path.join(__dirname, 'plugins', command + '.js')
    if (!fs.existsSync(pluginPath)) return

    try {
      const plugin = require(pluginPath)
      await plugin(sock, m, { args, command, sender, isOwner, body: text })
    } catch (e) {
      console.log('Error plugin ' + command, e)
      await sock.sendMessage(jid, { text: '❌ Error, coba lagi bos.' })
    }
  })
}
start()
