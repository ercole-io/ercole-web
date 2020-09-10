export default {
  props: {
    value: {
      type: [String, Number, Array, Boolean],
      default: null
    }
  },
  methods: {
    options(val) {
      return {
        content: val !== '-' ? val : null,
        classes: ['info'],
        hideOnTargetClick: true
      }
    }
  }
}
