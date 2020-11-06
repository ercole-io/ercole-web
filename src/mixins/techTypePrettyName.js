import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  methods: {
    getTechTypePrettyName(value) {
      let prettyTypeName = ''
      _.find(this.getAllTechnologies, t => {
        if (t.product === value) {
          prettyTypeName = t.prettyName
        }
      })
      return prettyTypeName
    }
  },
  computed: {
    ...mapGetters(['getAllTechnologies'])
  }
}
