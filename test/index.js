const os = require('os')
const fs = require('fs')
const untildify = require('untildify')
const assert = require('assert')
const startup = require('../src')

if (os.platform() === 'win32') process.exit()

const tmp = os.tmpdir()
const id = 'test'
const cmd = 'touch'
const testFile = `${tmp}/foo`
const log = `${tmp}/foo.log`
const startupDir = untildify(`~/.config/autostart`)
const startupFile = `${startupDir}/${id}.desktop`

const files = [testFile, startupFile, log]

files.forEach((f) => {
  fs.existsSync(f) && fs.unlinkSync(f)
})

assert.equal(startup.dir, startupDir)
startup.create(id, cmd, [testFile], log)

setTimeout(() => {
  assert(fs.existsSync(startupFile))
  assert(fs.existsSync(testFile))
  assert(fs.existsSync(log))

  startup.remove(id)
  assert(!fs.existsSync(startupFile))
  console.log('OK')
}, 100)
