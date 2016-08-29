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

Then simply write your views in a directory called 'templates'! This feature has been tested with Jade and Handlebars.

## Configuration
See [`config/web.js`](https://github.com/trailsjs/trails-example-app/blob/master/config/web.js) for an example.

#### `port`
The port to listen on. `3000` by default. Can also be set via the `PORT` environment variable.

#### Server configuration
Configure your `Hapi.Server` by adding `options` property to the `web.js` config in typical
Hapi.server format. See: http://hapijs.com/api#new-serveroptions

```js

// config/web.js
module.exports = {
  options: {

    routes: {
      cors: true
    }
  }
}
```

#### Hapi Plugins
Register your hapi plugins by adding them to the `config/web.js` config in typical Hapi
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
    {
      register: require('hapi-auth-hawk'),
      options: { }
    }
    // ...
  ],

  onPluginsLoaded: function (err) {
    // Note that `this` is Trails `app` instance
    this.packs.hapi.server.auth.strategy('default', 'hawk', { getCredentialsFunc: getCredentials });
  }
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

#### Static Assets
```js
// config/main.js
module.exports = {
  paths: {
    ...
    www: path.resolve(__dirname, '..', 'static')
    ...
  }
}
```
This allows static files such as js or images to be served in the /static directory.
If you prefer, feel free to use a name other than 'static'!

#### Multiple Static Assets
```js
// config/main.js
module.exports = {
  paths: {
    ...
    www: [
      {
        path: path.resolve(__dirname, '..', 'static'),
        humanUrl: '/admin'
      },
      {
        path: path.resolve(__dirname, '..', 'uploads', 'pictures', 'cats'),
        humanUrl: '/cats'
      }
    ]
    ...
  }
}
```
Also you can make multiple static assets with human url.
For example your static files in `/uploads/pictures/cats` with `humanUrl` you url look like `http://example.com/cats`
`humanUrl` - not require

## Contributing
We love contributions! Please check out our [Contributor's Guide](https://github.com/trailsjs/trails/blob/master/.github/CONTRIBUTING.md) for more
information on how our projects are organized and how to get started.

## License
[MIT](https://github.com/trailsjs/trailpack-hapi/blob/master/LICENSE)

<img src="http://i.imgur.com/dCjNisP.png">

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
