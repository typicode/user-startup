const os = require('os')
const platform = os.platform()
const startup = require(`./startup/${platform}.js`)

module.exports = startup

const _add = startup.add
const _create = startup.create

// Handles:
// id, cmd
// id, cmd, args
// id, cmd, out
// id, cmd, args, out
function _args (id, cmd, ...args) {
  if (args.length === 1) {
    const [cmdArgsOrOut] = args
    if (Array.isArray(cmdArgsOrOut)) {
      return [id, cmd, cmdArgsOrOut]
    } else {
      return [id, cmd, [], cmdArgsOrOut]
    }
  }
  return [id, cmd, args[0], args[1]]
}

module.exports.add = function add () {
  const args = _args.apply(this, arguments)
  _add.apply(startup, args)
}

module.exports.create = function create () {
  const args = _args.apply(this, arguments)
  _create.apply(startup, args)
}
