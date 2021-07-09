import formatDateTime from '@/filters/formatDateTime.js'

export default {
  props: {
    value: {
      type: [String, Number, Array, Boolean],
      default: null
    }
  },
  methods: {
    options(val, type, placement) {
      return {
        content:
          val !== '-' ? (type === 'date' ? formatDateTime(val) : val) : null,
        classes: ['info'],
        hideOnTargetClick: true,
        trigger: 'hover',
        placement: placement
      }
    }
  }
}
