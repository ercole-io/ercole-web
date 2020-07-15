<template>
  <b-field v-if="totalItem > perPage">
    <b-select v-model="perPage" size="is-small" @change.native="changePerPage">
      <option value="5" v-if="totalItem > 5">5 per page</option>
      <option value="10" v-if="totalItem > 10">10 per page</option>
      <option value="15" v-if="totalItem > 15">15 per page</option>
      <option value="20" v-if="totalItem > 20">20 per page</option>
      <option value="25" v-if="totalItem > 25">25 per page</option>
      <option value="50" v-if="totalItem > 50">50 per page</option>
      <option :value="totalItem">All Items</option>
    </b-select>
  </b-field>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    totalItem: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      perPage: 10
    }
  },
  methods: {
    changePerPage() {
      bus.$emit('changePerPage', Number(this.perPage))
    }
  }
}
</script>

<style lang="scss" scoped></style>
