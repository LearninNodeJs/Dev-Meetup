'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiKey: '"AIzaSyAc-HKw1TBw0hrCL3j4Q-oOxXSK5VY7oMU"',
  authDomain: '"devmeetupvue-a8f57.firebaseapp.com"',
  databaseURL: '"https://devmeetupvue-a8f57.firebaseio.com"',
  projectId: '"devmeetupvue-a8f57"',
  storageBucket: '"devmeetupvue-a8f57.appspot.com"',
  messagingSenderId: '"458070932747"'
})
