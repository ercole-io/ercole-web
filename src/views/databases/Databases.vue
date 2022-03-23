<template>
  <DbList />
</template>

<script>
import { mapActions } from 'vuex'
import DbList from '@/components/databases/databases/DbList.vue'

export default {
  components: {
    DbList,
  },
  async beforeMount() {
    await this.getDatabases()
  },
  methods: {
    ...mapActions(['getDatabases']),
  },
}
</script>

<style lang="scss" scoped></style>
