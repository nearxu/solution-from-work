const encrypt = require('./jsencrypt')

const crypt = new encrypt.JSEncrypt({ default_key_size: 512 })

const timeStamp = (Date.parse(new Date()) / 1000).toString()

const ticket = crypt.encrypt(timeStamp)

let privateKey = crypt
  .getPrivateKey()
  .replace('-----BEGIN RSA PRIVATE KEY-----\n', '')

privateKey = privateKey.replace('\n-----END RSA PRIVATE KEY-----', '')

console.log('加密前的时间戳', timeStamp, '加密后的时间戳', ticket)
console.log('私钥：', crypt.getPrivateKey())
console.log('公钥：', crypt.getPublicKey())
console.log('处理后的私钥', privateKey)

console.log('解密---------------------')

console.log('ticket encrypt', crypt.decrypt(ticket))

// console.log('privateKey encrypt', crypt.decrypt(privateKey))
