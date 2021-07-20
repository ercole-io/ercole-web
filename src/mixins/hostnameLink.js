export default {
  methods: {
    handleHostnameClick(e) {
      e.preventDefault()
      if (e.which === 1) {
        this.resolveRoute('push', 'self')
      } else if (e.which === 2 || e.which === 3) {
        this.resolveRoute('resolve', 'blank')
      }
    },
    resolveRoute(method, place) {
      let routeRedirect
      if (this.$store.getters.checkHostnameExists(this.getHostname)) {
        if (this.getDbname !== '') {
          routeRedirect = this.$router[method]({
            name: 'hosts-details',
            params: { hostname: this.getHostname, dbname: this.getDbname }
          })
        } else {
          routeRedirect = this.$router[method]({
            name: 'hosts-details',
            params: { hostname: this.getHostname }
          })
        }
      } else {
        routeRedirect = this.$router[method]({ name: '404' })
      }

      window.open(routeRedirect.href, `_${place}`)
    }
  }
}
