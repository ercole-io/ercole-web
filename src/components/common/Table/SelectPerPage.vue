<template>
  <b-field v-if="totalItems > 25">
    <b-select
      v-model="perPage"
      size="is-small"
      @change.native="changePerPage($event)"
    >
      <option value="25" v-if="totalItems > 25">25 {{ setPerPage }}</option>
      <option value="50" v-if="totalItems > 50">50 {{ setPerPage }}</option>
      <option value="100" v-if="totalItems > 100">100 {{ setPerPage }}</option>
      <option value="200" v-if="totalItems > 200">200 {{ setPerPage }}</option>
      <option :value="totalItems">{{ setAll }} - {{ totalItems }}</option>
    </b-select>
  </b-field>
</template>

<script>
import i18n from '@/i18n.js'
import { bus } from '@/helpers/eventBus.js'
import paginationMixin from '@/mixins/paginationMixin.js'

export default {
  name: 'commom-table-selectperpage-component',
  mixins: [paginationMixin],
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
  },
  methods: {
    changePerPage(e) {
      let eventVal = e.target.value
      bus.$emit('changePerPage', eventVal)
      localStorage.setItem('perPage', eventVal)
    },
  },
  computed: {
    setPerPage() {
      return `${i18n.t('common.table.perPage')}`
    },
    setAll() {
      return `${i18n.t('common.table.allData')}`
    },
  },
}
</script>

<style lang="scss" scoped></style>
