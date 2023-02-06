<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(AwsHeading)"
    :tableData="returnCloudRecommendations"
    :isLoadingTable="loadingTableStatus"
    @clickedRow="handleClickedRow"
    isClickable
  >
    <template slot="customTopHeader">
      <div class="is-flex is-justify-content-space-between" style="width: 100%">
        <b-taglist
          attached
          class="is-align-self-center mb-0"
          v-if="returnCloudRecommendationsLastUpdate && !loadingTableStatus"
        >
          <b-tag type="is-dark" class="mb-0">Last Update</b-tag>
          <b-tag type="is-success is-light" class="mb-0">
            {{ returnCloudRecommendationsLastUpdate }}
          </b-tag>
        </b-taglist>

        <b-notification
          v-if="getCloudActiveProfileErrors && !loadingTableStatus"
          type="is-warning is-light"
          class="is-flex is-align-content-center mb-0 mr-2"
          style="padding: 0.1rem 1rem 0 1rem"
          :closable="false"
        >
          {{ showProfileErrors }}
        </b-notification>

        <b-button
          v-if="showGeneralErrors && !loadingTableStatus"
          size="is-small"
          type="is-danger"
          icon-right="exclamation"
          icon-pack="fas"
          class="mr-2"
          @click="modalErrors"
          v-tooltip="options('Recommendations Errors')"
        />
      </div>
    </template>
    <RefreshButton
      tooltipMsg="Retrieve Recommendations Updates"
      slot="customTopHeader"
    />

    <DynamicHeading
      slot="headData"
      v-for="head in AwsHeading"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.category" />
      <TdContent :value="rowData.scope.objectType" />
      <TdContent :value="rowData.scope.suggestion" />
      <TdContent :value="rowData.scope.name" />
    </template>
  </FullTable>
</template>

<script>
import recommendationsMixin from '@/mixins/cloud/recommendations.js'
import AwsHeading from '@/components/cloud/aws/recommendations/Heading.json'

export default {
  name: 'cloud-aws-recommendations-list-component',
  mixins: [recommendationsMixin],
  data() {
    return {
      AwsHeading: AwsHeading,
    }
  },
}
</script>

<style lang="scss" scoped></style>
