let fs = require('fs')
let cp = require('child_process')
let mkdirp = require('mkdirp')
let untildify = require('untildify')

export let dir = untildify('~/Library/LaunchAgents')

export function getFile (name) {
  return `${dir}/${name}.plist`
}

export function add (name, cmd, args = [], out = null) {
  let array = [cmd]
    .concat(args)
    .map(a => `    <string>${a}</string>`)
    .join('\n')

  let file = getFile(name)

  let lines = [
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

  let data = lines.join('\n')

  mkdirp.sync(dir)
  fs.writeFileSync(file, data)
  return file
}

export function create (name, cmd, args, out) {
  let file = add(name, cmd, args, out)
  cp.execSync(`launchctl load ${file}`)
}

export function remove (name) {
  let file = getFile(name)
  if (fs.existsSync(file)) fs.unlinkSync(file)
  try {
    cp.execSync(`launchctl remove ${name}`)
  } catch (e) {}
}
