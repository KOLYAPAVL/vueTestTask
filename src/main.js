import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Header from './components/Header.vue'
import Dropdown from './components/DropdownComponent.vue'
import Input from './components/InputComponent.vue'
import Switch from './components/SwitchComponent.vue'
import Checkbox from './components/CheckboxComponent.vue';

import {Authentication} from './core/auth.js';

Vue.prototype.Authentication = Authentication;

Vue.config.productionTip = false
Vue.component('Header',Header)
Vue.component('Checkbox',Checkbox)
Vue.component('Dropdown',Dropdown)
Vue.component('Input',Input)
Vue.component('Switcher',Switch)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
