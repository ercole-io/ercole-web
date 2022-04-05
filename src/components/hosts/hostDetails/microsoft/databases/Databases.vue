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
        <b-tabs size="is-small" type="is-toggle" vertical :animated="true">
          <DbInfo :dbInfo="dbs" />
          <DbBackups :backups="dbs.backups" />
          <DbTablespaces :tablespaces="dbs.tablespaces" />
          <DbSchemas :schemas="dbs.schemas" />
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import DbInfo from '@/components/hosts/hostDetails/microsoft/databases/DbInfo.vue'
import DbBackups from '@/components/hosts/hostDetails/microsoft/databases/DbBackups.vue'
import DbTablespaces from '@/components/hosts/hostDetails/microsoft/databases/DbTablespaces.vue'
import DbSchemas from '@/components/hosts/hostDetails/microsoft/databases/DbSchemas.vue'

export default {
  mixins: [hostDatabasesFilters, hostDetailsDatabasesMixins],
  components: {
    DbInfo,
    DbBackups,
    DbTablespaces,
    DbSchemas,
  },
}
</script>

<style lang="scss" scoped></style>
