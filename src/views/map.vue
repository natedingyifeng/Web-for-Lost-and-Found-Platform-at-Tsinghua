<template>
  <div>
    <tecent-map></tecent-map>
  </div>
</template>

<script>
import tecentMap from '../components/tecent_map.vue'
export default {
  components: {
    'tecent-map': tecentMap
  },
  data: function () {
    return {

    }
  },
  created () {
    if(this.$store.getters.getUserLoginStatus != "true")
    {
      this.$router.push('/login')
    }
  }
}
</script>
