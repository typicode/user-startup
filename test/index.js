let os = require('os')
let fs = require('fs')
let untildify = require('untildify')
let assert = require('assert')
let startup = require('../src')

if (os.platform() !== 'linux') process.exit()

let tmp = os.tmpdir()
let id = 'test'
let cmd = 'touch'
let testFile = `${tmp}/foo`
let log = `${tmp}/foo.log`
let startupDir = untildify(`~/.config/autostart`)
let startupFile = `${startupDir}/${id}.desktop`

for (let f of [testFile, startupFile, log]) {
  fs.existsSync(f) && fs.unlinkSync(f)
}

assert(startup.dir, startupDir)
startup.create(id, cmd, [testFile], log)

setTimeout(function () {
  assert(fs.existsSync(startupFile))
  assert(fs.existsSync(testFile))
  assert(fs.existsSync(log))

  startup.remove(id)
  assert(!fs.existsSync(startupFile))
  console.log('OK')
}, 100)
