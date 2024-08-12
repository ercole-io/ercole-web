import ProgressBar from '@/components/common/charts/ProgressBar.vue'

export default {
  components: {
    ProgressBar,
  },
  methods: {
    setTooltip(total, used, free, format, reserved = null) {
      if (reserved !== null) {
        return `Total: ${total}${format}<br>Used: ${used}${format}<br>Free: ${free}${format}<br>Reserved: ${reserved}${format}`
      }
      return `Total: ${total}${format}<br>Used: ${used}${format}<br>Free: ${free}${format}`
    },
  },
}
