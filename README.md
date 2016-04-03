# trailpack-hapi

[![Gitter][gitter-image]][gitter-url]
[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Climate][codeclimate-image]][codeclimate-url]

Hapi Trailpack. This pack binds the routes compiled in [trailpack-router](https://github.com/trailsjs/trailpack-router)
to a [Hapi Server](http://hapijs.com/api#server). 

## Usage
Load in your trailpack config.

```js
// config/main.js
module.exports = {
  // ...
  packs: [
    require('trailpack-core'),
    require('trailpack-router'),
    require('trailpack-hapi')
  ]
}
```

### View Config
Choose a template engine.

```js
// config/views.js
module.exports = {
  engine: 'handlebars'
}
```

Then simply write your views in a directory called 'templates'!

This feature has been tested with Jade and Handlebars. TODO: Put this in yeoman?

## Configuration
See [`config/web.js`](https://github.com/trailsjs/trails-example-app/blob/master/config/web.js) for an example.

#### `port`
The port to listen on. `3000` by default. Can also be set via the `PORT` environment variable.

#### Hapi Plugins
Register your hapi plugins by adding them to the web.js config in typical Hapi
plugin format. See: http://hapijs.com/tutorials/plugins#loading-a-plugin

```js
// config/web.js
module.exports = {
  plugins: [
    {
      register: require('vision'),
      options: { }
    },
    {
      register: require('inert'),
      options: { }
    },
    // ...
  ]
}
```

#### Hapi Views
```js
// config/web.js
module.exports = {
  views: {
    engines: {
      html: require('some-view-engine')
    },
    path: 'views'
  }
}
```

## Contributing
We love contributions! In order to be able to review your code efficiently,
please keep the following in mind:

1. Pull Requests (PRs) must include new and/or updated tests, and all tests [must pass](https://travis-ci.org/trailsjs/trailpack-hapi).
2. Use `eslint`! See the `eslintConfig` in [package.json](https://github.com/trailsjs/trailpack-hapi/blob/master/package.json).
3. Please [reference the relevant issue](https://github.com/blog/1506-closing-issues-via-pull-requests) in your Pull Request.

## License
[MIT](https://github.com/trailsjs/trailpack-hapi/blob/master/LICENSE)

[npm-image]: https://img.shields.io/npm/v/trailpack-hapi.svg?style=flat-square
[npm-url]: https://npmjs.org/package/trailpack-hapi
[ci-image]: https://img.shields.io/travis/trailsjs/trailpack-hapi/master.svg?style=flat-square
[ci-url]: https://travis-ci.org/trailsjs/trailpack-hapi
[daviddm-image]: http://img.shields.io/david/trailsjs/trailpack-hapi.svg?style=flat-square
[daviddm-url]: https://david-dm.org/trailsjs/trailpack-hapi
[codeclimate-image]: https://img.shields.io/codeclimate/github/trailsjs/trailpack-hapi.svg?style=flat-square
[codeclimate-url]: https://codeclimate.com/github/trailsjs/trailpack-hapi
[gitter-image]: http://img.shields.io/badge/+%20GITTER-JOIN%20CHAT%20%E2%86%92-1DCE73.svg?style=flat-square
[gitter-url]: https://gitter.im/trailsjs/trails

