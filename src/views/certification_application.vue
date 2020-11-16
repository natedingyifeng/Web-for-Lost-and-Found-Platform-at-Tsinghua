// writen by xyh
<template>
  <div>
    <certification-application-info :id="id"
                    class="info"
                    :height=700>
    </certification-application-info>
  </div>
</template>

<style scoped>
.info {
  width: 75%;
  margin: 0 auto;
  margin-bottom: 40px;
}
</style>

<script>
import certificationApplicationInfo from '../components/details/certification_application_item_info'
export default {
  components: {
    'certification-application-info': certificationApplicationInfo
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.certificationApplicationId)
    }
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
