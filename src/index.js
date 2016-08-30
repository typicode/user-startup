const os = require('os')
const platform = os.platform()
const startup = require(`./startup/${platform}.js`)

module.exports = startup
