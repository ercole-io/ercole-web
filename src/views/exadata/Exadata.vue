<template>
  <section class="is-flex is-flex-direction-column">
    <div class="is-align-self-center">
      <b-button
        :type="isList ? 'is-primary' : 'is-white'"
        icon-pack="fas"
        icon-left="list"
        tag="router-link"
        to="/exadata/list"
        :class="{ inactiveButton: !isList }"
        class="mr-1"
      />
      <b-button
        :type="isTable ? 'is-primary' : 'is-white'"
        icon-pack="fas"
        icon-left="table-cells-large"
        tag="router-link"
        to="/exadata/table"
        :class="{ inactiveButton: !isTable }"
        class="ml-1"
      />
    </div>

    <router-view />
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

<style lang="scss" scoped>
.contentChange {
  border: 1px solid red;
}
.inactiveButton {
  border: 1px solid #ededed;
}
</style>
