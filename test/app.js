const _ = require('lodash')
const smokesignals = require('smokesignals')

module.exports = _.defaultsDeep({
  pkg: {
    name: 'hapi-trailpack-test'
  },
  api: {
    models: {
      User: {
        attributes: {
          name: 'string',
          roles: {
            collection: 'Role',
            via: 'user'
          }
        }
      },
      Role: {
        attributes: {
          name: 'string',
          user: {
            model: 'User'
          }
        }
      }
    }
  },
  config: {
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('trailpack-router'),
        require('trailpack-waterline'),
        require('../') // trailpack-hapi
      ]
    },
    database: {
      stores: {
        teststore: {
          adapter: require('waterline-sqlite3')
        }
      },
      models: {
        defaultStore: 'teststore',
        migrate: 'drop'
      }
    },
    web: {
      port: 3000,
      host: 'localhost'
    },
    views: {

    }
  }
}, smokesignals.FailsafeConfig)

