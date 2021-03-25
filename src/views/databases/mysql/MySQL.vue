<template>
  <MySqlDbs />
</template>

<script>
import { mapActions } from 'vuex'
import MySqlDbs from '@/components/databases/mysql/MySqlDbs.vue'

export default {
  components: {
    MySqlDbs
  },
  async beforeMount() {
    await this.getMysqlDbs()
  },
  methods: {
    ...mapActions(['getMysqlDbs'])
  }
}
</script>

<style lang="scss" scoped></style>
