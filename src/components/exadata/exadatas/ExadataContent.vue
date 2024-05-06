<template>
  <BoxContent
    :title="`${data['exadata']} - ${data['_id']}`"
    border
    :key="`${data['_id']}`"
    customStyle="padding: 5px 0.5rem"
    customStyleTitle="margin-bottom: 0"
    hasHighlight
    hasShadow
    :mbottom="false"
  >
    <span slot="customTitle">{{ data['machineType'] }}</span>
    <span
      slot="customSubTitle"
      class="is-flex is-justify-content-flex-end is-size-6 py-2 pr-1"
    >
      last update:
      <b class="pl-2">{{ setDateTime(data['update']) }}</b>
    </span>

    <ExadataDismiss
      :exadata="data['exadata']"
      :rackID="data['_id']"
      slot="customSubTitle"
    />

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
      typeName="STORAGE CELLS"
      :typeData="data['storagecell']"
      :openRowAfterSearch="data['stoOpenRows']"
      v-if="data['storagecell'] && data['storagecell'].length > 0"
    />
  </BoxContent>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import ExadataProgress from '@/components/exadata/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/exadata/exadatas/ExadataTypes.vue'
import ExadataRDMA from '@/components/exadata/exadatas/ExadataRDMA.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import formatDateTime from '@/filters/formatDateTime.js'
import ExadataDismiss from '@/components/exadata/exadatas/ExadataDismiss.vue'

export default {
  name: 'exadata-content-component',
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    data: {
      type: [Object, Array],
      required: true,
    },
  },
  components: {
    ExadataProgress,
    ExadataTypes,
    ExadataRDMA,
    BoxContent,
    ExadataDismiss,
  },
  methods: {
    setDateTime(val) {
      return formatDateTime(val)
    },
  },
}
</script>

<style lang="scss" scoped></style>
