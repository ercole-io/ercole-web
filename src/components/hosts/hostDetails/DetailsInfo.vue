<template>
  <div class="columns">
    <div
      class="column is-one-fifth"
      v-for="(info, i) in currentHostInfo"
      :key="i"
    >
      <Card :cardTitle="info.name">
        <CardList :list="info.data" />
      </Card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/common/Card.vue'
import CardList from '@/components/common/CardList.vue'

export default {
  components: {
    Card,
    CardList
  },
  computed: {
    ...mapGetters(['currentHostInfo'])
  }
}
</script>

<style lang="scss" scoped></style>
