<template>
  <div id="body">
    <div id="nav">
      <v-nav></v-nav>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
#nav {
  left: 0;
  padding: 0;
  margin: 0;
}
body {
  display: block;
  margin: 0px;
}
</style>

<script>
import nav from './components/nav'
export default {
  components: {
    'v-nav': nav
  }
}
</script>