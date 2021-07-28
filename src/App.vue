<template>
  <div id="app">
    <feed />
  </div>
</template>

<script>
import Feed from './components/Feed.vue'


export default {
  components: {
    Feed,
  }
}
</script>

<style lang="scss">
  @import './assets/styles.scss';
  
  #app {
    background-color: $bg-color;
    height: 100vh;
  }
</style>
