<template>
  <b-navbar type="is-ercole-blue" class="navbar-custom" fixed-top>
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

      <div class="navbar-menu">
        <div class="navbar-end">
          <b-dropdown
            v-model="navigation"
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
          >
            <template #trigger>
              <a class="navbar-item" role="button">
                <span data-navbar-username>
                  {{ `${username}, ${userRole}` }}
                </span>
                <b-icon icon="menu-down" />
              </a>
            </template>

            <template v-if="getProvider === 'basic'">
              <b-dropdown-item
                @click="openChangePassModal"
                data-change-password
              >
                <b-icon pack="fas" icon="key" />
                Change Password
              </b-dropdown-item>

              <hr class="dropdown-divider" />
            </template>

            <b-dropdown-item
              value="users"
              aria-role="menuitem"
              @click="openPage('users')"
              data-users-button
            >
              <b-icon pack="fas" icon="users" />
              Users
            </b-dropdown-item>

            <b-dropdown-item
              value="groups"
              aria-role="menuitem"
              @click="openPage('groups')"
              data-groups-button
            >
              <b-icon pack="fas" icon="layer-group" />
              Groups
            </b-dropdown-item>

            <b-dropdown-item
              value="roles"
              aria-role="menuitem"
              @click="openPage('roles')"
              data-groups-button
              v-if="isAdmin"
            >
              <b-icon pack="fas" icon="scroll" />
              Roles
            </b-dropdown-item>

            <hr class="dropdown-divider" />

            <b-dropdown-item @click="openInfoModal" data-info-button>
              <b-icon custom-class="ercole-version-logo" />
              Ercole Version
            </b-dropdown-item>

            <hr class="dropdown-divider" />

            <b-dropdown-item @click="logout" data-logout-button>
              <b-icon icon="logout"></b-icon>
              {{ $t('header.logout') }}
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </div>
    </template>
  </b-navbar>
</template>

<script>
// import LocaleSwitcher from '@/components/LocaleSwitcher.vue'
import { mapActions, mapGetters } from 'vuex'
// import { SnackbarProgrammatic as Snackbar } from 'buefy'
import ErcoleLogo from '@/components/common/ErcoleLogo.vue'
import ChangePassModal from '@/views/profile/ChangePassModal.vue'

export default {
  name: 'header-component',
  components: {
    ErcoleLogo,
    // LocaleSwitcher,
  },
  data() {
    return {
      navigation: null,
      // isAuto: false
    }
  },
  methods: {
    ...mapActions(['logout']),
    openPage(page) {
      this.$router.push({
        name: page,
      })
    },
    openInfoModal() {
      this.$buefy.dialog.alert({
        title: 'Ercole Version',
        message: `
          <p class="has-text-weight-bold">Server Version: <span class="has-text-weight-normal">${this.version}</span></p>
          <p class="has-text-weight-bold">Web Version: <span class="has-text-weight-normal">2.35.0</span></p>
        `,
        cancelButton: false,
        type: 'is-success',
      })
    },
    openChangePassModal() {
      this.$buefy.modal.open({
        parent: this,
        component: ChangePassModal,
        hasModalCard: true,
        customClass: 'custom-class custom-class-2',
        trapFocus: true,
      })
    },
  },
  computed: {
    ...mapGetters([
      'version',
      'isAdmin',
      'getProvider',
      'getUserRole',
      'getUsername',
    ]),
    username() {
      return this.getUsername
    },
    userRole() {
      return this.getUserRole
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
@import '@/assets/scss/_variables';

// .global-search {
//   margin-right: 20px;
//   margin-bottom: 0;
//   align-self: center;
// }

.navbar-custom {
  z-index: 54;
  margin-left: 50px;
  height: 4rem;
}

.navbar-item {
  color: #ffffff;

  &:hover {
    background-color: #101336;
  }
}

.ercole-logo {
  background-color: $ercole-blue !important;

  img {
    height: 2.5em !important;
  }
}
</style>
