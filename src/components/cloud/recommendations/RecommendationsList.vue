<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(recommendationHead)"
    :tableData="getRecommendations"
  >
    <DynamicHeading
      slot="headData"
      v-for="head in recommendationHead"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.pending" />
      <TdContent
        :value="rowData.scope.costSaving | formatNumber('0.00', '€', 1)"
      />
      <TdContent :value="rowData.scope.status" />
      <TdContent :value="rowData.scope.importance" />
    </template>

    <ExportButton slot="export" url="" expName="cloudRecommendations" />
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import recommendationHead from '@/components/cloud/recommendations/recommendationsHead.json'

export default {
  mixins: [getHeadKeys],
  components: {
    FullTable,
    TdContent,
    ExportButton,
    DynamicHeading
  },
  data() {
    return {
      recommendationHead: recommendationHead
    }
  },
  computed: {
    ...mapGetters(['getRecommendations'])
  }
}
</script>

<style lang="scss" scoped></style>
