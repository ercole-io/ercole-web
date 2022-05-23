<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(ErcoleRecommendationsHead)"
    :tableData="returnErcoleRecommendations"
    :isLoadingTable="loadingTableStatus"
    @clickedRow="handleClickedRow"
    isClickable
  >
    <template slot="customTopHeader">
      <b-notification
        v-if="getOciActiveProfileErrors && !loadingTableStatus"
        type="is-warning is-light"
        style="margin: 0 auto; padding: 0.1rem 1rem 0 1rem"
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
  </FullTable>
</template>

<script>
import i18n from '@/i18n.js'
import { mapGetters, mapMutations } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import ErcoleRecommendationsModal from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsModal.vue'
import ErcoleRecommendationsHead from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsHead.json'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [getHeadKeys, TooltipMixin],
  components: {
    FullTable,
    TdContent,
    DynamicHeading,
  },
  data() {
    return {
      ErcoleRecommendationsHead: ErcoleRecommendationsHead,
    }
  },
  methods: {
    ...mapMutations([
      'SET_OCI_ACTIVE_PROFILE_ERRORS',
      'SET_OCI_ACTIVE_PROFILE_GENERAL_ERRORS',
    ]),
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
    modalErrors() {
      this.$buefy.dialog.alert({
        title: 'Recommendations Errors',
        message: `<p style="white-space: pre;">${this.getOciActiveProfileGeneralErrors}</p>`,
        type: 'is-danger',
        confirmText: i18n.t('common.general.close'),
        size: 'is-small',
        hasIcon: true,
        iconPack: 'mdi',
      })
    },
  },
  computed: {
    ...mapGetters([
      'returnErcoleRecommendations',
      'getOciActiveProfileErrors',
      'getOciActiveProfileGeneralErrors',
      'loadingTableStatus',
    ]),
    showProfileErrors() {
      const number = Number(this.getOciActiveProfileErrors) > 1 ? 2 : 1

      if (number > 1) {
        return this.$i18n.t('views.cloud.moreErrActiveProfile', {
          n: this.getOciActiveProfileErrors,
        })
      } else {
        return this.$i18n.t('views.cloud.oneErrActiveProfile', {
          n: this.getOciActiveProfileErrors,
        })
      }
    },
    showGeneralErrors() {
      return this.getOciActiveProfileGeneralErrors.length > 0
    },
  },
  beforeDestroy() {
    this.SET_OCI_ACTIVE_PROFILE_ERRORS('')
    this.SET_OCI_ACTIVE_PROFILE_GENERAL_ERRORS([])
  },
}
</script>

<style lang="scss" scoped></style>
