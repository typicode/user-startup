# user-startup [![Build Status](https://travis-ci.org/typicode/user-startup.svg)](https://travis-ci.org/typicode/user-startup) [![npm version](https://badge.fury.io/js/user-startup.svg)](https://www.npmjs.com/package/user-startup)

> Automatically run commands when the user logs in. Used in [hotel](https://github.com/typicode/hotel) and [stop-server](https://github.com/typicode/stop-server).

  * __No admin privileges required__
  * Cross-platform (OS X, Linux and Windows)

## Install

```
npm install user-startup --save
```

## Usage

Create a new instance.

```js
const Startup = require('user-startup')
let startup

try {
  startup = Startup()
} catch (err) {
  // Unsupported platform
}
```

Add startup script but doesn't spawn process. Use `create` to create startup file and process at the same time.

```js
startup.create(
  'my-script', // id
  process.execPath, // cmd
  ['/some/path/app.js'], // args
  '/some/path/out.log' // out
)
```

Remove startup script.

```js
startup.remove('my-script')
```

Note: you should check that root isn't running this code to avoid startup scripts being created in root's home directory. Use [sudo-block](https://github.com/sindresorhus/sudo-block) or [is-root](https://github.com/sindresorhus/is-root).

## API

__Startup()__

Creates a new instance.
Throws an error if platform isn't OS X, Linux or Windows.

__add(id, cmd[, args[, out]])__

* `id <String>` id
* `cmd <String>` command
* `args <Array>` optional list of string arguments
* `out <String>` optional path to output file (directory needs to exist before)

Creates startup script.

__create(id, cmd[, args[, out]])__

Creates a startup script __and__ spawns process.

__remove(id)__

Removes startup script.

__dir__

Returns startup script directory.

__getFile(id)__

Returns startup script path.

## How it works

* On OS X, it creates a `plist` file in  `~/Library/LaunchAgents`
* On Linux, it creates a `desktop` file in `~/.config/autostart`
* On Windows, it creates a `vbs` script in `AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`

## License

MIT - [Typicode](https://github.com/typicode)
