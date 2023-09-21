<template>
  <article class="columns mt-2 is-flex-wrap-wrap">
    <BoxContent
      :title="`${data['exadata']} - ${data['_id']}`"
      border
      v-for="data in getExadata(exadataSearchTherm)"
      :key="`${data['_id']}`"
      class="column is-6 mb-5"
      customStyle="padding: 0 0.5rem"
      hasHighlight
      hasShadow
      :mbottom="false"
    >
      <span slot="customTitle" v-html="highlight(data['machineType'])" />

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
        <p class="subHeader">RDMA over Converged Ethernet (RoCE)</p>
        <span />
        <span />
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
    </BoxContent>

    <NoContent
      class="column is-12"
      style="height: 370px; background-color: #eeeeee"
      v-if="getExadata(exadataSearchTherm).length === 0 && !loadingTableStatus"
    />
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import NoContent from '@/components/common/NoContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import ExadataProgress from '@/components/exadata/exadatas/ExadataProgress.vue'
import ExadataTypes from '@/components/exadata/exadatas/ExadataTypes.vue'

export default {
  name: 'exadata-tables-component',
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    exadataSearchTherm: {
      type: String,
      default: '',
    },
  },
  components: {
    BoxContent,
    NoContent,
    // ExportButton,
    ExadataProgress,
    ExadataTypes,
  },
  computed: {
    ...mapGetters(['getExadata', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.subHeader {
  border: none;
  background-color: $light-primary;
  padding: 0.2em 0.75em;
  font-size: 12px;
  font-weight: 900;
  margin: 2px 0 0 0 !important;

  & + span {
    display: block;
    width: 100%;
    height: 30px;
    background-color: #101336;

    & + span {
      display: block;
      width: 100%;
      height: 30px;
      background-color: #fff;
    }
  }
}
</style>
