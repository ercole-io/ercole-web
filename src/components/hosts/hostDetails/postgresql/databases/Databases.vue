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
        <DbInfo :dbInfo="dbs" v-if="hasInfo" />
        <DbDatabases
          :databases="dbs.databases"
          v-if="dbs.databases && dbs.databases.length > 0"
        />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

import DbInfo from '@/components/hosts/hostDetails/postgresql/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/postgresql/databases/DbDatabases.vue'

export default {
  mixins: [databaseTabsMixin, infoMixin],
  components: {
    DbInfo,
    DbDatabases,
  },
}
</script>

<style lang="scss" scoped></style>
