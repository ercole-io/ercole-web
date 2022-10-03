<template>
  <div>Roles</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async beforeMount() {
    await this.getRoles()
  },
  methods: {
    ...mapActions(['getRoles']),
  },
}
</script>

<style lang="scss" scoped></style>
