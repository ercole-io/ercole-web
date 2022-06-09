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
        <DbInfo :dbInfo="dbs.info" />
        <DbDatabases :databases="dbs.databases" />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import DbInfo from '@/components/hosts/hostDetails/postgresql/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/postgresql/databases/DbDatabases.vue'

export default {
  mixins: [hostDetailsDatabasesMixins],
  components: {
    DbInfo,
    DbDatabases,
  },
}
</script>

<style lang="scss" scoped></style>
