<template>
  <Repositories v-if="isMounted" />
</template>

<script>
import { mapActions } from 'vuex'
import Repositories from '@/components/repository/Repositories.vue'

export default {
  components: {
    Repositories
  },
  data() {
    return {
      isMounted: false
    }
  },
  async beforeMount() {
    await this.requestRepository().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['requestRepository'])
  }
}
</script>

<style lang="scss" scoped></style>
