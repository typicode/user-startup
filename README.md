# user-startup [![Build Status](https://travis-ci.org/typicode/user-startup.svg)](https://travis-ci.org/typicode/user-startup) [![npm version](https://badge.fury.io/js/user-startup.svg)](https://www.npmjs.com/package/user-startup)

> Automatically run commands when the user logs in. Used in [hotel](https://github.com/typicode/hotel) and [stop-server](https://github.com/typicode/stop-server).

  * Cross-platform (OS X, Linux and Windows)
  * No admin privileges required

## Install

```
npm install user-startup --save
```

## Example

```javascript
var startup = require('user-startup')

var nodePath = process.execPath
var args = ['/some/path/app.js']
var out = '/some/path/out.log'

// Create startup script and spawn process
startup.create('my-script', nodePath, args, out)

// Remove startup script
startup.remove('my-script')
```

Note: you should check that root isn't running this code to avoid startup scripts being created in root's home directory. Use [sudo-block](https://github.com/sindresorhus/sudo-block), [is-root](https://github.com/sindresorhus/is-root) or similar modules.

## API

`add(id, cmd, args, out)`

Creates startup script.

`remove(id)`

Removes startup script.

`create(id, cmd, args, out)`

Creates a startup script and spawns process.

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
