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
      :label="dbs.name"
      :key="i"
    >
      <b-tabs
        size="is-small"
        type="is-toggle"
        v-model="isActiveSub"
        vertical
        animated
      >
        <DbInfo :dbInfo="dbs" v-if="hasInfo" />
        <DbPDBs
          :pdbs="dbs.pdbs"
          :dbname="dbs.name"
          v-if="dbs.pdbs && dbs.pdbs.length > 0"
        />
        <DbLicenses
          :licenses="dbs.licenses"
          v-if="dbs.licenses && dbs.licenses.length > 0"
        />
        <DbGrants
          :dbGrants="dbs.dbGrants"
          v-if="dbs.dbGrants && dbs.dbGrants.length > 0"
        />
        <DbOptions
          :options="dbs.options"
          v-if="dbs.options && dbs.options.length > 0"
        />
        <DbTablespaces
          :tablespaces="dbs.tablespaces"
          v-if="dbs.tablespaces && dbs.tablespaces.length > 0"
        />
        <DbSchemas
          :schemas="dbs.schemas"
          v-if="dbs.schemas && dbs.schemas.length > 0"
        />
        <DbPatches
          :patches="dbs.patches"
          v-if="dbs.patches && dbs.patches.length > 0"
        />
        <DbPSUs :psus="dbs.psus" v-if="dbs.psus && dbs.psus.length > 0" />
        <DbADDMs :addms="dbs.addms" v-if="dbs.addms && dbs.addms.length > 0" />
        <DbSegmentAdvisors
          :segmentAdvisors="dbs.segmentAdvisors"
          v-if="dbs.segmentAdvisors && dbs.segmentAdvisors.length > 0"
        />
        <DbGrowth
          :dbname="dbs.name"
          :growth="dbs.dbGrowth"
          :pdbs="dbs.pdbs"
          v-if="dbs.dbGrowth && dbs.dbGrowth.length > 0"
        />
        <!-- :growthId="dbs.name" -->
        <DbBackups
          :backups="dbs.backups"
          v-if="dbs.backups && dbs.backups.length > 0"
        />
        <DbServices
          :services="dbs.services"
          v-if="dbs.services && dbs.services.length > 0"
        />
        <DbPartitionings
          :partitionings="dbs.partitionings"
          v-if="dbs.partitionings && dbs.partitionings.length > 0"
        />
        <DbCapacity />
      </b-tabs>
    </b-tab-item>
  </b-tabs>
</template>

<script>
import databaseTabsMixin from '@/mixins/hostDetails/databaseTabs.js'
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

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
import DbGrants from '@/components/hosts/hostDetails/oracle/databases/DbGrants.vue'
import DbPartitionings from '@/components/hosts/hostDetails/oracle/databases/DbPartitionings.vue'
import DbCapacity from '@/components/hosts/hostDetails/oracle/databases/DbCapacity.vue'

export default {
  name: 'hosts-details-oracle-databases-dbs-component',
  mixins: [databaseTabsMixin, infoMixin],
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
    DbGrants,
    DbPartitionings,
    DbCapacity,
  },
}
</script>

<style lang="scss" scoped></style>
