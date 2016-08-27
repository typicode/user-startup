const fs = require('fs')
const cp = require('child_process')
const mkdirp = require('mkdirp')
const untildify = require('untildify')

const dir = untildify('~/Library/LaunchAgents')

module.exports = {
  dir,
  getFile,
  add,
  create,
  remove
}

function getFile (name) {
  return `${dir}/${name}.plist`
}

function add (name, cmd, args = [], out) {
  const array = [cmd]
    .concat(args)
    .map(a => `    <string>${a}</string>`)
    .join('\n')

  const file = getFile(name)

  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">',
    '<plist version="1.0">',
    '<dict>',
    '  <key>Label</key>',
    `  <string>${name}</string>`,
    '  <key>ProgramArguments</key>',
    '  <array>',
    array,
    '  </array>',
    '  <key>RunAtLoad</key>',
    '  <true/>'
  ]

  if (out) {
    lines.push('  <key>StandardOutPath</key>',
        `  <string>${out}</string>`,
        '  <key>StandardErrorPath</key>',
        `  <string>${out}</string>`
      )
  }

  lines.push('</dict>', '</plist>')

  const data = lines.join('\n')

  mkdirp.sync(dir)
  fs.writeFileSync(file, data)
  return file
}

function create (name, cmd, args = [], out) {
  const file = add(name, cmd, args, out)
  cp.execSync(`launchctl load ${file}`)
}

function remove (name) {
  const file = getFile(name)
  if (fs.existsSync(file)) fs.unlinkSync(file)
  try {
    cp.execSync(`launchctl remove ${name}`)
  } catch (e) {}
}
