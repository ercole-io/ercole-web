<template>
  <MongoDbDbs />
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import MongoDbDbs from '@/components/databases/mongodb/MongoDbDbs.vue'

export default {
  name: 'mongodb-databases-page',
  components: {
    MongoDbDbs,
  },
  async beforeMount() {
    await this.getMOngoDbDbs().then(() => {
      bus.$emit('data', this.getAllMongoDbDbs)
    })
  },

  methods: {
    ...mapActions(['getMOngoDbDbs']),
  },
  computed: {
    ...mapGetters(['getAllMongoDbDbs']),
  },
}
</script>

<style lang="scss" scoped></style>
