export default {
  methods: {
    handleClickedRow(value) {
      if (value.length > 0) {
        if (value[0].alertStatus !== 'DISMISSED') {
          if (value[0].name || value[0].dbname || value[0].dbName) {
            this.$router.push({
              name: 'hosts-details',
              params: {
                hostname: value[0].hostname,
                dbname: value[0].name || value[0].dbname || value[0].dbName,
              },
            })
          } else if (!value[0].name || !value[0].dbname || !value[0].dbName) {
            this.$router.push({
              name: 'hosts-details',
              params: { hostname: value[0].hostname },
            })
          } else {
            this.$router.push({ name: '404' })
          }
        }
      } else {
        return
      }
    },
  },
}
