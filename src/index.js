const os = require('os')

module.exports = function Startup () {
  const platform = os.platform()
  const supported = ['darwin', 'linux', 'win32']

  if (supported.indexOf(platform) > -1) {
    return require(`./startup/${platform}.js`)
  }

  throw new Error(`Unsupported platform ${platform}`)
}
