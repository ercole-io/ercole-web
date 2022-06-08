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
      <div class="is-flex is-justify-content-space-between" style="width: 100%">
        <b-taglist
          attached
          class="is-align-self-center mb-0"
          v-if="returnErcoleRecommendationsLastUpdate && !loadingTableStatus"
        >
          <b-tag type="is-dark" class="mb-0">Last Update</b-tag>
          <b-tag type="is-success is-light" class="mb-0">
            {{ returnErcoleRecommendationsLastUpdate }}
          </b-tag>
        </b-taglist>

        <b-notification
          v-if="getOciActiveProfileErrors && !loadingTableStatus"
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
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import ErcoleRecommendationsModal from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsModal.vue'
import ErcoleRecommendationsHead from '@/components/cloud/ercoleRecommendations/ErcoleRecommendationsHead.json'
import RetrieveUpdateModal from '@/components/cloud/ercoleRecommendations/RetrieveUpdatesModal.vue'
import ErrorsRecommendationsModal from '@/components/cloud/ercoleRecommendations/ErrorsRecommendationsModal.vue'
import RefreshButton from '@/components/common/RefreshButton.vue'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [getHeadKeys, TooltipMixin],
  components: {
    FullTable,
    TdContent,
    DynamicHeading,
    RefreshButton,
  },
  data() {
    return {
      ErcoleRecommendationsHead: ErcoleRecommendationsHead,
    }
  },
  beforeMount() {
    bus.$on('refreshPageData', () => {
      this.retrieveUpdate()
    })

    bus.$on('finishRetrieveUpdates', () => {
      setTimeout(() => {
        this.getErcoleRecommendations()
        this.getErcoleRecommendationsErrors()
      }, 500)
    })
  },
  methods: {
    ...mapActions([
      'getErcoleRecommendations',
      'getErcoleRecommendationsErrors',
      'retireveRecommendations',
    ]),
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
      this.$buefy.modal.open({
        component: ErrorsRecommendationsModal,
        hasModalCard: true,
        canCancel: true,
        props: {
          dataErrors: this.getOciActiveProfileGeneralErrors,
        },
      })
    },
    retrieveUpdate() {
      this.$buefy.dialog.alert({
        title: 'Retrieve Recommendations Updates',
        type: 'is-warning',
        message:
          '<p>This action may take a few minutes...<p> <p>Are you sure you want to continue?<p>',
        confirmText: i18n.t('common.general.yes'),
        cancelText: i18n.t('common.general.close'),
        canCancel: true,
        hasIcon: true,
        icon: 'sync-alt',
        iconPack: 'fa',
        onConfirm: () => this.updatingRecommendations(),
      })
    },
    updatingRecommendations() {
      this.$buefy.modal.open({
        component: RetrieveUpdateModal,
        hasModalCard: true,
        canCancel: false,
      })
      setTimeout(() => {
        this.retireveRecommendations()
      }, 500)
    },
  },
  computed: {
    ...mapGetters([
      'returnErcoleRecommendations',
      'getOciActiveProfileErrors',
      'getOciActiveProfileGeneralErrors',
      'loadingTableStatus',
      'returnErcoleRecommendationsLastUpdate',
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
