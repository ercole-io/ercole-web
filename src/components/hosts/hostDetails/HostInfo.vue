<template>
  <BoxContent>
    <div class="columns">
      <div class="column" v-for="(info, i) in getHostDetailInfo" :key="i">
        <Card :cardTitle="info.name">
          <CardList :list="info.data" />
        </Card>
      </div>
    </div>
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from '@/components/common/Card.vue'
import CardList from '@/components/common/CardList.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    Card,
    CardList,
    BoxContent
  },
  computed: {
    ...mapGetters(['getHostDetailInfo'])
  }
}
</script>

<style lang="scss" scoped></style>
