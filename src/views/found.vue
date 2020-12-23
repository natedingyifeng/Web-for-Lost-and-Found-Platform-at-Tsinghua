// writen by xyh
<template>
  <div>
    <found-item-info :id="id"
                    class="info"
                    :height=700>
    </found-item-info>
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
import foundItemInfo from '../components/details/found_item_info'
export default {
  components: {
    'found-item-info': foundItemInfo
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.foundId)
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
