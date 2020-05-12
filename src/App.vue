<template>
  <v-app style="background-color: rgb(48,48,48); display: flex;">
    <AppBar />

    <Flex>
      <router-view />
    </Flex>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from './components/AppBar/AppBar.vue';
import Flex from './components/Flex/Flex.vue';

export default Vue.extend({
  name: 'App',

  components: {
    AppBar,
    Flex,
  },

  data: () => ({
    //
  }),
});
</script>
