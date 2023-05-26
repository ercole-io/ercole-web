<template>
  <section>
    <p class="subHeader mb-0">{{ typeName }}</p>
    <div class="table-container">
      <b-table
        :data="typeData"
        detailed
        detail-transition="fade"
        detail-key="hostname"
        :show-detail-icon="
          typeData[0].hostType === 'IBSWITCH' ||
          typeData[0].hostType === 'BARE_METAL'
            ? false
            : true
        "
        icon-pack="fa"
        :opened-detailed="openRowAfterSearch"
        scrollable
      >
        <b-table-column field="hostname" label="Hostname" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.hostname)"
              v-html="highlight(props.row.hostname)"
            />
          </template>
        </b-table-column>

        <b-table-column field="totalRam" label="Ram Usage" centered sortable>
          <template v-slot="props">
            <b-progress
              format="percent"
              type="is-warning"
              :value="props.row.usedRAM"
              show-value
              v-tooltip.bottom="
                options(setTooltip(props.row.memory, props.row.freeRAM, 'GB'))
              "
            />
          </template>
        </b-table-column>

        <b-table-column field="totalVCPU" label="VCPU Usage" centered sortable>
          <template v-slot="props">
            <b-progress
              format="percent"
              type="is-warning"
              :value="props.row.usedCPU"
              show-value
              v-tooltip.bottom="
                options(setTooltip(props.row.totalCPU, props.row.freeCPU, 'GB'))
              "
            />
          </template>
        </b-table-column>

        <b-table-column field="model" label="Model" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.model)"
              v-html="highlight(props.row.model)"
            />
          </template>
        </b-table-column>

        <b-table-column field="swVersion" label="Version" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip.bottom="options(props.row.swVersion)"
              v-html="highlight(props.row.swVersion)"
            />
          </template>
        </b-table-column>

        <template #detail="props">
          <ExadataTypesVms v-if="props.row.vms" :data="props.row.vms" />

          <ExadataTypesStorage
            v-if="props.row.storageCells"
            :data="props.row.storageCells"
          />
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import ExadataTypesVms from '@/components/engineered/exadatas/ExadataTypesVms.vue'
import ExadataTypesStorage from '@/components/engineered/exadatas/ExadataTypesStorage.vue'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin],
  props: {
    typeName: {
      type: String,
      required: true,
    },
    typeData: {
      type: Array,
      default: () => [],
    },
    openRowAfterSearch: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ExadataTypesVms,
    ExadataTypesStorage,
  },
  methods: {
    setTooltip(total, free, format) {
      return `Total: ${total}${format}<br>Free: ${free}${format}`
    },
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
}
</style>
