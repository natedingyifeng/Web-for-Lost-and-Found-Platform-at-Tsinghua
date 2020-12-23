<template>
  <div>
    <account-create-invitation></account-create-invitation>
  </div>
</template>

<script>
import accountCreationInvitation from '../components/account_creation_invitation.vue'
export default {
  components: {
    'account-create-invitation': accountCreationInvitation
  },
  data: function () {
    return {

    }
  },
  created () {
    if (this.$store.getters.getUserKey === 'null') {
      this.$router.push('/login')
    }
  }
}
</script>
