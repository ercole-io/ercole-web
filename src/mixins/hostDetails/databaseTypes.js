import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentHostType']),
    isOracle() {
      return this.currentHostType === 'oracle'
    },
    isMysql() {
      return this.currentHostType === 'mysql'
    },
    isMicrosoft() {
      return this.currentHostType === 'microsoft'
    },
    isPostgresql() {
      return this.currentHostType === 'postgresql'
    },
    isMongodb() {
      return this.currentHostType === 'mongodb'
    },
  },
}
