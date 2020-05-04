<template>
  <b-menu>
    <b-menu-list>
      <b-menu-item icon="settings" :active="isActive">
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
      <b-menu-item icon="settings" label="Oracle"></b-menu-item>
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
export default {
  data() {
    return {
      isActive: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
