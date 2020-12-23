// writen by xyh
<template>
  <div>
    <report-info :id="id"
                    class="info"
                    :height=700>
    </report-info>
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
import reportInfo from '../components/details/report_info'
export default {
  components: {
    'report-info': reportInfo
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.reportId)
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
