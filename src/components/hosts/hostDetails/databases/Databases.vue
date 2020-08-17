<template>
  <section>
    <b-tabs
      v-model="activeTab"
      :multiline="multiline"
      size="is-small"
      type="is-boxed"
    >
      <template v-for="dbs in hostDbs">
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
            <b-tab-item label="Pluggable DBs">
              Pluggable DBs {{ dbs.name }}
            </b-tab-item>
            <b-tab-item label="Licenses">
              <DbLicenses :licenses="dbs.licenses" />
            </b-tab-item>
            <b-tab-item label="Options">
              <DbOptions :options="dbs.options" />
            </b-tab-item>
            <b-tab-item label="Tablespaces">
              <DbTablespaces :tablespaces="dbs.tablespaces" />
            </b-tab-item>
            <b-tab-item label="Schemas">
              <DbSchemas :schemas="dbs.schemas" />
            </b-tab-item>
            <b-tab-item label="Patches">
              <DbPatches :patches="dbs.patches" />
            </b-tab-item>
            <b-tab-item label="PSUs">
              <DbPSUs :psus="dbs.psus" />
            </b-tab-item>
            <b-tab-item label="ADDMs">
              <DbADDMs :addms="dbs.addms" />
            </b-tab-item>
            <b-tab-item label="Segment Advisors">
              <DbSegmentAdvisors :segmentAdvisors="dbs.segmentAdvisors" />
            </b-tab-item>
            <b-tab-item label="DBGrowth">
              <DbGrowth :growth="DbGrowthData" :growthId="dbs.name" />
            </b-tab-item>
            <b-tab-item label="Backups">
              <DbBackups :backups="dbs.backups" />
            </b-tab-item>
            <b-tab-item label="Services">
              <DbServices :services="dbs.services" />
            </b-tab-item>
          </b-tabs>
        </b-tab-item>
      </template>
    </b-tabs>
  </section>
</template>

<script>
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

export default {
  props: {
    hostDbs: {
      type: Array,
      required: true
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
    DbTags
  },
  data() {
    return {
      activeTab: 0,
      multiline: true,
      isActive: true,
      DbGrowthData: [
        {
          name: 'Value 1',
          data: {
            '2013-02-10': 30,
            '2013-02-17': 30,
            '2013-02-24': 30,
            '2013-03-03': 10,
            '2013-03-10': 40,
            '2013-03-17': 30,
            '2013-03-24': 20,
            '2013-03-31': 30
          }
        },
        {
          name: 'Value 2',
          data: {
            '2013-02-10': 0,
            '2013-02-17': 10,
            '2013-02-24': 0,
            '2013-03-03': 50,
            '2013-03-10': 20,
            '2013-03-17': 10,
            '2013-03-24': 0,
            '2013-03-31': 70
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
