module.exports = {
  plugins: [
    {
      register: require('vision'),
      options: { }
    },
    {
      register: require('inert'),
      options: { }
    }
  ],
  views: {
    engines: {
      // Have user provide engine
      // html: require('some-view-engine')
    }
    //Have user provide a path.
    //path: 'views'
  }
}
