<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    :animated="true"
    v-model="isActive"
    @input="onChange"
  >
    <template v-for="(dbs, i) in currentDBs">
      <b-tab-item :key="i" :label="dbs.name">
        <b-tabs size="is-small" type="is-toggle" vertical :animated="true">
          <DbInfo :dbInfo="dbs" />
          <DbLicenses :databases="dbs.dbLicenses" :dbName="dbs.name" />
          <DbDatabases :databases="dbs.databases" />
          <DbSegmantAdvisors :segmentAdvisors="dbs.segmentAdvisors" />
          <DbTableSchemas :tableSchemas="dbs.tableSchemas" />
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import DbInfo from '@/components/hosts/hostDetails/mysql/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/mysql/databases/DbDatabases.vue'
import DbSegmantAdvisors from '@/components/hosts/hostDetails/mysql/databases/DbSegmantAdvisors.vue'
import DbTableSchemas from '@/components/hosts/hostDetails/mysql/databases/DbTableSchemas.vue'
import DbLicenses from '@/components/hosts/hostDetails/mysql/databases/DbLicenses.vue'

export default {
  mixins: [hostDetailsDatabasesMixins],
  components: {
    DbInfo,
    DbDatabases,
    DbSegmantAdvisors,
    DbTableSchemas,
    DbLicenses,
  },
}
</script>

<style lang="scss" scoped></style>
