<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(ErcoleRecommendationsHead)"
    :tableData="returnErcoleRecommendations"
    :isLoadingTable="loadingTableStatus"
    @clickedRow="handleClickedRow"
    isClickable
  >
    <template
      slot="customTopHeader"
      v-if="getOciActiveProfileError && !loadingTableStatus"
    >
      <b-notification
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
      v-for="head in ErcoleRecommendationsHead"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.category" />
      <TdContent :value="rowData.scope.objectType" />
      <TdContent :value="rowData.scope.suggestion" />
      <TdContent :value="rowData.scope.compartmentName" />
      <TdContent :value="rowData.scope.name" />
    </template>

    <!-- <ExportButton slot="export" url="" expName="cloudRecommendations" /> -->
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import ErcoleRecommendationsModal from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsModal.vue'
import ErcoleRecommendationsHead from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsHead.json'

export default {
  mixins: [getHeadKeys],
  components: {
    FullTable,
    TdContent,
    // ExportButton,
    DynamicHeading,
  },
  data() {
    return {
      ErcoleRecommendationsHead: ErcoleRecommendationsHead,
    }
  },
  methods: {
    handleClickedRow(value) {
      if (value[0]) {
        this.$buefy.modal.open({
          component: ErcoleRecommendationsModal,
          hasModalCard: true,
          props: {
            modalTitle: value[0].name,
            details: value[0].details,
          },
        })
      }
    },
  },
  computed: {
    ...mapGetters([
      'returnErcoleRecommendations',
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
