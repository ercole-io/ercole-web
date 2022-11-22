import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      apiServiceLoading: false,
    }
  },
  methods: {
    ...mapActions(['saveSettings']),
    submitSettings() {
      const data = {
        APIService: this.APIService,
        AlertService: this.AlertService,
        ChartService: this.ChartService,
        DataService: this.DataService,
        ResourceFilePath: this.ResourceFilePath,
        ThunderService: this.ThunderService,
      }
      this.saveSettings(data).then(() => {
        this.apiServiceLoading = false
      })
    },
    resetAllSettings() {
      console.log('resetAll')
      bus.$emit('resetAllSettings')
    },
  },
  computed: {
    ...mapState(['settings']),
    trueOrFalseOptions() {
      return [
        {
          text: this.$i18n.t('common.forms.yes'),
          val: true,
        },
        {
          text: this.$i18n.t('common.forms.no'),
          val: false,
        },
      ]
    },
  },
}
