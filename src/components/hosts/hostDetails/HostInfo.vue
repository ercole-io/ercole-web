<template>
  <section>
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
  </section>
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
    ...mapGetters(['getHostDetailInfo'])
  }
}
</script>

<style lang="scss" scoped></style>
