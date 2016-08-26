let fs = require('fs')
let cp = require('child_process')
let mkdirp = require('mkdirp')
let untildify = require('untildify')

export let dir = untildify('~\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup')

export function getFile (name) {
  return `${dir}\\${name}.vbs`
}

export function add (name, cmd, args = [], out = null) {
  let file = getFile(name)

  let command = `""${cmd}""`

  if (args.length) {
    let escapedArgs = args.map(a => `""${a}""`).join(' ')

    command += ` ${escapedArgs}`
  }

  if (out) {
    command += ` > ""${out}""`
  }

  let data = `CreateObject("Wscript.Shell").Run "cmd /c ""${command}""", 0, true`

  mkdirp.sync(dir)
  fs.writeFileSync(file, data)
  return file
}

export function create (name, cmd, args, out) {
  let file = add(name, cmd, args, out)

  // Spawn vbscript
  cp.spawn('cmd', ['/c', file], {
    stdio: 'ignore',
    detached: true
  }).unref()
}

export function remove (name) {
  let file = getFile(name)
  if (fs.existsSync(file)) fs.unlinkSync(file)
}
