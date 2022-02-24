<template>
  <b-navbar type="is-dark" fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'/'" class="ercole-logo">
        <ErcoleLogo />
      </b-navbar-item>
    </template>

    <template slot="end">
      <!-- <b-field position="is-centered" type="is-primary" class="global-search">
        <b-input
          size="is-small"
          placeholder="Global Search"
          type="search"
          icon="magnify"
        ></b-input>
        <p class="control">
          <b-button size="is-small is-primary">Search</b-button>
        </p>
      </b-field> -->

      <!-- <b-navbar-item tag="div">
        <LocaleSwitcher />
      </b-navbar-item> -->

      <b-navbar-dropdown
        :label="`${username}, ${userRole}`"
        data-navbar-username
      >
        <!-- <b-navbar-item>
          <b-switch size="is-small" v-model="isAuto" type="is-primary">
            Auto Refresh
          </b-switch>
        </b-navbar-item> -->
        <b-navbar-item @click="callLogout" data-logout-button>{{
          $t('header.logout')
        }}</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
// import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import { capitalize } from '@/helpers/helpers.js'
import { mapActions } from 'vuex'
// import { SnackbarProgrammatic as Snackbar } from 'buefy'
import ErcoleLogo from '@/components/common/ErcoleLogo.vue'

export default {
  components: {
    ErcoleLogo,
    // LocaleSwitcher,
  },
  // data() {
  //   return {
  //     isAuto: false
  //   }
  // },
  methods: {
    ...mapActions(['logout']),
    callLogout() {
      localStorage.setItem('historyPage', '')
      this.logout()
    },
  },
  computed: {
    username() {
      return capitalize(localStorage.getItem('username'))
    },
    userRole() {
      return 'Operator'
    },
  },
  // watch: {
  //   isAuto(value) {
  //     if (value) {
  //       Snackbar.open({
  //         message: 'New data available, recharge within 5s',
  //         type: 'is-warning',
  //         position: 'is-top',
  //         actionText: 'Not Refresh',
  //         indefinite: true,
  //         onAction: () => {
  //           this.isAuto = false
  //         }
  //       })
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
// .global-search {
//   margin-right: 20px;
//   margin-bottom: 0;
//   align-self: center;
// }

.ercole-logo {
  background-color: #363636 !important;

  img {
    height: 2.5em !important;
  }
}
</style>
