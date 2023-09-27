<template>
  <article>
    <div class="columns mt-3" style="margin-right: -28px">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="600"
        class="column is-2"
        v-if="loadingTableStatus"
      />
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="600"
        class="column"
        v-if="loadingTableStatus"
      />

      <b-tabs
        size="is-small"
        type="is-toggle"
        destroy-on-hide
        vertical
        animated
        expanded
        class="column is-12 vertical-tabs-scroll"
        v-if="!loadingTableStatus"
      >
        <b-tab-item
          v-for="data in getExadata(exadataSearchTherm)"
          :value="data['exadata']"
          :label="data['exadata']"
          :key="data['exadata']"
          style="margin-top: -20px"
        >
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
            <span slot="customTitle" v-html="highlight(data['machineType'])" />
            <span
              slot="customSubTitle"
              class="is-flex is-justify-content-flex-end is-size-7 py-2 pr-1"
            >
              last update: <b>{{ setDateTime(data['update']) }}</b>
            </span>

            <ExadataContent :data="data" />
          </BoxContent>
        </b-tab-item>
      </b-tabs>
    </div>

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
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import ExadataContent from '@/components/exadata/exadatas/ExadataContent.vue'

export default {
  name: 'exadata-list-component',
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    exadataSearchTherm: {
      type: String,
      default: '',
    },
  },
  components: {
    BoxContent,
    GhostLoading,
    NoContent,
    // ExportButton
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
