<template>
  <article class="columns mt-2 is-flex-wrap-wrap">
    <BoxContent
      :title="`${data['exadata']} - ${data['_id']}`"
      border
      v-for="data in getExadata(exadataSearchTherm)"
      :key="`${data['_id']}`"
      class="column is-6 mb-5"
      customStyle="padding: 5px 0.5rem"
      customStyleTitle="margin-bottom: 0"
      hasHighlight
      hasShadow
      :mbottom="false"
    >
      <span slot="customTitle" v-html="highlight(data['machineType'])" />
      <span
        slot="customSubTitle"
        class="is-flex is-justify-content-flex-end is-size-7 py-2 pr-1"
      >
        last update: <b>{{ setDateTime(data['update']) }}</b>
      </span>

      <ExadataContent :data="data" />
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
import formatDateTime from '@/filters/formatDateTime.js'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import NoContent from '@/components/common/NoContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import ExadataContent from '@/components/exadata/exadatas/ExadataContent.vue'

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
    ExadataContent,
  },
  methods: {
    setDateTime(val) {
      return formatDateTime(val)
    },
  },
  computed: {
    ...mapGetters(['getExadata', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
