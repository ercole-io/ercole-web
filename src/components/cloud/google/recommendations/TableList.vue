<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(GoogleHeading)"
    :tableData="returnCloudRecommendations"
    :isLoadingTable="loadingTableStatus"
    @clickedRow="handleClickedRowGoogle"
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

        <MoreInfoButtons :buttonItems="RecommendationsMoreInfo" />

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
      :clickAction="retrieveUpdate"
      tooltipMsg="Retrieve Recommendations Updates"
      slot="customTopHeader"
    />

    <DynamicHeading
      slot="headData"
      v-for="head in GoogleHeading"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.category" />
      <TdContent :value="rowData.scope.objectType" />
      <TdContent :value="rowData.scope.suggestion" />
      <TdContent :value="rowData.scope.resolutionLevel" />
      <TdContent :value="rowData.scope.projectName" />
      <TdContent
        :value="rowData.scope.profileID"
        :class="{ 'is-hidden': moreInfoToggle.hiddenProfile }"
      />
      <TdContent :value="rowData.scope.resourceName" />
      <TdContent :value="rowData.scope.resourceID" />
    </template>

    <ExportButton
      slot="export"
      url="gcp/recommendations"
      expName="gcp-recommendations"
      api="thunderApi"
    />
  </FullTable>
</template>

<script>
import { mapState } from 'vuex'
import recommendationsMixin from '@/mixins/cloud/recommendations.js'
import GoogleHeading from '@/components/cloud/google/recommendations/Heading.json'
import RecommendationsMoreInfo from '@/components/cloud/google/recommendations/MoreInfo.json'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  name: 'cloud-google-recommendations-list-component',
  mixins: [recommendationsMixin],
  components: {
    MoreInfoButtons,
    ExportButton,
  },
  data() {
    return {
      GoogleHeading: GoogleHeading,
      RecommendationsMoreInfo: RecommendationsMoreInfo,
    }
  },
  computed: {
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss" scoped></style>
import { mapState } from 'vuex'
