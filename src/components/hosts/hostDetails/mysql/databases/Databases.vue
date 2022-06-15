<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    :animated="true"
    v-model="isActive"
    @input="onChange"
  >
    <b-tab-item v-for="(dbs, i) in currentDBs" :key="i" :label="dbs.name">
      <b-tabs
        size="is-small"
        type="is-toggle"
        v-model="isActiveSub"
        @input="onChangeSub"
        vertical
        animated
        destroy-on-hide
      >
        <DbInfo :dbInfo="dbs" />
        <DbLicenses :licenses="dbs.licenses" />
        <DbDatabases :databases="dbs.databases" />
        <DbSegmantAdvisors :segmentAdvisors="dbs.segmentAdvisors" />
        <DbTableSchemas :tableSchemas="dbs.tableSchemas" />
        <DbGrowth :growth="dbs.dbGrowth" :growthId="dbs.name" />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import DbInfo from '@/components/hosts/hostDetails/mysql/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/mysql/databases/DbDatabases.vue'
import DbSegmantAdvisors from '@/components/hosts/hostDetails/mysql/databases/DbSegmantAdvisors.vue'
import DbTableSchemas from '@/components/hosts/hostDetails/mysql/databases/DbTableSchemas.vue'
import DbLicenses from '@/components/hosts/hostDetails/mysql/databases/DbLicenses.vue'
import DbGrowth from '@/components/hosts/hostDetails/mysql/databases/DbGrowth.vue'

export default {
  mixins: [hostDetailsDatabasesMixins],
  components: {
    DbInfo,
    DbDatabases,
    DbSegmantAdvisors,
    DbTableSchemas,
    DbLicenses,
    DbGrowth,
  },
}
</script>

<style lang="scss" scoped></style>
