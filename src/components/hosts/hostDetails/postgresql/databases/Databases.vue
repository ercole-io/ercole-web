<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    :animated="true"
    v-model="isActive"
    @input="onChangeDbTab"
  >
    <b-tab-item
      v-for="(dbs, i) in currentHostFiltered"
      :key="i"
      :label="dbs.dbName"
    >
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
        <DbDatabases :databases="dbs.databases" />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'

import DbInfo from '@/components/hosts/hostDetails/postgresql/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/postgresql/databases/DbDatabases.vue'

export default {
  mixins: [databaseTabsMixin],
  components: {
    DbInfo,
    DbDatabases,
  },
}
</script>

<style lang="scss" scoped></style>
