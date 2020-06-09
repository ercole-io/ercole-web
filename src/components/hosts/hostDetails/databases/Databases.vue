<template>
  <b-tabs
    v-model="activeTab"
    :multiline="multiline"
    size="is-small"
    type="is-boxed"
  >
    <template v-for="dbs in hostDbs">
      <b-tab-item :key="dbs.UniqueName" :label="dbs.Name">
        <b-tabs size="is-small" type="is-toggle" vertical :animated="true">
          <b-tab-item label="Info">
            <DbInfo
              :details="{
                status: dbs.Status,
                dbName: dbs.Name,
                uniqueName: dbs.UniqueName,
                archiveLog: dbs.Archivelog,
                blockSize: dbs.BlockSize,
                charset: dbs.Charset,
                nCharset: dbs.NCharset
              }"
              :memory="{
                memoryTarget: dbs.MemoryTarget,
                pgaTarget: dbs.PGATarget,
                sgaMaxSize: dbs.SGAMaxSize,
                sgaTarget: dbs.SGATarget
              }"
              :resource="{
                dbTime: dbs.DBTime,
                elapsed: dbs.Elapsed,
                threadUsed: dbs.Used,
                cpuCount: dbs.CPUCount
              }"
              :space="{
                allocable: dbs.Allocated,
                dataFileSize: dbs.DataFileSize,
                segmentSize: dbs.SegmentsSize
              }"
              :infos="{
                asm: dbs.ASM,
                dataGuard: dbs.Dataguard,
                plattform: dbs.Platform,
                version: dbs.Version
              }"
            />
          </b-tab-item>
          <b-tab-item label="Tags"> Tags {{ dbs.Name }} </b-tab-item>
          <b-tab-item label="Pluggable DBs">
            Pluggable DBs {{ dbs.Name }}
          </b-tab-item>
          <b-tab-item label="Licenses">Licenses {{ dbs.Name }}</b-tab-item>
          <b-tab-item label="Options">Options {{ dbs.Name }}</b-tab-item>
          <b-tab-item label="Tablespaces">
            <DbTablespaces :tablespaces="dbs.Tablespaces" />
          </b-tab-item>
          <b-tab-item label="Schemas">
            <DbSchemas :schemas="dbs.Schemas" />
          </b-tab-item>
          <b-tab-item label="Patches">
            <DbPatches :patches="dbs.Patches" />
          </b-tab-item>
          <b-tab-item label="PSUs">
            <DbPSUs :psus="dbs.LastPSUs" />
          </b-tab-item>
          <b-tab-item label="ADDMs">
            <DbADDMs :addms="dbs.ADDMs" />
          </b-tab-item>
          <b-tab-item label="Segment Advisors">
            <DbSegmentAdvisors :segmentAdvisors="dbs.SegmentAdvisors" />
          </b-tab-item>
          <b-tab-item label="DBGrowth">
            <DbGrowth :growth="DbGrowthData" :growthId="dbs.Name" />
          </b-tab-item>
          <b-tab-item label="Backups">
            <DbBackups :backups="dbs.Backups" />
          </b-tab-item>
          <b-tab-item label="Services">
            <DbServices :services="dbs.Services" />
          </b-tab-item>
        </b-tabs>
      </b-tab-item>
    </template>
  </b-tabs>
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
    DbGrowth
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

<style lang="scss" scoped></style>
