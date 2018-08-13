// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store'
import DateFilter from './filter/date'
import * as firebase from 'firebase'
require('dotenv').config();
Vue.use(Vuetify);

Vue.config.productionTip = false
Vue.filter('date',DateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
      firebase.initializeApp({
        apiKey: "AIzaSyAc-HKw1TBw0hrCL3j4Q-oOxXSK5VY7oMU",
        authDomain: "devmeetupvue-a8f57.firebaseapp.com",
        databaseURL: "https://devmeetupvue-a8f57.firebaseio.com",
        projectId: "devmeetupvue-a8f57",
        storageBucket: "devmeetupvue-a8f57.appspot.com",
        messagingSenderId: "458070932747"
      });
  }
});
