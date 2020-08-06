import { bus } from '../helpers/eventBus.js'

export default {
  data() {
    return {
      title: ''
    }
  },
  created() {
    bus.$on('dynamicTitle', value => {
      this.title = value
    })
  },
  computed: {
    dynamicTitle() {
      return this.title
    }
  },
  watch: {
    $route() {
      this.title = ''
    }
  }
}
