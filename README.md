# user-startup

> Automatically run commands when the user logs in. Used in [hotel](https://github.com/typicode/hotel).

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

startup.create('app', nodePath, args, out)
startup.remove('app')
```

## API

`create(id, cmd, args, out)`

Creates a startup script and spawn process.

`remove(id)`

Removes startup script but doesn't stop process.

`dir`

Returns startup script directory.

`getFile(id)`

Returns startup script path.

## License

MIT - [Typicode](https://github.com/typicode)
