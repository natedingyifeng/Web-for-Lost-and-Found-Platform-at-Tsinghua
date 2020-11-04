<template>
  <div>
    <found-table :id="-1"
                            class="table"
                            :height=700
                            :pageSize="10"></found-table>
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
import foundTable from '../components/table/found-table'

export default {
  components: {
    'found-table': foundTable
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
