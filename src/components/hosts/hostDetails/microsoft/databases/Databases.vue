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
        <DbPatches :patches="dbs.patches" />
        <DbFeatures :features="dbs.features" />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'

import DbInfo from '@/components/hosts/hostDetails/microsoft/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/microsoft/databases/DbDatabases.vue'
import DbLicenses from '@/components/hosts/hostDetails/microsoft/databases/DbLicenses.vue'
import DbPatches from '@/components/hosts/hostDetails/microsoft/databases/DbPatches.vue'
import DbFeatures from '@/components/hosts/hostDetails/microsoft/databases/DbFeatures.vue'

export default {
  name: 'hosts-details-microsoft-databases-main-component',
  mixins: [databaseTabsMixin],
  components: {
    DbInfo,
    DbDatabases,
    DbLicenses,
    DbPatches,
    DbFeatures,
  },
}
</script>

<style lang="scss" scoped></style>
