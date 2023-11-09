<template>
  <div class="block">
    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'red' ? 'is-danger' : ''"
      size="is-small"
      :class="{ 'is-clickable': setColor === 'red' }"
      @click.native="isModalActive = true && setColor === 'red'"
    />

    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'yellow' ? 'is-warning' : ''"
      size="is-small"
      :class="{ 'is-clickable': setColor === 'yellow' }"
      @click.native="isModalActive = true && setColor === 'yellow'"
    />

    <b-icon
      pack="fas"
      icon="circle"
      :type="setColor === 'green' ? 'is-primary' : ''"
      size="is-small"
      :class="{ 'is-clickable': setColor === 'green' }"
      @click.native="isModalActive = true && setColor === 'green'"
    />

    <b-modal :active.sync="isModalActive" :width="750" scroll="keep">
      <Card
        cardTitle="Migrable to Postgre"
        contentSize="1"
        contentPadding="1rem"
      >
        {{ setData.metrics }}
        <br />
        {{ setData.other }}
      </Card>
    </b-modal>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  name: 'commom-semaphore-component',
  props: {
    setColor: {
      type: String,
      default: '',
    },
    setData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    Card,
  },
  data() {
    return {
      isModalActive: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
