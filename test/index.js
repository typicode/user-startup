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

let startupDir
let startupFile
if (os.platform() === 'linux') {
  startupDir = untildify(`~/.config/autostart`)
  startupFile = `${startupDir}/${id}.desktop`
} else {
  startupDir = untildify(`~/Library/LaunchAgents`)
  startupFile = `${startupDir}/${id}.plist`
}

function clean () {
  const files = [testFile, startupFile, log]

  files.forEach((f) => {
    fs.existsSync(f) && fs.unlinkSync(f)
  })
}

clean()

assert.equal(startup.dir, startupDir)
startup.create(id, cmd, [testFile], log)

setTimeout(() => {
  assert(fs.existsSync(startupFile))
  assert(fs.existsSync(testFile))
  assert(fs.existsSync(log))

  startup.remove(id)
  assert(!fs.existsSync(startupFile))
  console.log('OK 1/2')
  clean()

  // Test without log
  startup.create(id, cmd, [testFile])
  setTimeout(() => {
    assert(fs.existsSync(startupFile))
    assert(fs.existsSync(testFile))
    assert(!fs.existsSync(log))
    console.log('OK 2/2')
    clean()
  }, 100)
}, 100)
