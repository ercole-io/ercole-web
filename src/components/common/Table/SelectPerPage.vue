<template>
  <b-field v-if="totalItems > 5">
    <b-select v-model="perPage" size="is-small" @change.native="changePerPage">
      <option value="5" v-if="totalItems > 5">5 per page</option>
      <option value="10" v-if="totalItems > 10">10 per page</option>
      <option value="15" v-if="totalItems > 15">15 per page</option>
      <option value="20" v-if="totalItems > 20">20 per page</option>
      <option value="25" v-if="totalItems > 25">25 per page</option>
      <option value="50" v-if="totalItems > 50">50 per page</option>
      <option :value="totalItems">All Data - {{ totalItems }}</option>
    </b-select>
  </b-field>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    totalItems: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      perPage: Number(localStorage.getItem('perPage')) || 20
    }
  },
  beforeMount() {
    if (this.totalItems < this.perPage) {
      this.perPage = this.totalItems
    }
  },
  beforeUpdate() {
    const newPerPage = Number(localStorage.getItem('perPage'))
    if (this.perPage < 5) {
      this.perPage = newPerPage
      localStorage.setItem('perPage', this.perPage)
    }

    if (this.totalItems < this.perPage) {
      this.perPage = this.totalItems
    }
  },
  methods: {
    changePerPage() {
      if (this.totalItems > this.perPage) {
        localStorage.setItem('perPage', this.perPage)
      }
      bus.$emit('changePerPage', Number(this.perPage))
    }
  }
}
</script>

<style lang="scss" scoped></style>
