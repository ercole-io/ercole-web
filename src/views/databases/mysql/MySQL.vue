<template>
  <MySqlDbs v-if="isMounted" />
</template>

<script>
import { mapActions } from 'vuex'
import MySqlDbs from '@/components/databases/mysql/MySqlDbs.vue'

export default {
  components: {
    MySqlDbs,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getMysqlDbs()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getMysqlDbs']),
  },
}
</script>

<style lang="scss" scoped></style>
