<template>
  <Repositories />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import Repositories from '@/components/repository/Repositories.vue'

export default {
  components: {
    Repositories,
  },
  async beforeMount() {
    await this.requestRepository().then(() => {
      bus.$emit('data', this.getRepository)
    })
  },
  methods: {
    ...mapActions(['requestRepository']),
  },
  computed: {
    ...mapGetters(['getRepository', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
