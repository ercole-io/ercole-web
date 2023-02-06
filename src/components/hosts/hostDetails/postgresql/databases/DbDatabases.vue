<template>
  <b-tab-item label="Databases">
    <b-tabs
      size="is-small"
      type="is-boxed"
      animated
      destroy-on-hide
      v-model="isActive"
      @input="onChangeDbTab"
    >
      <b-tab-item v-for="(db, i) in databases" :key="i" :label="db.dbName">
        <b-tabs
          size="is-small"
          type="is-toggle"
          position="is-centered"
          v-model="isActiveSub"
          @input="onChangeSub"
          vertical
          animated
          destroy-on-hide
          class="mt-3"
        >
          <Info :info="db" />
          <ObjectsSize
            :objectsSize="db.schemas"
            v-if="db.schemas && db.schemas.length > 0"
          />
        </b-tabs>
      </b-tab-item>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'

import Info from '@/components/hosts/hostDetails/postgresql/databases/dbs/Info.vue'
import ObjectsSize from '@/components/hosts/hostDetails/postgresql/databases/dbs/ObjectsSize.vue'

export default {
  name: 'hosts-details-postgre-databases-dbs-component',
  mixins: [databaseTabsMixin],
  components: {
    Info,
    ObjectsSize,
  },
  props: {
    databases: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
