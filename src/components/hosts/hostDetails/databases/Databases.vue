<template>
  <section>
    <b-tabs
      v-model="activeTab"
      :multiline="multiline"
      size="is-small"
      type="is-boxed"
    >
      <template v-for="dbs in hostDetails.hostDBs">
        <b-tab-item :key="dbs.UniqueName" :label="dbs.name">
          <b-tabs size="is-small" type="is-toggle" vertical :animated="true">
            <b-tab-item label="Info">
              <DbInfo
                :details="{
                  status: dbs.status,
                  dbName: dbs.name,
                  uniqueName: dbs.uniqueName,
                  archiveLog: dbs.archivelog,
                  blockSize: dbs.blockSize,
                  charset: dbs.charset,
                  nCharset: dbs.nCharset
                }"
                :memory="{
                  memoryTarget: dbs.memoryTarget,
                  pgaTarget: dbs.pgaTarget,
                  sgaMaxSize: dbs.sgaMaxSize,
                  sgaTarget: dbs.sgaTarget
                }"
                :resource="{
                  dbTime: dbs.dbTime,
                  elapsed: dbs.elapsed,
                  threadUsed: dbs.work,
                  cpuCount: dbs.cpuCount
                }"
                :space="{
                  allocable: dbs.allocated,
                  dataFileSize: dbs.datafileSize,
                  segmentSize: dbs.segmentsSize
                }"
                :infos="{
                  asm: dbs.asm,
                  dataGuard: dbs.dataguard,
                  plattform: dbs.platform,
                  version: dbs.version
                }"
              />
            </b-tab-item>
            <b-tab-item label="Tags">
              <DbTags
                :dbName="dbs.name"
                :tags="['Albino', 'Milano', 'Como', 'Torino']"
              />
            </b-tab-item>
            <b-tab-item label="Pluggable DBs" v-if="dbs.pdbs.length > 0">
              <DbPDBs :pdbs="dbs.pdbs" />
            </b-tab-item>
            <b-tab-item label="Licenses" v-if="dbs.licenses.length > 0">
              <DbLicenses :licenses="dbs.licenses" />
            </b-tab-item>
            <b-tab-item label="Options" v-if="dbs.featureUsageStats.length > 0">
              <DbOptions :options="dbs.featureUsageStats" />
            </b-tab-item>
            <b-tab-item label="Tablespaces" v-if="dbs.tablespaces.length > 0">
              <DbTablespaces :tablespaces="dbs.tablespaces" />
            </b-tab-item>
            <b-tab-item label="Schemas" v-if="dbs.schemas.length > 0">
              <DbSchemas :schemas="dbs.schemas" />
            </b-tab-item>
            <b-tab-item label="Patches" v-if="dbs.patches.length > 0">
              <DbPatches :patches="dbs.patches" />
            </b-tab-item>
            <b-tab-item label="PSUs" v-if="dbs.psus.length > 0">
              <DbPSUs :psus="dbs.psus" />
            </b-tab-item>
            <b-tab-item label="ADDMs" v-if="dbs.addms.length > 0">
              <DbADDMs :addms="dbs.addms" />
            </b-tab-item>
            <b-tab-item
              label="Segment Advisors"
              v-if="dbs.segmentAdvisors.length > 0"
            >
              <DbSegmentAdvisors :segmentAdvisors="dbs.segmentAdvisors" />
            </b-tab-item>
            <b-tab-item label="DBGrowth" v-if="dbs.changes.length > 0">
              <DbGrowth :growth="dbs.changes" :growthId="dbs.name" />
            </b-tab-item>
            <b-tab-item label="Backups" v-if="dbs.backups.length > 0">
              <DbBackups :backups="dbs.backups" />
            </b-tab-item>
            <b-tab-item label="Services" v-if="dbs.services.length > 0">
              <DbServices :services="dbs.services" />
            </b-tab-item>
          </b-tabs>
        </b-tab-item>
      </template>
    </b-tabs>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import DbInfo from '@/components/hosts/hostDetails/databases/DbInfo.vue'
import DbTablespaces from '@/components/hosts/hostDetails/databases/DbTablespaces.vue'
import DbSchemas from '@/components/hosts/hostDetails/databases/DbSchemas.vue'
import DbPatches from '@/components/hosts/hostDetails/databases/DbPatches.vue'
import DbPSUs from '@/components/hosts/hostDetails/databases/DbPSUs.vue'
import DbADDMs from '@/components/hosts/hostDetails/databases/DbADDMs.vue'
import DbSegmentAdvisors from '@/components/hosts/hostDetails/databases/DbSegmentAdvisors.vue'
import DbBackups from '@/components/hosts/hostDetails/databases/DbBackups.vue'
import DbServices from '@/components/hosts/hostDetails/databases/DbServices.vue'
import DbGrowth from '@/components/hosts/hostDetails/databases/DbGrowth.vue'
import DbOptions from '@/components/hosts/hostDetails/databases/DbOptions.vue'
import DbLicenses from '@/components/hosts/hostDetails/databases/DbLicenses.vue'
import DbTags from '@/components/hosts/hostDetails/databases/DbTags.vue'
import DbPDBs from '@/components/hosts/hostDetails/databases/DbPDBs.vue'

export default {
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
    DbTags,
    DbPDBs
  },
  data() {
    return {
      activeTab: 0,
      multiline: true,
      isActive: true
    }
  },
  computed: {
    ...mapState(['hostDetails'])
  }
}
</script>

<style lang="scss"></style>
