<template>
  <BoxContent title="Top 3 Unused Instance Resource" border :mbottom="false">
    <!-- <Top10Link slot="customTitle" /> -->
    <SimpleTable :theadData="['', 'Hostname', 'Unused Thread']">
      <template slot="tbodyContent">
        <tr v-for="(reclaimable, index) in getTop3UnusedIR" :key="index">
          <TdStarIcon :position="index" />
          <HostLink :hostname="[reclaimable.hostname, reclaimable.dbname]" />
          <TdContent :value="reclaimable.unused | formatNumber('0.00')" />
        </tr>
      </template>
    </SimpleTable>
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdStarIcon from '@/components/common/Table/TdStarIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
// import Top10Link from '@/components/databases/oracle/Top10Link.vue'

export default {
  components: {
    BoxContent,
    SimpleTable,
    TdStarIcon,
    HostLink,
    TdContent
    // Top10Link
  },
  computed: {
    ...mapGetters(['getTop3UnusedIR'])
  }
}
</script>

<style lang="scss" scoped></style>
