const smokesignals = require('smokesignals')
const Model = require('trails/lib/Model')

const App = Object.assign(smokesignals.FailsafeConfig, {
  pkg: {
    name: 'hapi-trailpack-test'
  },
  api: {
    models: {
      User: class User extends Model {
        static config () {
          return {
            store: 'teststore'
          }
        }
        static schema () {
          return {
            name: {
              type: 'string'
            },
            roles: {
              collection: 'Role',
              via: 'user'
            }
          }
        }
      },
      Role: class Role extends Model {
        static config () {
          return {
            store: 'teststore'
          }
        }
        static schema () {
          return {
            name: 'string',
            user: {
              model: 'User'
            }
          }
        }
      }
    }
  },
  config: {
    stores: {
      teststore: {
        migrate: 'drop',
        adapter: require('waterline-postgresql'),
        connection: {
          host: 'localhost',
          port: '5432'
        }
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
        require('trailpack-router'),
        //require('trailpack-footprints'),
        //require('trailpack-waterline'),
        require('../../') // trailpack-hapi
      ]
    },
    web: {
      port: 3000,
      //host: '0.0.0.0'
    },
    routes: [ ],
    log: {
      logger: new smokesignals.Logger('error')
    }
  }
})

module.exports = App
