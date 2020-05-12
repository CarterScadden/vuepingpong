<template>
  <div class="flex">
    <slot></slot>
  </div>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';
import { defineComponent } from '@vue/composition-api';
interface Props {
  
};

export default defineComponent<Props>({
  props: {
    
  },
  setup() {
    return ({
  
    });
  },
});
</script>

<style lang="scss">
.flex {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
</style>
