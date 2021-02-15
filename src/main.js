import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import mixin from './mixin';

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const localToken = localStorage.getItem('token');
  if (to.name === 'Home' && !localToken) {
    return next({name: 'Login'})
  }
  if ((to.name === 'Login' || to.name === 'Register') && localToken) {
     return next({name: 'Home'})
  }
  return next();
})

new Vue({
  router,
  vuetify,
  mixins: [mixin],
  render: h => h(App)
}).$mount('#app')
