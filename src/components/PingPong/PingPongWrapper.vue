<template>
  <Flex style="flex-direction: column;">
    <Flex style="max-width: fit-content; margin: 0em 0em 0.5em 0em;">
      <v-btn 
        @click="toggleAmountOfPlayers"
        :disabled="gaming"
        style="width: fit-content;"
      >
        {{players === 1 ? 'Single Player (endless)' : 'Two Player (first to five)'}}
      </v-btn>
    </Flex>

    <PingPong 
      :gaming="gaming"
      :players="players"
      @toggle-gaming-on="setGaming(true)"
      @toggle-gaming-off="setGaming(false)"
    />
  </Flex>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
import PingPong from './PingPong.vue';
import Flex from '../Flex/Flex.vue';
import { useGaming } from './useGaming';
import { usePlayers } from './usePlayers';

interface Props {
};

export default defineComponent<Props>({
  components: {
    Flex,
    PingPong,
  },
  props: {
  },
  setup() {
    const [gaming, setGaming] = useGaming();
    const [players, setPlayers] = usePlayers(1);

    const toggleAmountOfPlayers = () => {
      if (players.value === 1) {
        setPlayers(2);
      } else {
        setPlayers(1);
      }
    };

    return ({
      gaming,
      setGaming,
      players,
      toggleAmountOfPlayers,
    });
  },
});
</script>

<style lang="scss">
</style>
