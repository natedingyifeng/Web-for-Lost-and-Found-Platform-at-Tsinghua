<template>
  <div>
    <account-create-invitation :token="token"
                               class="info"
                               :height=700></account-create-invitation>
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
      token: this.$route.params.token
    }
  },
  created () {
    if(this.$store.getters.getUserLoginStatus == "true")
    {
      this.$store.commit('resetState')
      location.reload()
    }
  }
}
</script>
