<template>
  <section class="header-top has-background-light">
    <div class="start">
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
    </div>
    <div class="end">
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
    </div>
  </section>
</template>

<script>
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  components: {
    LocaleSwitcher
  },
  data() {
    return {
      isAuto: false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  },
  computed: {
    username() {
      return localStorage.getItem('username')
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
.header-top {
  height: 33px;
  line-height: 33px;
  font-size: 14px;
  padding: 0 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;

  .start,
  .end {
    display: flex;
    align-items: center;
  }

  .global-search {
    margin-top: 5px;
  }
}
</style>
