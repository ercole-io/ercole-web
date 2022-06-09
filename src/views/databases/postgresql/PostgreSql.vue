<template>
  <PostgreSqlDbs />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import PostgreSqlDbs from '@/components/databases/postgresql/PostgreSqlDbs.vue'

export default {
  components: {
    PostgreSqlDbs,
  },
  async beforeMount() {
    await this.getPostgreSqlDbs().then(() => {
      bus.$emit('data', this.getAllPostgreSqlDbs)
    })
  },

  methods: {
    ...mapActions(['getPostgreSqlDbs']),
  },
  computed: {
    ...mapGetters(['getAllPostgreSqlDbs']),
  },
}
</script>

<style lang="scss" scoped></style>
