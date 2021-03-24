import { returnTechTypePrettyName } from '@/helpers/helpers.js'

export default {
  methods: {
    getTechTypePrettyName(value) {
      return returnTechTypePrettyName(value)
    }
  }
}
