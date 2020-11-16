<template>
  <div>
    <certification-application-table :id="-1"
                                    class="table"
                                    :height=700
                                    :pageSize="10"></certification-application-table>
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
import certificationApplicationTable from '../components/table/certification-application-table'

export default {
  components: {
    'certification-application-table': certificationApplicationTable
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
