<template>
  <DbList v-if="isMounted" />
</template>

<script>
import { mapActions } from 'vuex'
import DbList from '@/components/databases/databases/DbList.vue'

export default {
  components: {
    DbList,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getDatabases()
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getDatabases']),
  },
}
</script>

<style lang="scss" scoped></style>
