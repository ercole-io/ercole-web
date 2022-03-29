<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(recommendationHead)"
    :tableData="getRecommendations"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="customTopHeader" v-if="!loadingTableStatus">
      <b-notification
        v-if="getOciActiveProfileError"
        type="is-warning is-light"
        aria-close-label="Close notification"
        role="alert"
        style="margin: 0 auto; padding: 0.4rem 2.5rem 0.4rem 1rem"
      >
        {{ getErrActiveProfile }}
      </b-notification>
    </template>

    <DynamicHeading
      slot="headData"
      v-for="head in recommendationHead"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.tenOCID" />
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
    DynamicHeading,
  },
  data() {
    return {
      recommendationHead: recommendationHead,
    }
  },
  computed: {
    ...mapGetters([
      'getRecommendations',
      'getOciActiveProfileError',
      'loadingTableStatus',
    ]),
    getErrActiveProfile() {
      const number = Number(this.getOciActiveProfileError) > 1 ? 2 : 1

      if (number > 1) {
        return this.$i18n.t('views.cloud.moreErrActiveProfile', {
          n: this.getOciActiveProfileError,
        })
      } else {
        return this.$i18n.t('views.cloud.oneErrActiveProfile', {
          n: this.getOciActiveProfileError,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
