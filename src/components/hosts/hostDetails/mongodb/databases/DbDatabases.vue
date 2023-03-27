<template>
  <b-tab-item label="Databases" v-if="databases && databases.length > 0">
    <b-tabs size="is-small" type="is-boxed" animated destroy-on-hide>
      <b-tab-item v-for="(db, i) in databases" :key="i" :label="db.name">
        <b-tabs
          size="is-small"
          type="is-toggle"
          position="is-centered"
          vertical
          animated
          destroy-on-hide
          class="mt-3"
        >
          <b-tab-item label="Info">
            <Info :dbInfo="db.dbInfo" />
          </b-tab-item>
          <b-tab-item label="Shard DBs">
            <ShardDbs :sharddbs="db.shardDBs" />
          </b-tab-item>
        </b-tabs>
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import Info from '@/components/hosts/hostDetails/mongodb/databases/dbs/Info.vue'
import ShardDbs from '@/components/hosts/hostDetails/mongodb/databases/dbs/ShardDbs.vue'

export default {
  name: 'hosts-details-microsoft-databases-dbs-component',
  components: {
    Info,
    ShardDbs,
  },
  props: {
    databases: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
