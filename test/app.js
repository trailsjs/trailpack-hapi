const _ = require('lodash')
const smokesignals = require('smokesignals')

const App = {
  pkg: {
    name: 'hapi-trailpack-test'
  },
  api: {
    models: {
      User: {
        attributes: {
          name: {
            type: 'string'
          },
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
    footprints: {
      controllers: true,
      prefix: '',
      models: {
        options: {
          populate: true
        },
        actions: {
          create: true,
          find: true,
          update: true,
          destroy: true,
          createAssociation: true,
          findAssociation: true,
          updateAssociation: true,
          destroyAssociation: true
        }
      }
    },
    main: {
      packs: [
        smokesignals.Trailpack,
        require('trailpack-core'),
        require('trailpack-router'),
        require('trailpack-waterline'),
        require('../') // trailpack-hapi
      ],
      paths: {
        root: __dirname + '../'
      }
    },
    web: {
      port: 3000,
      host: 'localhost'
    },
    views: {

    }
  }
}
_.defaultsDeep(App, smokesignals.FailsafeConfig)

module.exports = App
