import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import VueCompositionApi from '@vue/composition-api';
import { ReactiveRefs } from 'vue-reactive-refs';

Vue.use(VueCompositionApi);
Vue.use(ReactiveRefs);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // @ts-ignore
  vuetify,
  render: h => h(App),
}).$mount('#app');
