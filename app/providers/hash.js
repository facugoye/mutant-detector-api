var crypto = require('crypto')

module.exports = {
    hash: obj => {
        return crypto.createHash('md5')
                .update(JSON.stringify(obj), 'utf8')
                .digest('hex')
    }
}