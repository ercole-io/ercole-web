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

        <template v-if="typeName === 'STORAGE CELLS'">
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
            field="totalSize"
            label="Total Size"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="options(formatValue(props.row.totalSize) || '-')"
                v-html="highlight(formatValue(props.row.totalSize) || '-')"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="totalFreeSpace"
            label="Total Free Space"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="
                  options(formatValue(props.row.totalFreeSpace) || '-')
                "
                v-html="highlight(formatValue(props.row.totalFreeSpace) || '-')"
              />
            </template>
          </b-table-column>

          <b-table-column field="freeSpace" label="Usage %" centered sortable>
            <template v-slot="props">
              <ProgressBar
                :progressValue="formatPercentage(props.row.usedSizePercentage)"
                :progressTooltip="props.row.usedSizePercentage"
              />
            </template>
          </b-table-column>
        </template>

        <template v-if="typeName === 'KVM' || typeName === 'DOM0'">
          <b-table-column
            field="totalVCPU"
            label="VCPU Total"
            cell-class="col-separate-left"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.totalCPU)"
                v-html="highlight(props.row.totalCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column field="usedVCPU" label="VCPU Used" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.usedCPU)"
                v-html="highlight(props.row.usedCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column field="freeVCPU" label="VCPU Free" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.freeCPU)"
                v-html="highlight(props.row.freeCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="usageVCPU"
            label="VCPU Usage"
            cell-class="col-separate-right"
            centered
            sortable
          >
            <template v-slot="props">
              <ProgressBar
                :progressValue="formatPercentage(props.row.usedCPUPercentage)"
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

          <b-table-column field="totalRam" label="Ram Total" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.memory}`)"
                v-html="highlight(`${props.row.memory}`)"
              />
            </template>
          </b-table-column>

          <b-table-column field="usedRam" label="Ram Used" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.usedRAM}`)"
                v-html="highlight(`${props.row.usedRAM}`)"
              />
            </template>
          </b-table-column>

          <b-table-column field="freeRam" label="Ram Free" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.freeRAM}`)"
                v-html="highlight(`${props.row.freeRAM}`)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="usageRam"
            label="Ram Usage"
            cell-class="col-separate-right"
            centered
            sortable
          >
            <template v-slot="props">
              <ProgressBar
                :progressValue="formatPercentage(props.row.usedRAMPercentage)"
                :progressTooltip="
                  setTooltip(
                    props.row.memory,
                    props.row.usedRAM,
                    props.row.freeRAM,
                    ''
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
                v-tooltip="options(`${props.row.memory}`)"
                v-html="highlight(`${props.row.memory}`)"
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
                :progressValue="formatPercentage(props.row.usedCPUPercentage)"
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

        <template v-if="typeName === 'STORAGE CELLS'">
          <b-table-column
            centered
            field="clusterName"
            label="Cluster Name"
            v-slot="props"
          >
            <ExadataClusterName
              :cluster="{
                rackID: props.row.rackID,
                hostID: props.row.hostID,
                clusterNames: props.row.clusterNames,
              }"
            />
          </b-table-column>
        </template>

        <template #detail="props">
          <ExadataTypesVms
            :type="typeName"
            v-if="props.row.vms"
            :data="props.row.vms"
            :rackID="props.row.rackID"
            :hostID="props.row.hostID"
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
import ExadataClusterName from '@/components/exadata/exadatas/ExadataClusterName.vue'
import { toNumber, includes } from 'lodash'

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
    ExadataClusterName,
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
    formatValue(val) {
      const ext = val.substr(val.length - 2)
      let values
      let value

      if (includes(val, '.')) {
        values = val.split('.')
        value = values[1].slice(0, 2)
        return `${values[0]}.${value}  ${ext}`
      } else {
        values = val.slice(0, 1)
        return values == 0 ? values : `${values} ${ext}`
      }
    },
    formatPercentage(val) {
      return _.toNumber(val.split('%')[0])
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
