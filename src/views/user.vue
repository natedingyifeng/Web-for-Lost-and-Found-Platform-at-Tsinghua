// writen by xyh
<template>
  <div>
    <user-card :id="id" class="info"></user-card>
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
import userCard from '../components/details/user_item_info.vue'
export default {
  components: {
    'user-card': userCard
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.userId)
    }
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
