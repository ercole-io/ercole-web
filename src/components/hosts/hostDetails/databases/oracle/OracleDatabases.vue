<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    :animated="true"
    v-model="active"
    @click.native="bindDbChart"
  >
    <template v-for="(dbs, i) in filteredHostDbs">
      <b-tab-item :key="i" :label="dbs.name">
        <b-tabs size="is-small" type="is-toggle" vertical :animated="true">
          <DbInfo :dbInfo="dbs" />
          <!-- <DbTags
              :dbName="dbs.name"
              :tags="['Albino', 'Milano', 'Como', 'Torino']"
            /> -->
          <DbPDBs :pdbs="dbs.pdbs" />
          <DbLicenses :licenses="dbs.licenses" />
          <DbOptions :options="dbs.featureUsageStats" />
          <DbTablespaces :tablespaces="dbs.tablespaces" />
          <DbSchemas :schemas="dbs.schemas" />
          <DbPatches :patches="dbs.patches" />
          <DbPSUs :psus="dbs.psus" />
          <DbADDMs :addms="dbs.addms" />
          <DbSegmentAdvisors :segmentAdvisors="dbs.segmentAdvisors" />
          <DbGrowth :growth="dbs.changes" :growthId="dbs.name" />
          <DbBackups :backups="dbs.backups" />
          <DbServices :services="dbs.services" />
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
import DbInfo from '@/components/hosts/hostDetails/databases/oracle/DbInfo.vue'
import DbTablespaces from '@/components/hosts/hostDetails/databases/oracle/DbTablespaces.vue'
import DbSchemas from '@/components/hosts/hostDetails/databases/oracle/DbSchemas.vue'
import DbPatches from '@/components/hosts/hostDetails/databases/oracle/DbPatches.vue'
import DbPSUs from '@/components/hosts/hostDetails/databases/oracle/DbPSUs.vue'
import DbADDMs from '@/components/hosts/hostDetails/databases/oracle/DbADDMs.vue'
import DbSegmentAdvisors from '@/components/hosts/hostDetails/databases/oracle/DbSegmentAdvisors.vue'
import DbBackups from '@/components/hosts/hostDetails/databases/oracle/DbBackups.vue'
import DbServices from '@/components/hosts/hostDetails/databases/oracle/DbServices.vue'
import DbGrowth from '@/components/hosts/hostDetails/databases/oracle/DbGrowth.vue'
import DbOptions from '@/components/hosts/hostDetails/databases/oracle/DbOptions.vue'
import DbLicenses from '@/components/hosts/hostDetails/databases/oracle/DbLicenses.vue'
// import DbTags from '@/components/hosts/hostDetails/databases/oracle/DbTags.vue'
import DbPDBs from '@/components/hosts/hostDetails/databases/oracle/DbPDBs.vue'

export default {
  props: {
    filteredHostDbs: {
      type: Array,
      default: () => []
    },
    activeTab: {
      type: Number,
      default: 0
    },
    bindDbChart: {
      type: Function
    }
  },
  components: {
    DbInfo,
    DbTablespaces,
    DbSchemas,
    DbPatches,
    DbPSUs,
    DbADDMs,
    DbSegmentAdvisors,
    DbBackups,
    DbServices,
    DbGrowth,
    DbOptions,
    DbLicenses,
    // DbTags,
    DbPDBs
  },
  computed: {
    active: {
      get() {
        return this.activeTab
      },
      set(val) {
        console.log(val)
        return val
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
