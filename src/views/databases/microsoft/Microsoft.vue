<template>
  <MsSqlServerDbs />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import MsSqlServerDbs from '@/components/databases/microsoft/MsSqlServerDbs.vue'

export default {
  name: 'microsoft-databases-page',
  components: {
    MsSqlServerDbs,
  },
  async beforeMount() {
    await this.getMsSqlServerDbs().then(() => {
      bus.$emit('data', this.getAllMsSqlServerDbs)
    })
  },

  methods: {
    ...mapActions(['getMsSqlServerDbs']),
  },
  computed: {
    ...mapGetters(['getAllMsSqlServerDbs']),
  },
}
</script>

<style lang="scss" scoped></style>
