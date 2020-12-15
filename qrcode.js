console.log('qrcode.js aktif!')
const TeleBot = require('telebot')
const delay = require('delay')
const QRCode = require('qrcode')
const bot = new TeleBot({
    token: process.env.TOKEN
})
module.exports = bot => {
bot.on(/^\/qrcode ([\s\S]+)/, async (msg, args) => {
    const arg = args.match[1]
    QRCode.toDataURL(arg, function (err, url) {
        const file = url
        const fileOpts = {
        filename: 'image',
        contentType: 'image/jpg',
        };
        bot.sendPhoto(msg.from.id, Buffer.from(file.substr(22), 'base64'), fileOpts);
        return bot.sendMessage(msg.from.id, '✅QR CODE BERHASIL DIBUAT✅')
        }).catch((err) => {
            return bot.sendMessage(msg.from.id, `ERROR NGAB | ${err}`)
        })
    })
}
