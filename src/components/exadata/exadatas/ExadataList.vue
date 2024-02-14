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
        v-model="selectedExadata"
        @input="getSelectedExadata(selectedExadata)"
      >
        <b-tab-item
          v-for="data in showExadataList"
          :value="data['rackID']"
          :label="data['hostname']"
          :key="data['rackID']"
          style="margin-top: -20px"
        >
          <BoxContent
            :title="`${data['hostname']} - ${data['rackID']}`"
            border
            :key="`${data['rackID']}`"
            customStyle="padding: 5px 0.5rem"
            customStyleTitle="margin-bottom: 0"
            hasHighlight
            hasShadow
            :mbottom="false"
          >
            <span
              slot="customTitle"
              v-html="
                highlight(
                  showSelectedExadata(exadataSearchTherm)['machineType']
                )
              "
            />
            <span
              slot="customSubTitle"
              class="is-flex is-justify-content-flex-end is-size-6 py-2 pr-1"
            >
              last update:
              <b class="pl-2">{{
                setDateTime(showSelectedExadata(exadataSearchTherm)['update'])
              }}</b>
            </span>

            <ExadataContent :data="showSelectedExadata(exadataSearchTherm)" />
          </BoxContent>
        </b-tab-item>
      </b-tabs>
    </div>

    <NoContent
      class="column is-12"
      style="height: 370px; background-color: #eeeeee"
      v-if="showExadataList.length === 0 && !loadingTableStatus"
    />
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    exadataSelected: {
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
  data() {
    return {
      selectedExadata: '',
    }
  },
  async mounted() {
    this.selectedExadata = this.exadataSelected
  },
  methods: {
    ...mapActions(['getSelectedExadata']),
    setDateTime(val) {
      return formatDateTime(val)
    },
  },
  computed: {
    ...mapGetters([
      'showExadataList',
      'showSelectedExadata',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
