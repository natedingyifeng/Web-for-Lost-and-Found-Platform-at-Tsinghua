<template>
  <div>
    <property-templates-table :id="-1"
                            class="table"
                            :height=700
                            :pageSize="10"></property-templates-table>
  </div>
</template>

<style scoped>
.table {
  width: 75%;
  margin-bottom: 200px;
}
.eltabs {
  max-width: 50%;
}
</style>

<script>
import propertyTemplatesTable from '../components/table/property-templates-table'

export default {
  components: {
    'property-templates-table': propertyTemplatesTable
  },
  methods: {
  },
  created () {
    if(this.$store.getters.getUserLoginStatus != "true")
    {
      this.$router.push('/login')
    }
  }
}
</script>
