<template>
  <div>
    <matching-entries-table :id="-1"
                  class="table"
                  :height=700
                  :pageSize="10"></matching-entries-table>
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
import matchingEntriesTable from '../components/table/matching-entries-table'

export default {
  components: {
    'matching-entries-table': matchingEntriesTable
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
