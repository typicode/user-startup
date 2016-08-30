# user-startup [![Build Status](https://travis-ci.org/typicode/user-startup.svg)](https://travis-ci.org/typicode/user-startup) [![npm version](https://badge.fury.io/js/user-startup.svg)](https://www.npmjs.com/package/user-startup)

> Automatically run commands when the user logs in. Used in [hotel](https://github.com/typicode/hotel) and [stop-server](https://github.com/typicode/stop-server).

  * __No admin privileges required__
  * Cross-platform (OS X, Linux and Windows)

## Install

```
npm install user-startup --save
```

## Example

```javascript
const startup = require('user-startup')

const nodePath = process.execPath
const args = ['/some/path/app.js']
const out = '/some/path/out.log'

// Creates startup script and spawns process
startup.create('my-script', nodePath, args, out)

// Removes startup script
startup.remove('my-script')
```

Note: you should check that root isn't running this code to avoid startup scripts being created in root's home directory. Use [sudo-block](https://github.com/sindresorhus/sudo-block) or [is-root](https://github.com/sindresorhus/is-root).

## API

`add(id, cmd[, args[, out]])`

* `id <String>` id
* `cmd <String>` command
* `args <Array>` optional list of string arguments
* `out <String>` optional path to output file (directory needs to exist before)

Creates startup script.

`create(id, cmd[, args[, out]])`

Creates a startup script __and__ spawns process.

`remove(id)`

Removes startup script.

`dir`

Returns startup script directory.

`getFile(id)`

Returns startup script path.

## How it works

* On OS X, it creates a `plist` file in  `~/Library/LaunchAgents`
* On Linux, it creates a `desktop` file in `~/.config/autostart`
* On Windows, it creates a `vbs` script in `AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`

## License

MIT - [Typicode](https://github.com/typicode)
