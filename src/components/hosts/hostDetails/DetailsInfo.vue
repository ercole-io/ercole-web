<template>
  <div class="columns">
    <template v-if="loadingTableStatus">
      <div class="column is-one-fifth" v-for="i in 5" :key="i">
        <GhostLoading :isLoading="loadingTableStatus" setHeight="180" />
      </div>
    </template>

    <template v-if="!loadingTableStatus">
      <div
        class="column is-one-fifth"
        v-for="(info, i) in currentHostInfo"
        :key="i"
      >
        <Card :cardTitle="info.name">
          <CardList :list="info.data" />
        </Card>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/common/Card.vue'
import CardList from '@/components/common/CardList.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-detailsinfo-component',
  components: {
    Card,
    CardList,
    GhostLoading,
  },
  computed: {
    ...mapGetters(['currentHostInfo', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
