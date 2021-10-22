import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './auth.store'
import Schemes from './schemes.store';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,Schemes
  }
})
