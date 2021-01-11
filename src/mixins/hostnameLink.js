export default {
  methods: {
    handleHostnameClick() {
      if (this.$store.getters.checkHostnameExists(this.getHostname)) {
        this.$router.push({
          name: 'hosts-details',
          params: { hostname: this.getHostname, dbname: this.getDbname }
        })
      } else {
        this.$router.push({ name: '404' })
      }
    }
  }
}
