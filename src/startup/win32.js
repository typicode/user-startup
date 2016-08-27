const fs = require('fs')
const cp = require('child_process')
const mkdirp = require('mkdirp')
const untildify = require('untildify')

const dir = untildify('~\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup')

module.exports = {
  dir,
  getFile,
  add,
  create,
  remove
}

function getFile (name) {
  return `${dir}\\${name}.vbs`
}

function add (name, cmd, args = [], out) {
  const file = getFile(name)

  let command = `""${cmd}""`

  if (args.length) {
    const escapedArgs = args.map(a => `""${a}""`).join(' ')
    command += ` ${escapedArgs}`
  }

  if (out) {
    command += ` > ""${out}""`
  }

  const data = `CreateObject("Wscript.Shell").Run "cmd /c ""${command}""", 0, true`

  mkdirp.sync(dir)
  fs.writeFileSync(file, data)
  return file
}

function create (name, cmd, args, out) {
  const file = add(name, cmd, args, out)

  // Spawn vbscript
  cp.spawn('cmd', ['/c', file], {
    stdio: 'ignore',
    detached: true
  }).unref()
}

function remove (name) {
  const file = getFile(name)
  if (fs.existsSync(file)) fs.unlinkSync(file)
}
