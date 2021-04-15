<template>
  <b-tabs size="is-small" type="is-boxed" :animated="true" v-model="isActive">
    <template v-for="(dbs, i) in filteredHostDbs">
      <b-tab-item :key="i" :label="dbs.name">
        <b-tabs size="is-small" type="is-toggle" vertical :animated="true">
          <DbInfo :dbInfo="dbs" />
          <DbDatabases :databases="dbs.databases" />
          <DbSegmantAdvisors :segmentAdvisors="dbs.segmentAdvisors" />
          <DbTableSchemas :tableSchemas="dbs.tableSchemas" />
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import DbInfo from '@/components/hosts/hostDetails/databases/mysql/DbInfo.vue'
import DbDatabases from '@/components/hosts/hostDetails/databases/mysql/DbDatabases.vue'
import DbSegmantAdvisors from '@/components/hosts/hostDetails/databases/mysql/DbSegmantAdvisors.vue'
import DbTableSchemas from '@/components/hosts/hostDetails/databases/mysql/DbTableSchemas.vue'

export default {
  props: {
    filteredHostDbs: {
      type: Array,
      default: () => []
    },
    activatedTab: {
      type: Number,
      default: 0
    }
  },
  components: {
    DbInfo,
    DbDatabases,
    DbSegmantAdvisors,
    DbTableSchemas
  },
  computed: {
    isActive: {
      get() {
        return this.activatedTab
      },
      set(val) {
        return bus.$emit('changeActiveTab', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
