// writen by xyh
<template>
  <div>
    <lost-item-info :id="id"
                    class="info"
                    :height=700>
    </lost-item-info>
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
import lostItemInfo from '../components/details/lost_item_info'
export default {
  components: {
    'lost-item-info': lostItemInfo
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.lostId)
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
