<template>
  <div id="app">
    <CallFromBrowser/>
  </div>
</template>

<script>
import CallFromBrowser from './components/CallFromBrowser.vue'

export default {
  name: 'app',
  components: {
    CallFromBrowser
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
