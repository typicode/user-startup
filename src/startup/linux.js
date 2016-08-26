let fs = require('fs')
let cp = require('child_process')
let mkdirp = require('mkdirp')
let untildify = require('untildify')

export let dir = untildify('~/.config/autostart')

function spawn (cmd, args, out) {
  let fd = fs.openSync(out, 'w')
  cp
    .spawn(cmd, args, {
      stdio: ['ignore', fd, fd],
      detached: true
    })
    .on('error', console.log)
    .unref()
}

export function getFile (name) {
  return `${dir}/${name}.desktop`
}

export function add (name, cmd, args = [], out = null) {
  let file = getFile(name)

  let command = cmd

  if (args.length) {
    command += ` ${args.join(' ')}`
  }

  if (out) {
    command += ` > ${out}`
  }

  let data = [
    '[Desktop Entry]',
    'Type=Application',
    'Vestion=1.0',
    `Name=${name}`,
    `Comment=${name} startup script`,
    `Exec=${command}`,
    'StartupNotify=false',
    'Terminal=false'
  ].join('\n')

  mkdirp.sync(dir)
  fs.writeFileSync(file, data)
  return file
}

export function create (name, cmd, args, out) {
  add(name, cmd, args, out)
  spawn(cmd, args, out)
}

export function remove (name) {
  let file = getFile(name)
  if (fs.existsSync(file)) fs.unlinkSync(file)
}
