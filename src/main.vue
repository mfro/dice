<template>
  <canvas ref="canvas" />

  <span class="results" v-if="results">
    {{ results.join(" + ") }}
    <template v-if="results.length > 1">
      = {{ results.reduce((s, v) => s + v, 0) }}
    </template>
  </span>
</template>

<script>
import { shallowRef, watch } from 'vue';

import { initDice } from './diceroll';

export default {
  name: 'dnd-dice',
  setup(props) {
    const canvas = shallowRef(null);
    const results = shallowRef(null);

    watch(canvas, canvas => {
      initDice(canvas, results);
    });

    return {
      canvas,
      results,
    };
  },
};
</script>

<style lang="scss" scoped>
canvas {
  width: 100vw;
  height: 100vh;
}

.results {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;

  font-size: 2em;
  font-weight: bold;
  font-family: Roboto;
  text-shadow: 0 0 3px currentColor, 0 0 20px white, 0 0 20px white,
    0 0 20px white, 0 0 20px white, 0 0 20px white, 0 0 20px white,
    0 0 20px white, 0 0 20px white, 0 0 20px white, 0 0 20px white,
    0 0 20px white, 0 0 20px white;
}
</style>

<style lang="scss">
body {
  margin: 0;
  overflow: hidden;
}
</style>
