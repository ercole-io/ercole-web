import i18n from '@/i18n.js'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
  },
  methods: {
    ...mapActions([
      'getCloudProfiles',
      'removeCloudProfile',
      'activateCloudProfile',
    ]),
    toggleProfile(id, selected) {
      this.$buefy.dialog.alert({
        title: 'Profile Activating/Deactivating Warning',
        type: 'is-warning',
        message:
          "<p>It's recommended to retrieve updates on the <b>Recommendations page</b> <br> after <b>Activating/Deactivating</b> a profile to get updated information!<p>",
        confirmText: i18n.t('common.general.yes'),
        cancelText: i18n.t('common.general.close'),
        canCancel: true,
        hasIcon: true,
        icon: 'alert',
        iconPack: 'mdi',
        onConfirm: () => {
          this.activateCloudProfile({
            id: id,
            isActive: selected,
          }).then(() => {
            this.getCloudProfiles()
          })
        },
      })
    },
    editProfile(profile) {
      bus.$emit('editProfile', profile)
    },
    deleteProfile(id, profile, isActive) {
      if (isActive) {
        this.$buefy.dialog.alert(this.$i18n.t('views.cloud.cannotDelete'))
      } else {
        this.$buefy.dialog.confirm({
          title: this.$i18n.t('views.cloud.deleteTitle'),
          message: this.$i18n.t('views.cloud.deleteCheck', {
            profile: profile,
          }),
          confirmText: this.$i18n.t('common.general.yes'),
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => {
            this.removeCloudProfile(id).then(() => {
              this.$buefy.toast.open({
                message: this.$i18n.t('views.cloud.deleteSuccess', {
                  profile: profile,
                }),
                type: 'is-success',
                duration: 5000,
                position: 'is-bottom',
              })
            })
          },
          cancelText: this.$i18n.t('common.general.no'),
        })
      }
    },
  },
  computed: {
    ...mapGetters(['returnCloudProfiles', 'loadingTableStatus']),
  },
}
