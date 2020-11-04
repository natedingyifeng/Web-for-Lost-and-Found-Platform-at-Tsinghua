<template>
  <div>
    <lost-table :id="-1"
                class="table"
                :height=700
                :pageSize="10"></lost-table>
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
import lostTable from '../components/table/lost-table'

export default {
  components: {
    'lost-table': lostTable
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
