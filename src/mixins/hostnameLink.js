export default {
  methods: {
    handleHostnameClick(value) {
      if (this.$store.getters.checkHostnameExists(value)) {
        this.$router.push({
          name: 'hosts-details',
          params: { hostname: value }
        })
      } else {
        this.$router.push({ name: '404' })
      }
    }
  }
}
