<template>
  <section class="is-flex is-flex-direction-column">
    <!-- <div class="is-align-self-center">
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
    </div> -->

    <div class="is-flex is-justify-content-flex-end">
      <ExportButton
        url="exadata/export"
        text="Export Exadatas"
        expName="exadata-list"
      />
      <SearchInput
        v-model="exadataSearchTherm"
        class="mx-2"
        style="margin-left: none"
        isLazy
      />
      <!-- <ExportButton url="exadata" expName="exadata" /> -->
    </div>

    <ExadataList
      :exadataSearchTherm="exadataSearchTherm"
      :exadataSelected="exadataSelected"
      v-if="!layoutSwitch && exadataSelected"
    />
    <!-- <ExadataTables
      :exadataSearchTherm="exadataSearchTherm"
      v-if="layoutSwitch"
    /> -->
  </section>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
// import ExadataTables from '@/components/exadata/exadatas/ExadataTables.vue'
import ExadataList from '@/components/exadata/exadatas/ExadataList.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import _ from 'lodash'

export default {
  name: 'engineered-page',
  components: {
    // ExadataTables,
    ExadataList,
    SearchInput,
    ExportButton,
  },
  data() {
    return {
      layoutSwitch: false,
      exadataSearchTherm: '',
      exadataSelected: '',
    }
  },
  async beforeMount() {
    await this.getExadataList().then((res) => {
      const exadataList = _.orderBy(res.data, ['hostname'], ['asc'])
      this.exadataSelected = exadataList[0].rackID
      this.SET_EXADATA_LIST(exadataList)
      this.getSelectedExadata(exadataList[0].rackID)
    })
  },
  methods: {
    ...mapActions(['getExadataList', 'getSelectedExadata']),
    ...mapMutations(['SET_EXADATA_LIST']),
    // isLayoutSwitching() {
    //   this.layoutSwitch = !this.layoutSwitch
    // },
  },
}
</script>

<style lang="scss" scoped>
.inactiveButton {
  border: 1px solid #ededed;
}
</style>
