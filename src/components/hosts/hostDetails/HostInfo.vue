<template>
  <section>
    <div class="columns">
      <div class="column">
        <Card cardTitle="General info">
          <CardList :list="hostInfo.general" />
        </Card>
      </div>
      <div class="column">
        <Card cardTitle="Agent">
          <CardList :list="hostInfo.agent" />
        </Card>
      </div>
      <div class="column">
        <Card cardTitle="Virtual">
          <CardList :list="hostInfo.virtual" />
        </Card>
      </div>
      <div class="column">
        <Card cardTitle="CPU">
          <CardList :list="hostInfo.cpu" />
        </Card>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '@/components/common/Card.vue'
import CardList from '@/components/common/CardList.vue'

export default {
  props: {
    hostInfo: {
      type: Object,
      required: true
    }
  },
  components: {
    Card,
    CardList
  }
}
</script>

<style lang="scss" scoped></style>
