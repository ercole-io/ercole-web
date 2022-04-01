<template>
  <BoxContent
    :title="$t('views.databases.topWorkload', ['3'])"
    border
    :mbottom="false"
  >
    <GhostLoading :isLoading="loadingTableStatus" setHeight="190">
      <!-- <Top10Link slot="customTitle" /> -->
      <SimpleTable
        :theadData="[
          '',
          $t('common.collumns.hostname'),
          $t('common.collumns.name'),
          $t('common.collumns.threadUtil'),
        ]"
      >
        <template slot="tbodyContent">
          <tr v-for="(workload, index) in getTop3workload" :key="index">
            <TdStarIcon :position="index" />
            <HostLink :hostname="[workload.hostname, workload.dbname]" />
            <TdContent :value="workload.dbname" />
            <TdContent :value="workload.workload | formatNumber('0.00', '')" />
          </tr>
        </template>
      </SimpleTable>
    </GhostLoading>
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdStarIcon from '@/components/common/Table/TdStarIcon.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
// import Top10Link from '@/components/databases/oracle/Top10Link.vue'

export default {
  components: {
    BoxContent,
    SimpleTable,
    TdStarIcon,
    HostLink,
    TdContent,
    GhostLoading,
    // Top10Link
  },
  computed: {
    ...mapGetters(['getTop3workload', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
