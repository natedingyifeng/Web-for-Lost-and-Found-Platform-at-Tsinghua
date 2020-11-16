<template>
  <div>
    <property-types-table :id="-1"
                            class="table"
                            :height=700
                            :pageSize="10"></property-types-table>
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
import propertyTypesTable from '../components/table/property-types-table'

export default {
  components: {
    'property-types-table': propertyTypesTable
  },
  methods: {
  },
  created () {
    // if (this.$store.getters.getUserKey === 'null') {
    //   this.$router.push('/login')
    // }
  }
}
</script>
