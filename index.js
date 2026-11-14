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
      if (fs.exists
