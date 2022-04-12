<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    v-model="isActive"
    @input="onChange"
    destroy-on-hide
    animated
    v-if="showDatabases"
  >
    <template v-for="(dbs, i) in currentDBs">
      <b-tab-item :key="i" :label="dbs.name">
        <b-tabs
          size="is-small"
          type="is-toggle"
          vertical
          animated
          destroy-on-hide
        >
          <DbInfo :dbInfo="dbs.info" />
          <DbDatabases :databases="dbs.databases" />
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import DbInfo from '@/components/hosts/hostDetails/microsoft/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/microsoft/databases/DbDatabases.vue'

export default {
  mixins: [hostDatabasesFilters, hostDetailsDatabasesMixins],
  components: {
    DbInfo,
    DbDatabases,
  },
}
</script>

<style lang="scss" scoped></style>
