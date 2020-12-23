<template>
  <div>
    <help-info></help-info>
  </div>
</template>

<script>
import help from '../components/help_info.vue'
export default {
  components: {
    'help-info': help
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
