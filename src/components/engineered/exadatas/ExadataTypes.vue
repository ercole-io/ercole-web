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
          <b-table v-if="props.row.vms" :data="props.row.vms">
            <b-table-column field="hostname" label="Hostname" centered sortable>
              <template v-slot="props">
                <p
                  v-tooltip.bottom="options(props.row.hostname)"
                  v-html="highlight(props.row.hostname || props.row.name)"
                />
              </template>
            </b-table-column>

            <b-table-column field="ram" label="Ram" centered sortable>
              <template v-slot="props">
                <p
                  v-tooltip.bottom="options(props.row.ramCurrent)"
                  v-html="highlight(props.row.ramCurrent)"
                />
              </template>
            </b-table-column>

            <b-table-column field="vcpu" label="VCPU" centered sortable>
              <template v-slot="props">
                <p
                  v-tooltip.bottom="options(props.row.cpuCurrent)"
                  v-html="highlight(props.row.cpuCurrent)"
                />
              </template>
            </b-table-column>
          </b-table>

          <b-table v-if="props.row.storageCells" :data="props.row.storageCells">
            <b-table-column field="hostname" label="Hostname" centered sortable>
              <template v-slot="props">
                <p
                  v-tooltip.bottom="options(props.row.hostname)"
                  v-html="highlight(props.row.hostname || props.row.name)"
                />
              </template>
            </b-table-column>
          </b-table>
        </template>
      </b-table>
    </div>
  </section>
</template>

<script>
import tooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'

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
  methods: {
    setTooltip(total, free, format) {
      return `Total: ${total}${format}<br>Free: ${free}${format}`
    },
    calcValues(total, free) {
      return (free / total) * 100
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
