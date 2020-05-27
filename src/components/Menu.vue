<template>
  <section>
    <b-sidebar
      type="is-light"
      :fullheight="fullheight"
      :overlay="overlay"
      :open.sync="open"
    >
      <div>
        <div class="ercole-logo">
          <b-navbar-item tag="router-link" :to="'/'">
            <img src="@/assets/images/ercole-logo.png" alt="Ercole" />
          </b-navbar-item>

          <b-button
            @click="open = !open"
            icon-right="menu"
            size="is-small"
            type="is-light"
            class="btn-sidebar"
          ></b-button>
        </div>

        <b-menu activable>
          <b-menu-list>
            <b-menu-item
              icon="settings"
              label="Dasboard"
              tag="router-link"
              to="/dashboard"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Hosts"
              tag="router-link"
              to="/hosts"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Database"
              tag="router-link"
              to="/databases"
            >
              <!-- <template slot="label" slot-scope="props">
                Database
                <b-icon
                  class="is-pulled-right"
                  :icon="props.expanded ? 'menu-down' : 'menu-right'"
                ></b-icon>
              </template>
              <b-menu-item icon="account" label="Sub Item 1"></b-menu-item>
              <b-menu-item
                icon="cellphone-link"
                label="Sub Item 1"
              ></b-menu-item> -->
            </b-menu-item>
            <b-menu-item
              icon="settings"
              label="Middleware"
              tag="router-link"
              to="/middleware"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Licenses"
              tag="router-link"
              to="/licenses"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Hypervisors"
              tag="router-link"
              to="/hypervisors"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Engineered"
              tag="router-link"
              to="/engineered"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Systems"
              tag="router-link"
              to="/systems"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Notifications"
              tag="router-link"
              to="/notifications"
            ></b-menu-item>
            <b-menu-item
              icon="settings"
              label="Settings"
              tag="router-link"
              to="/settings"
            ></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>

<script>
export default {
  props: ['openSidebar'],
  data() {
    return {
      open: false,
      overlay: true,
      fullheight: true
    }
  },
  watch: {
    openSidebar(newValue, oldValue) {
      if (newValue) {
        this.open = newValue
      } else {
        this.open = oldValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-list {
  font-size: 0.9em;
}

.ercole-logo {
  background-color: #292929;
  align-items: stretch;
  display: flex;
  flex-shrink: 0;
  min-height: 3.25rem;
}

.btn-sidebar {
  align-self: center;
  margin-left: 90px;
}
</style>
