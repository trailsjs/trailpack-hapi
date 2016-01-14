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
      // html: require('some-view-engine')
    },
    path: 'views'
  }
}
