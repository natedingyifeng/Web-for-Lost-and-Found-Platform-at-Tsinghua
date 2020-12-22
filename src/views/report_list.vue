<template>
  <div>
    <report-table :id="-1"
                  class="table"
                  :height=700
                  :pageSize="10"></report-table>
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
import reportTable from '../components/table/report-table'

export default {
  components: {
    'report-table': reportTable
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
