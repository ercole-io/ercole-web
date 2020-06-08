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
          <b-tab-item label="DBGrowth">DBGrowth {{ dbs.Name }}</b-tab-item>
          <b-tab-item label="Backups">Backups {{ dbs.Name }}</b-tab-item>
          <b-tab-item label="Services">Services {{ dbs.Name }}</b-tab-item>
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
    DbSegmentAdvisors
  },
  data() {
    return {
      activeTab: 0,
      multiline: true,
      isActive: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
