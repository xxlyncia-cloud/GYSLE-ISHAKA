export default async function on({ Exp, ev, Data }) {

let db = Data || global.Data || {}

if (!db.liststore) db.liststore = {}

ev.on({

  cmd: ["addlist"],

  tag: "store"

}, async (m) => {

  let cht = m.cht || m

  let _db = Data || global.Data || db

  if (!_db.liststore) _db.liststore = {}

  if (!_db.liststore[cht.id]) _db.liststore[cht.id] = {}

  if (!m.args) return Exp.sendMessage(cht.id, { text: "Format:.addlist nama | isi" }, { quoted: cht })

  let [key, value] = m.args.split("|")

  if (!key ||!value) return Exp.sendMessage(cht.id, { text: "Format:.addlist nama | isi" }, { quoted: cht })

  _db.liststore[cht.id][key.trim().toLowerCase()] = value.trim()

  Exp.sendMessage(cht.id, { text: `✅ Berhasil tambah *${key.trim()}*` }, { quoted: cht })

})

ev.on({

  cmd: ["list"],

  tag: "store"

}, async (m) => {

  let cht = m.cht || m

  let _db = Data || global.Data || db

  if (!_db.liststore) _db.liststore = {}

  if (!_db.liststore[cht.id]) _db.liststore[cht.id] = {}

  let storeDB = _db.liststore[cht.id]

  let keys = Object.keys(storeDB)

  if (keys.length === 0) return Exp.sendMessage(cht.id, { text: "masukan .addlist untuk melihat list contoh .addlist nama | isi" }, { quoted: cht })

  let jam = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' })

  let tgl = new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta' })

  let usertag = `@${cht.sender.split('@')[0]}`

  let txt = ` ⣀⣀..⣀⡀\n 
⣴⠶⣦⣀⢀⣠⠖⣻⠆
⠙⣻⡿⠟⠛⢿⡍⠁ perss...⊙ + ${usertag}\n petite angels-!\n cotton candy ♡ store trusted and safe ࿐. laced❀\n\n ∞ ₊˚ time : ${jam}\n ∞ ₊˚ date : ${tgl}\n\n ──... ⭑ catalogue ○ ۫. ✿\n\n`

  keys.forEach(k => {

    txt += ` ᮫⁺ ִ  ֹ ⃝🍓 ݂ ⊹ ${k}\n`

  })

  txt += `\n ○. ɴotee ○ ʃ\n ⁺.˚ ketik list untuk melihat produk\n ⁺.˚ jika ada yang ingin di tanyakan bisa chat owner`

  Exp.sendMessage(cht.id, { text: txt, mentions: [cht.sender] }, { quoted: cht })

})

ev.on({

  cmd: ["dellist"],

  tag: "store"

}, async (m) => {

  let cht = m.cht || m

  let _db = Data || global.Data || db

  if (!m.args) return Exp.sendMessage(cht.id, { text: "Nama listnya mana?" }, { quoted: cht })

  let key = m.args.trim().toLowerCase()

  if (_db.liststore?.[cht.id]?.[key]) {

    delete _db.liststore[cht.id][key]

    Exp.sendMessage(cht.id, { text: `🗑️ Berhasil hapus *${key}*` }, { quoted: cht })

  } else {

    Exp.sendMessage(cht.id, { text: "List gak ketemu" }, { quoted: cht })

  }

})
    
// INI FINAL - BYPASS ev.on BIAR SPASI KEDETEK

if (!global.storeListener) {

  global.storeListener = true

  Exp.ev.on("messages.upsert", async (up) => {

    try {

      let msg = up.messages?.[0]

      if (!msg?.message) return

      let id = msg.key.remoteJid

      let text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || ""

      if (!text || text.startsWith(".")) return
     
      let q = text.trim().toLowerCase()

      let store = global.Data?.liststore?.[id]

      if (store?.[q]) {

        await Exp.sendMessage(id, { text: store[q] }, { quoted: msg })

      }

    } catch (e) { console.log("[STORE-BYPASS] err", e) }

  })

}

}
