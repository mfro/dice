<template>
  <span class="fontloader">0123456789</span>

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

import { initDiceRoller, initDiceInspector } from './diceroll';

export default {
  name: 'dnd-dice',
  setup(props) {
    const canvas = shallowRef(null);
    const loaded = shallowRef(document.readyState == 'complete');
    const results = shallowRef(null);

    if (!loaded.value) window.addEventListener('load', () => loaded.value = true);

    watch([canvas, loaded], ([canvas, loaded]) => {
      if (!loaded || !canvas) return;
      // initDiceRoller(canvas, results);
      initDiceInspector(canvas);
    });

    return {
      canvas,
      results,
    };
  },
};
</script>

<style lang="scss" scoped>
.fontloader {
  font-family: Roboto;
  font-weight: bold;
  position: absolute;
  opacity: 0;
}

canvas {
  width: 100vw;
  height: 100vh;
  font-family: Roboto;
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
