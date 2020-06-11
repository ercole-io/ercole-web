<template>
  <b-navbar type="is-dark">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="'/'" class="ercole-logo">
        <img src="@/assets/images/ercole-logo.png" alt="Ercole" />
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-field position="is-centered" type="is-primary" class="global-search">
        <b-input
          size="is-small"
          placeholder="Global Search"
          type="search"
          icon="magnify"
        ></b-input>
        <p class="control">
          <b-button size="is-small is-primary">Search</b-button>
        </p>
      </b-field>

      <b-navbar-dropdown :label="`${username}, Operator`">
        <b-navbar-item>
          <b-switch size="is-small" v-model="isAuto" type="is-primary">
            Auto Refresh
          </b-switch>
        </b-navbar-item>
        <b-navbar-item>
          <LocaleSwitcher />
        </b-navbar-item>
        <b-navbar-item @click="logout">Logout</b-navbar-item>
      </b-navbar-dropdown>
    </template>
  </b-navbar>
</template>

<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import { capitalize } from '@/helpers/helpers.js'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  components: {
    LocaleSwitcher
  },
  data() {
    return {
      isAuto: false,
      open: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    openSidebar() {
      this.$parent.$emit('openSidebar', true)
    }
  },
  computed: {
    username() {
      return capitalize(localStorage.getItem('username'))
    }
  },
  watch: {
    isAuto(value) {
      if (value) {
        Snackbar.open({
          message: 'New data available, recharge within 5s',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Not Refresh',
          indefinite: true,
          onAction: () => {
            this.isAuto = false
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.global-search {
  margin-right: 20px;
  margin-bottom: 0;
  align-self: center;
}

.ercole-logo {
  background-color: #363636 !important;
}

.btn-sidebar {
  align-self: center;
  margin-left: 90px;
}
</style>
