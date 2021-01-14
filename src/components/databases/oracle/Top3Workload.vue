<template>
  <BoxContent title="Top 3 Instance Workload" border>
    <!-- <Top10Link slot="customTitle" /> -->
    <SimpleTable
      :theadData="['', 'Host Name', 'DB Name', 'Thread Utilization']"
    >
      <template slot="tbodyContent">
        <tr v-for="(workload, index) in getTop3workload" :key="index">
          <TdStarIcon :position="index" />
          <HostLink :hostname="[workload.hostname, workload.dbname]" />
          <TdContent :value="workload.dbname" />
          <TdContent :value="workload.workload" />
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
    ...mapGetters(['getTop3workload'])
  }
}
</script>

<style lang="scss" scoped></style>
