<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <div class="contentChange">
          <b-button
            :type="isList ? 'is-primary' : 'is-white'"
            icon-pack="fas"
            icon-left="list"
            tag="router-link"
            to="/exadata/list"
          />
          <b-button
            :type="isTable ? 'is-primary' : 'is-white'"
            icon-pack="fas"
            icon-left="table-cells-large"
            tag="router-link"
            to="/exadata/table"
          />
        </div>

        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'exadata-page',
  data() {
    return {
      isList: true,
      isTable: false,
    }
  },
  async beforeMount() {
    if (this.$route.name === 'exadata-table') {
      this.isList = false
      this.isTable = true
    } else {
      this.isList = true
      this.isTable = false
    }

    await this.getExadataData()
  },
  methods: {
    ...mapActions(['getExadataData']),
  },
}
</script>

<style lang="scss" scoped></style>
