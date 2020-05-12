<template>
  <div id="home">
    <PingPongWrapper />
    <div style="margin-top: 2em;">
      <p>
        Endless: A single player experience, try to get the most points possible, my personal best is 35.
      </p>
      <p>
        First To Five: A two player experience, first to 5 wins. 
      </p>
      <header><h2>Controls</h2></header>
      <section style="display: flex;">
        <div style="margin-right: 5px;">
          <header><h4>First Player</h4></header>
          <ul style="list-style: none; padding: 0px;">
            <li>Up: W</li>
            <li>Down: S</li>
          </ul>
        </div>
        
        <div>
          <header><h4>Second Player</h4></header>
          <ul style="list-style: none; padding: 0px;">
            <li>Up: Up Arrow</li>
            <li>Down: Down Arrow</li>
          </ul>
        </div>
      </section>
      <p>
        <a href="https://github.com/CarterScadden/vuepingpong">code link</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import PingPongWrapper from '../components/PingPong/PingPongWrapper.vue';
interface Props {
  
};

export default defineComponent<Props>({
  components: {
    PingPongWrapper,
  },
  props: {
    
  },
  setup() {
    return ({

    });
  },
});
</script>

<style lang="scss" scoped>
</style>
