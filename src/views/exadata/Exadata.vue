<template>
  <section class="is-flex is-flex-direction-column">
    <div class="is-align-self-center">
      <b-button
        :type="!layoutSwitch ? 'is-primary' : 'is-white'"
        icon-pack="fas"
        icon-left="list"
        :class="{ inactiveButton: !layoutSwitch }"
        class="mr-1"
        @click="isLayoutSwitching"
      />
      <b-button
        :type="layoutSwitch ? 'is-primary' : 'is-white'"
        icon-pack="fas"
        icon-left="table-cells-large"
        :class="{ inactiveButton: !layoutSwitch }"
        class="ml-1"
        @click="isLayoutSwitching"
      />
    </div>

    <div class="columns">
      <div class="column is-12">
        <ExadataList v-if="!layoutSwitch" />
        <ExadataTables v-if="layoutSwitch" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ExadataTables from '@/components/exadata/exadatas/ExadataTables.vue'
import ExadataList from '@/components/exadata/exadatas/ExadataList.vue'

export default {
  name: 'engineered-page',
  components: {
    ExadataTables,
    ExadataList,
  },
  data() {
    return {
      layoutSwitch: false,
    }
  },
  async beforeMount() {
    await this.getExadataData()
  },
  methods: {
    ...mapActions(['getExadataData']),
    isLayoutSwitching() {
      this.layoutSwitch = !this.layoutSwitch
    },
  },
}
</script>

<style lang="scss" scoped>
.inactiveButton {
  border: 1px solid #ededed;
}
</style>
