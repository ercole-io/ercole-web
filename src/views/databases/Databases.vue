<template>
  <DbList />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import DbList from '@/components/databases/databases/DbList.vue'

export default {
  name: 'databases-page',
  components: {
    DbList,
  },
  async beforeMount() {
    await this.getDatabases().then(() => {
      bus.$emit('data', this.getAllDatabases)
    })
  },
  methods: {
    ...mapActions(['getDatabases']),
  },
  computed: {
    ...mapGetters(['getAllDatabases']),
  },
}
</script>

<style lang="scss" scoped></style>
