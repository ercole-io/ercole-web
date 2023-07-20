import _ from 'lodash'
import ProgressBar from '@/components/common/charts/ProgressBar.vue'

export default {
  components: {
    ProgressBar,
  },
  methods: {
    setTooltip(total, free, used, format) {
      return `Total: ${total}${format}<br>Used: ${used}${format}<br>Free: ${free}${format}`
    },
    calcValues(total, free) {
      return _.toNumber((free / total) * 100) || 0
    },
  },
}
