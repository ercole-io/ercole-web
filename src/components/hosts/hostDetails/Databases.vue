<template>
  <b-tabs
    v-model="activeTab"
    :multiline="multiline"
    size="is-small"
    type="is-boxed"
  >
    <template v-for="dbs in hostDbs">
      <b-tab-item :key="dbs.UniqueName" :label="dbs.Name">
        <div class="columns">
          <div class="column is-2">
            <b-tabs size="is-small" type="is-toggle" vertical :animated="false">
              <b-tab-item label="Info"> Info {{ dbs.Name }} </b-tab-item>
              <b-tab-item label="Tags"> Tags {{ dbs.Name }} </b-tab-item>
              <b-tab-item label="Pluggable DBs">
                Pluggable DBs {{ dbs.Name }}
              </b-tab-item>
              <b-tab-item label="Licenses">Licenses {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="Options">Options {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="Tablespaces"
                >Tablespaces {{ dbs.Name }}</b-tab-item
              >
              <b-tab-item label="Schemas">Schemas {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="Patches">Patches {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="PSUs">PSUs {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="ADDMs">ADDMs {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="Segment Advisors"
                >Segment Advisors {{ dbs.Name }}</b-tab-item
              >
              <b-tab-item label="DBGrowth">DBGrowth {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="Backups">Backups {{ dbs.Name }}</b-tab-item>
              <b-tab-item label="Services">Services {{ dbs.Name }}</b-tab-item>
            </b-tabs>
          </div>
          <div class="column is-10"></div>
        </div>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
export default {
  props: {
    hostDbs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeTab: 0,
      multiline: true,
      isActive: true
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  font-size: 0.8em;

  .menu-list {
    list-style: none;
    margin-left: 0;
    margin-top: 0;
    line-height: 1;
  }
}
</style>
