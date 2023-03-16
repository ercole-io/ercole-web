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
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

import DbInfo from '@/components/hosts/hostDetails/mongodb/databases/DbInfo.vue'

export default {
  name: 'hosts-details-mongodb-databases-main-component',
  mixins: [databaseTabsMixin, infoMixin],
  components: {
    DbInfo,
  },
}
</script>

<style lang="scss" scoped></style>
