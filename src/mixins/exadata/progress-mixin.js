import ProgressBar from '@/components/common/charts/ProgressBar.vue'

export default {
  components: {
    ProgressBar,
  },
  methods: {
    setTooltip(total, used, free, format) {
      return `Total: ${total}${format}<br>Used: ${used}${format}<br>Free: ${free}${format}`
    },
    calculatePercentageOfUsage(freeSizePercentage) {
      return 100 - freeSizePercentage
    },
  },
}
