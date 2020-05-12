import Vue from 'vue';
// @ts-ignore
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#0097a7',
        secondary: '#ff4081',
        accent: '#82B1FF', // ?
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#ff9800',
        text: '#fff',
        // background: rgb(48,48,48)
      },
    },
  },
});
