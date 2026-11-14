const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys')
const pino = require('pino')
const fs = require('fs')
const path = require('path')
const qrcode = require('qrcode-terminal')

global.owner = ['6285143014791']
global.botName = 'GYSLE-ISHAKA'
global.prefix = '.'

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session')
  const { version } = await fetchLatestBaileysVersion()
  const sock = makeWASocket({ version, logger: pino({ level: 'silent' }), printQRInTerminal: true, auth: state, browser: ['Bot MD', 'Chrome', '1.0'] })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update
    if (qr) qrcode.generate(qr, { small: true })
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut
      if (shouldReconnect) startBot()
    } else if (connection === 'open') console.log('BOT UDAH CONNECT BOS!')
  })
  sock.ev.on('messages.upsert', async ({ messages }) => {
    let m = messages[0]
    if (!m.message || m.key.fromMe) return
    let msgType = Object.keys(m.message)[0]
    let body = m.message.conversation || m.message.extendedTextMessage?.text || m.message[msgType]?.caption || ''
    if (!body.startsWith(global.prefix)) return
    let args = body.slice(1).trim().split(/ +/)
    let command = args.shift().toLowerCase()
    let sender = m.key.remoteJid
    let participant = m.key.participant || m.key.remoteJid
    let isOwner = global.owner.includes(participant.replace('@s.whatsapp.net',''))
    let pluginPath = path.join(__dirname, 'plugins', command + '.js')
    if (fs.existsSync(pluginPath)) {
      try {
        delete require.cache[require.resolve(pluginPath)]
        let handler = require(pluginPath)
        await handler(sock, m, { args, command, sender, isOwner, body, participant })
      } catch (e) {
        console.log(e)
        await sock.sendMessage(sender, { text: 'Error: ' + e.message })
      }
    }
  })
}
startBot()
