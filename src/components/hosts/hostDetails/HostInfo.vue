<template>
  <BoxContent>
    <div class="columns">
      <div class="column">
        <Card cardTitle="General info">
          <CardList :list="getHostDetailInfo.general" />
        </Card>
      </div>
      <div class="column">
        <Card cardTitle="Agent">
          <CardList :list="getHostDetailInfo.agent" />
        </Card>
      </div>
      <div class="column">
        <Card cardTitle="Virtual">
          <CardList :list="getHostDetailInfo.virtual" />
        </Card>
      </div>
      <div class="column">
        <Card cardTitle="CPU">
          <CardList :list="getHostDetailInfo.cpu" />
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
