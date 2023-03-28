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
        <DbDatabases :databases="dbs.databases" />
        <DbShardList :shards="dbs.shardList" />
        <DbReplicaSet :replicaset="dbs.replicaSet" />
        <DbStatusConnection :statusconnection="dbs.statusConnection" />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

import DbInfo from '@/components/hosts/hostDetails/mongodb/databases/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/mongodb/databases/DbDatabases.vue'
import DbShardList from '@/components/hosts/hostDetails/mongodb/databases/DbShardList.vue'
import DbReplicaSet from '@/components/hosts/hostDetails/mongodb/databases/DbReplicaSet.vue'
import DbStatusConnection from '@/components/hosts/hostDetails/mongodb/databases/DbStatusConnection.vue'

export default {
  name: 'hosts-details-mongodb-databases-main-component',
  mixins: [databaseTabsMixin, infoMixin],
  components: {
    DbInfo,
    DbDatabases,
    DbShardList,
    DbReplicaSet,
    DbStatusConnection,
  },
}
</script>

<style lang="scss" scoped></style>
