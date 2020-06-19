<template>
  <b-field>
    <b-select
      v-model="perPage"
      size="is-small"
      @change.native="$emit('changePerPage', perPage)"
    >
      <option value="5" v-if="totalItem > 5">5 per page</option>
      <option value="10" v-if="totalItem > 10">10 per page</option>
      <option value="15" v-if="totalItem > 15">15 per page</option>
      <option value="20" v-if="totalItem > 20">20 per page</option>
      <option value="25" v-if="totalItem > 25">25 per page</option>
      <option value="50" v-if="totalItem > 50">50 per page</option>
      <option :value="totalItem">All Hosts</option>
    </b-select>
  </b-field>
</template>

<script>
export default {
  props: ['pageQty', 'totalItem'],
  data() {
    return {
      perPage: this.pageQty
    }
  }
}
</script>

<style lang="scss" scoped></style>
