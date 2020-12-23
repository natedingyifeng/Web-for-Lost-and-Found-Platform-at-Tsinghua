// writen by xyh
<template>
  <div>
    <property-templates-info :id="id"
                    class="info"
                    :height=700>
    </property-templates-info>
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
import propertyTemplatesInfo from '../components/details/property_templates_info'
export default {
  components: {
    'property-templates-info': propertyTemplatesInfo
  },
  data: function () {
    return {
      id: parseInt(this.$route.params.templateId)
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
