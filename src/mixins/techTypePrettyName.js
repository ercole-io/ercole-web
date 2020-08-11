import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  methods: {
    getTechTypePrettyName(value) {
      let prettyTypeName = ''
      _.find(this.getAllTechnologies, item => {
        if (item.product === value) {
          prettyTypeName = item.prettyName
        } else {
          prettyTypeName = value
        }
      })
      return prettyTypeName
    }
  },
  computed: {
    ...mapGetters(['getAllTechnologies'])
  }
}
