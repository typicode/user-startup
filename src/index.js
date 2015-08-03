let os = require('os')
let platform = os.platform()
module.exports = require(`./startup/${platform}.js`)
