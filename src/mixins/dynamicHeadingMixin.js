import _ from 'lodash'

export default {
  methods: {
    getHeadKeys(heads) {
      const keys = []
      _.map(heads, val => {
        keys.push(val.sort)
      })
      return keys
    }
  }
}
