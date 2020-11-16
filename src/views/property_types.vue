// writen by xyh
<template>
  <div>
    <property-types-info :id="id"
                    class="info"
                    :height=700>
    </property-types-info>
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
import propertyTypesInfo from '../components/details/property_types_info'
export default {
  components: {
    'property-types-info': propertyTypesInfo
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
