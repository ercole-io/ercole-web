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

    <div class="is-flex is-justify-content-flex-end">
      <SearchInput v-model="exadataSearchTherm" class="mr-2" isLazy />
      <!-- <ExportButton url="exadata" expName="exadata" /> -->
    </div>

    <ExadataList
      :exadataSearchTherm="exadataSearchTherm"
      v-if="!layoutSwitch"
    />
    <ExadataTables
      :exadataSearchTherm="exadataSearchTherm"
      v-if="layoutSwitch"
    />
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ExadataTables from '@/components/exadata/exadatas/ExadataTables.vue'
import ExadataList from '@/components/exadata/exadatas/ExadataList.vue'
import SearchInput from '@/components/common/SearchInput.vue'

export default {
  name: 'engineered-page',
  components: {
    ExadataTables,
    ExadataList,
    SearchInput,
  },
  data() {
    return {
      layoutSwitch: false,
      exadataSearchTherm: '',
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
