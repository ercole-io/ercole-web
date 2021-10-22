<template>
  <b-tabs
    size="is-small"
    type="is-boxed"
    v-model="isActive"
    @input="onChange"
    destroy-on-hide
    animated
  >
    <template v-for="(dbs, i) in currentDBs">
      <b-tab-item :key="i" :label="dbs.name">
        <b-tabs
          size="is-small"
          type="is-toggle"
          vertical
          animated
          destroy-on-hide
        >
          <DbInfo :dbInfo="dbs" v-if="getCheckedFilters('info')" />
          <!-- <DbTags
              :dbName="dbs.name"
              :tags="['Albino', 'Milano', 'Como', 'Torino']"
            /> -->
          <DbPDBs :pdbs="dbs.pdbs" v-if="getCheckedFilters('pdbs')" />
          <DbLicenses
            :licenses="dbs.licenses"
            v-if="getCheckedFilters('licenses')"
          />
          <DbOptions
            :options="dbs.options"
            v-if="getCheckedFilters('options')"
          />
          <DbTablespaces
            :tablespaces="dbs.tablespaces"
            v-if="getCheckedFilters('tablespaces')"
          />
          <DbSchemas
            :schemas="dbs.schemas"
            v-if="getCheckedFilters('schemas')"
          />
          <DbPatches
            :patches="dbs.patches"
            v-if="getCheckedFilters('patches')"
          />
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
          <DbBackups
            :backups="dbs.backups"
            v-if="getCheckedFilters('backups')"
          />
          <DbServices
            :services="dbs.services"
            v-if="getCheckedFilters('services')"
          />
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
</template>

<script>
import hostDetailsDatabasesMixins from '@/mixins/hostDetailsDatabases.js'
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
import { mapGetters } from 'vuex'

export default {
  mixins: [hostDetailsDatabasesMixins],
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
    ...mapGetters(['getCheckedFilters'])
  }
}
</script>

<style lang="scss" scoped></style>
