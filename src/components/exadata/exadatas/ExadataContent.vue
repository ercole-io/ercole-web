<template>
  <div>
    <ExadataProgress
      :exadataProgress="data['progress']"
      :exadataType="data['machineType']"
    />

    <ExadataTypes
      typeName="KVM"
      :typeData="data['kvmhost']"
      :openRowAfterSearch="data['kvmOpenRows']"
      v-if="data['kvmhost'] && data['kvmhost'].length > 0"
    />

    <ExadataTypes
      typeName="DOM0"
      :typeData="data['dom0']"
      :openRowAfterSearch="data['domOpenRows']"
      v-if="data['dom0'] && data['dom0'].length > 0"
    />

    <ExadataTypes
      typeName="BARE METAL"
      :typeData="data['baremetal']"
      v-if="data['baremetal'] && data['baremetal'].length > 0"
    />
    <template v-if="data['ibswitch'].length === 0">
      <ExadataRDMA :rackID="data['_id']" :rdmaData="data['rdma']" />
    </template>

    <ExadataTypes
      typeName="IBSWITCH"
      :typeData="data['ibswitch']"
      v-if="data['ibswitch'] && data['ibswitch'].length > 0"
    />

    <ExadataTypes
      typeName="STORAGE"
      :typeData="data['storagecell']"
      :openRowAfterSearch="data['stoOpenRows']"
      v-if="data['storagecell'] && data['storagecell'].length > 0"
    />
  </div>
</template>

<script>
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import ExadataProgress from '@/components/exadata/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/exadata/exadatas/ExadataTypes.vue'
import ExadataRDMA from '@/components/exadata/exadatas/ExadataRDMA.vue'

export default {
  name: 'exadata-content-component',
  mixins: [HighlightSearchMixin],
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  components: {
    ExadataProgress,
    ExadataTypes,
    ExadataRDMA,
  },
}
</script>

<style lang="scss" scoped></style>
