const fs = require('fs')
const cp = require('child_process')
const mkdirp = require('mkdirp')
const untildify = require('untildify')

const dir = untildify('~/.config/autostart')

module.exports = {
  dir,
  getFile,
  add,
  create,
  remove
}

function spawn (cmd, args = [], out) {
  const opts = {
    detached: true
  }

  if (out) {
    const fd = fs.openSync(out, 'w')
    opts.stdio = ['ignore', fd, fd]
  }

  cp
    .spawn(cmd, args, opts)
    .on('error', console.log)
    .unref()
}

function getFile (name) {
  return `${dir}/${name}.desktop`
}

function add (name, cmd, args = [], out) {
  const file = getFile(name)

  let command = cmd

  if (args.length) {
    command += ` ${args.join(' ')}`
  }

  if (out) {
    command += ` > ${out}`
  }

  const data = [
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

function create (name, cmd, args = [], out) {
  add(name, cmd, args, out)
  spawn(cmd, args, out)
}

function remove (name) {
  const file = getFile(name)
  if (fs.existsSync(file)) fs.unlinkSync(file)
}
