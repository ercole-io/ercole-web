export default {
  methods: {
    handleHostnameClick() {
      if (this.$store.getters.checkHostnameExists(this.getHostname)) {
        if (this.getDbname !== '') {
          this.$router.push({
            name: 'hosts-details',
            params: { hostname: this.getHostname, dbname: this.getDbname }
          })
        } else {
          this.$router.push({
            name: 'hosts-details',
            params: { hostname: this.getHostname }
          })
        }
      } else {
        this.$router.push({ name: '404' })
      }
    },
    handleHostnameRightClick(e) {
      e.preventDefault()
      let routeRedirect
      if (this.$store.getters.checkHostnameExists(this.getHostname)) {
        if (this.getDbname !== '') {
          routeRedirect = this.$router.resolve({
            name: 'hosts-details',
            params: { hostname: this.getHostname, dbname: this.getDbname }
          })
        } else {
          routeRedirect = this.$router.resolve({
            name: 'hosts-details',
            params: { hostname: this.getHostname }
          })
        }
      } else {
        routeRedirect = this.$router.resolve({ name: '404' })
      }

      window.open(routeRedirect.href, '_blank')
    }
  }
}
