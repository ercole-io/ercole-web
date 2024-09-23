<template>
  <FullTable
    placeholder="All Recommendations"
    :keys="getHeadKeys(AllRecommendatiosnHeading)"
    :tableData="returnCloudAllRecommendations"
    :isLoadingTable="loadingTableStatus"
    @clickedRow="handleClickRowAllRecommendations"
    isClickable
  >
    <DynamicHeading
      slot="headData"
      v-for="head in AllRecommendatiosnHeading"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.cloud" />
      <TdContent :value="rowData.scope.category" />
      <TdContent :value="rowData.scope.objectType" />
      <TdContent :value="rowData.scope.suggestion" />
      <TdContent :value="rowData.scope.ociName || rowData.scope.awsName" />
      <TdContent :value="rowData.scope.ociCompartmentName" />
      <TdContent :value="rowData.scope.gcpOptimizationScore" />
      <TdContent :value="rowData.scope.gcpProjectName" />
      <TdContent :value="rowData.scope.gcpProfileID" />
      <TdContent :value="rowData.scope.gcpResourceName" />
      <TdContent :value="rowData.scope.gcpResourceID" />
    </template>
  </FullTable>
</template>

<script>
import recommendationsMixin from '@/mixins/cloud/recommendations.js'
import AllRecommendatiosnHeading from '@/components/cloud/allRecommendations/Heading.json'

export default {
  name: 'cloud-all-recommendations-list-component',
  mixins: [recommendationsMixin],
  data() {
    return {
      AllRecommendatiosnHeading: AllRecommendatiosnHeading,
    }
  },
}
</script>

<style lang="scss" scoped></style>
