<template>
  <MySqlDbs />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import MySqlDbs from '@/components/databases/mysql/MySqlDbs.vue'

export default {
  name: 'mysql-databases-page',
  components: {
    MySqlDbs,
  },
  async beforeMount() {
    await this.getMysqlDbs().then(() => {
      bus.$emit('data', this.getAllMysqlDbs)
    })
  },

  methods: {
    ...mapActions(['getMysqlDbs']),
  },
  computed: {
    ...mapGetters(['getAllMysqlDbs']),
  },
}
</script>

<style lang="scss" scoped></style>
