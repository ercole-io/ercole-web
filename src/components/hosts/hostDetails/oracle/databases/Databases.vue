<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    v-model="isActive"
    @input="onChange"
    destroy-on-hide
    animated
    v-if="showDatabases"
  >
    <b-tab-item v-for="(dbs, i) in currentDBs" :label="dbs.name" :key="i">
      <b-tabs
        size="is-small"
        type="is-toggle"
        v-model="isActiveSub"
        @input="onChangeSub"
        vertical
        animated
        destroy-on-hide
      >
        <DbInfo :dbInfo="dbs" v-if="getCheckedFilters('info')" />
        <DbPDBs :pdbs="dbs.pdbs" v-if="getCheckedFilters('pdbs')" />
        <DbLicenses
          :licenses="dbs.licenses"
          :dbName="dbs.name"
          v-if="getCheckedFilters('licenses')"
        />
        <DbOptions :options="dbs.options" v-if="getCheckedFilters('options')" />
        <DbTablespaces
          :tablespaces="dbs.tablespaces"
          v-if="getCheckedFilters('tablespaces')"
        />
        <DbSchemas :schemas="dbs.schemas" v-if="getCheckedFilters('schemas')" />
        <DbPatches :patches="dbs.patches" v-if="getCheckedFilters('patches')" />
        <DbPSUs :psus="dbs.psus" v-if="getCheckedFilters('psus')" />
        <DbADDMs :addms="dbs.addms" v-if="getCheckedFilters('addms')" />
        <DbSegmentAdvisors
          :segmentAdvisors="dbs.segmentAdvisors"
          v-if="getCheckedFilters('segmentAdvisors')"
        />
        <DbGrowth
          :growth="dbs.dbGrowth"
          :growthId="dbs.name"
          v-if="getCheckedFilters('dbGrowth')"
        />
        <DbBackups :backups="dbs.backups" v-if="getCheckedFilters('backups')" />
        <DbServices
          :services="dbs.services"
          v-if="getCheckedFilters('services')"
        />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import hostDatabasesFilters from '@/mixins/hostDatabasesFilters.js'
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
import DbInfo from '@/components/hosts/hostDetails/oracle/databases/DbInfo.vue'
import DbTablespaces from '@/components/hosts/hostDetails/oracle/databases/DbTablespaces.vue'
import DbSchemas from '@/components/hosts/hostDetails/oracle/databases/DbSchemas.vue'
import DbPatches from '@/components/hosts/hostDetails/oracle/databases/DbPatches.vue'
import DbPSUs from '@/components/hosts/hostDetails/oracle/databases/DbPSUs.vue'
import DbADDMs from '@/components/hosts/hostDetails/oracle/databases/DbADDMs.vue'
import DbSegmentAdvisors from '@/components/hosts/hostDetails/oracle/databases/DbSegmentAdvisors.vue'
import DbBackups from '@/components/hosts/hostDetails/oracle/databases/DbBackups.vue'
import DbServices from '@/components/hosts/hostDetails/oracle/databases/DbServices.vue'
import DbGrowth from '@/components/hosts/hostDetails/oracle/databases/DbGrowth.vue'
import DbOptions from '@/components/hosts/hostDetails/oracle/databases/DbOptions.vue'
import DbLicenses from '@/components/hosts/hostDetails/oracle/databases/DbLicenses.vue'
import DbPDBs from '@/components/hosts/hostDetails/oracle/databases/DbPDBs.vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [hostDatabasesFilters, hostDetailsDatabasesMixins],
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
    DbPDBs,
  },
  computed: {
    ...mapGetters(['getCheckedFilters']),
  },
}
</script>

<style lang="scss" scoped></style>
