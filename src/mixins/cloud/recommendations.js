import i18n from '@/i18n.js'
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import DetailsModal from '@/components/cloud/DetailsModal.vue'
import ErrorsModal from '@/components/cloud/ErrorsModal.vue'
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
  beforeMount() {
    bus.$on('finishRetrieveUpdates', () => {
      setTimeout(() => {
        this.getCloudRecommendations(this.returnCloudTechnology)
      }, 500)
    })
  },
  methods: {
    ...mapActions(['getCloudRecommendations', 'retireveCloudRecommendations']),
    ...mapMutations([
      'SET_CLOUD_ACTIVE_PROFILE_ERRORS',
      'SET_CLOUD_ACTIVE_PROFILE_GENERAL_ERRORS',
    ]),
    handleClickedRow(value) {
      if (value && value[0]) {
        if (_.isArray(value[0].details)) {
          this.$buefy.modal.open({
            component: DetailsModal,
            hasModalCard: true,
            props: {
              modalTitle: value[0].name,
              details: value[0].details,
            },
          })
        } else {
          const mapValues = _.map(value[0].details, (v, k) => {
            return {
              name: k,
              value: v,
            }
          })

          this.$buefy.modal.open({
            component: DetailsModal,
            hasModalCard: true,
            props: {
              modalTitle: value[0].projectName,
              details: mapValues,
            },
          })
        }
      }
    },
    modalErrors() {
      this.$buefy.modal.open({
        component: ErrorsModal,
        hasModalCard: true,
        canCancel: true,
        props: {
          dataErrors: this.getCloudActiveProfileGeneralErrors,
        },
      })
    },
    retrieveUpdate() {
      this.$buefy.dialog.confirm({
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
        onConfirm: () => {
          bus.$emit('retrieveUpdates', true)
          this.retireveCloudRecommendations().then(() => {
            bus.$emit('retrieveUpdates', false)
          })
        },
      })
    },
  },
  computed: {
    ...mapGetters([
      'returnCloudTechnology',
      'returnCloudRecommendations',
      'getCloudActiveProfileErrors',
      'getCloudActiveProfileGeneralErrors',
      'loadingTableStatus',
      'returnCloudRecommendationsLastUpdate',
    ]),
    showProfileErrors() {
      const number = Number(this.getCloudActiveProfileErrors) > 1 ? 2 : 1

      if (number > 1) {
        return this.$i18n.t('views.cloud.moreErrActiveProfile', {
          n: this.getCloudActiveProfileErrors,
        })
      } else {
        return this.$i18n.t('views.cloud.oneErrActiveProfile', {
          n: this.getCloudActiveProfileErrors,
        })
      }
    },
    showGeneralErrors() {
      return this.getCloudActiveProfileGeneralErrors.length > 0
    },
  },
  beforeDestroy() {
    this.SET_CLOUD_ACTIVE_PROFILE_ERRORS('')
    this.SET_CLOUD_ACTIVE_PROFILE_GENERAL_ERRORS([])
  },
}
