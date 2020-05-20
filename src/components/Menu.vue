<template>
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
      <b-menu-item icon="settings">
        <template slot="label" slot-scope="props">
          Database
          <b-icon
            class="is-pulled-right"
            :icon="props.expanded ? 'menu-down' : 'menu-right'"
          ></b-icon>
        </template>
        <b-menu-item icon="account" label="Sub Item 1"></b-menu-item>
        <b-menu-item icon="cellphone-link" label="Sub Item 1"></b-menu-item>
      </b-menu-item>
      <b-menu-item
        icon="settings"
        label="Oracle"
        tag="router-link"
        to="/oracle"
      ></b-menu-item>
      <b-menu-item icon="settings" label="SQLS"></b-menu-item>
      <b-menu-item icon="settings" label="MySQL"></b-menu-item>
      <b-menu-item icon="settings" label="MDB"></b-menu-item>
      <b-menu-item icon="settings" label="PSQL"></b-menu-item>
      <b-menu-item icon="settings" label="Webdl"></b-menu-item>
      <b-menu-item icon="settings" label="OS"></b-menu-item>
      <b-menu-item icon="settings" label="Middleware"></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.menu-list {
  font-size: 0.9em;
}
</style>
