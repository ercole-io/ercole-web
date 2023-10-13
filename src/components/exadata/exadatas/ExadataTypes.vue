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
          typeData[0].hostType === 'IB_SWITCH' ||
          typeData[0].hostType === 'BARE_METAL'
            ? false
            : true
        "
        icon-pack="fa"
        :opened-detailed="openRowAfterSearch"
        scrollable
      >
        <b-table-column
          field="hostname"
          :label="typeName === 'IBSWITCH' ? 'Switch Name' : 'Hostname'"
          centered
          sortable
        >
          <template v-slot="props">
            <p
              v-tooltip="options(props.row.hostname)"
              v-html="highlight(props.row.hostname)"
            />
          </template>
        </b-table-column>

        <template v-if="typeName === 'STORAGE'">
          <b-table-column
            field="cpuEnabled"
            label="Enabled CPU"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.cpuEnabled)"
                v-html="highlight(props.row.cpuEnabled)"
              />
            </template>
          </b-table-column>

          <b-table-column field="totalCPU" label="Total CPU" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.totalCPU)"
                v-html="highlight(props.row.totalCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="freeSpace"
            label="Free Space %"
            centered
            sortable
          >
            <template v-slot="props">
              <ProgressBar
                :progressValue="props.row.freeSizePercentage"
                :progressTooltip="`${props.row.freeSizePercentage}%`"
              />
            </template>
          </b-table-column>
        </template>

        <template v-if="typeName === 'KVM' || typeName === 'DOM0'">
          <b-table-column
            field="totalVCPU"
            label="VCPU Usage"
            centered
            sortable
          >
            <template v-slot="props">
              <ProgressBar
                :progressMaxValue="props.row.totalCPU"
                :progressValue="props.row.usedCPU"
                :progressTooltip="
                  setTooltip(
                    props.row.totalCPU,
                    props.row.usedCPU,
                    props.row.freeCPU,
                    ''
                  )
                "
              />
            </template>
          </b-table-column>

          <b-table-column field="totalRam" label="Ram Usage" centered sortable>
            <template v-slot="props">
              <ProgressBar
                :progressMaxValue="props.row.memory"
                :progressValue="props.row.usedRAM"
                :progressTooltip="
                  setTooltip(
                    props.row.memory,
                    props.row.usedRAM,
                    props.row.freeRAM,
                    ' GB'
                  )
                "
              />
            </template>
          </b-table-column>
        </template>

        <template v-if="typeName === 'BARE METAL'">
          <b-table-column field="memory" label="Ram Usage" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.memory} GB`)"
                v-html="highlight(`${props.row.memory} GB`)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="totalVCPU"
            label="VCPU Usage"
            centered
            sortable
          >
            <template v-slot="props">
              <ProgressBar
                :progressMaxValue="props.row.totalCPU"
                :progressValue="props.row.cpuEnabled"
                :progressTooltip="
                  setTooltip(
                    props.row.totalCPU,
                    props.row.cpuEnabled,
                    props.row.totalCPU - props.row.cpuEnabled,
                    ''
                  )
                "
              />
            </template>
          </b-table-column>

          <b-table-column field="kernel" label="Kernel" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.kernel)"
                v-html="highlight(props.row.kernel)"
              />
            </template>
          </b-table-column>
        </template>

        <b-table-column field="model" label="Model" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip="options(props.row.model)"
              v-html="highlight(props.row.model)"
            />
          </template>
        </b-table-column>

        <template v-if="typeName === 'IBSWITCH'">
          <b-table-column field="swVersion" label="Version" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.swVersion)"
                v-html="highlight(props.row.swVersion)"
              />
            </template>
          </b-table-column>
        </template>

        <template v-else>
          <b-table-column
            field="imageVersion"
            label="Version"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.imageVersion)"
                v-html="highlight(props.row.imageVersion)"
              />
            </template>
          </b-table-column>
        </template>

        <b-table-column field="hostID" label="Host ID" centered sortable>
          <template v-slot="props">
            <p
              v-tooltip="options(props.row.hostID)"
              v-html="highlight(props.row.hostID) || '-'"
            />
          </template>
        </b-table-column>

        <template #detail="props">
          <ExadataTypesVms
            :type="typeName"
            v-if="props.row.vms"
            :data="props.row.vms"
          />

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
import ProgressMixin from '@/mixins/exadata/progress-mixin.js'
import ExadataTypesVms from '@/components/exadata/exadatas/ExadataTypesVms.vue'
import ExadataTypesStorage from '@/components/exadata/exadatas/ExadataTypesStorage.vue'
import { toNumber } from 'lodash'

export default {
  mixins: [tooltipMixin, HighlightSearchMixin, ProgressMixin],
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
    setTotalUsage(val, type = null) {
      const formatVal = toNumber(val.split('%')[0].slice(0, 5))

      if (type) {
        return `${formatVal}%`
      } else {
        return formatVal
      }
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
