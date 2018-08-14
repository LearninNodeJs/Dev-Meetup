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
import AlertComponent from './components/Shared/Alert'
import VueSession from 'vue-session';

Vue.use(Vuetify);
Vue.use(VueSession);
Vue.config.productionTip = false
Vue.filter('date',DateFilter);
Vue.component('app-alert',AlertComponent);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created(){
      firebase.initializeApp({
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.messagingSenderId
      });
  }
});
