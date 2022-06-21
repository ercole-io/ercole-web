<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    v-model="isActive"
    @input="onChangeDbTab"
    destroy-on-hide
    animated
  >
    <b-tab-item
      v-for="(dbs, i) in currentHostFiltered"
      :key="i"
      :label="dbs.name"
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
        <DbLicenses :licenses="dbs.licenses" />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'

import DbInfo from '@/components/hosts/hostDetails/microsoft/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/microsoft/databases/DbDatabases.vue'
import DbLicenses from '@/components/hosts/hostDetails/microsoft/databases/DbLicenses.vue'

export default {
  mixins: [databaseTabsMixin],
  components: {
    DbInfo,
    DbDatabases,
    DbLicenses,
  },
}
</script>

<style lang="scss" scoped></style>
