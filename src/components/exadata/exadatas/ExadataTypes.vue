<template>
  <section>
    <p class="subHeader mb-0">{{ typeName }}</p>
    <div class="table-container">
      <b-table
        :data="typeData"
        detailed
        detail-transition="fade"
        detail-key="hostname"
        icon-pack="fa"
        :opened-detailed="openRowAfterSearch"
        scrollable
        ref="table"
        :show-detail-icon="false"
      >
        <b-table-column
          v-if="
            typeData[0].hostType === 'IB_SWITCH' ||
            typeData[0].hostType === 'BARE_METAL'
              ? false
              : true
          "
          cell-class="toggle-details-class"
        >
          <template v-slot="props">
            <b-button
              @click="toggle(props.row)"
              type="is-ghost"
              icon-right="up-down"
              icon-pack="fa"
              size="is-small"
              style="text-decoration: none"
            />
          </template>
        </b-table-column>

        <b-table-column
          field="hostname"
          :label="typeName === 'IBSWITCH' ? 'Switch Name' : 'Hostname'"
          sortable
          cell-class="has-text-left"
        >
          <template v-slot="props">
            <a @click="toggle(props.row)">
              <p
                v-tooltip="options(props.row.hostname)"
                v-html="highlight(props.row.hostname)"
              />
            </a>
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
            label="Total Size (GiB)"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.totalSize || '-')"
                v-html="highlight(props.row.totalSize || '-')"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="totalFreeSpace"
            label="Total Free Space (GiB)"
            centered
            sortable
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.totalFreeSpace || '-')"
                v-html="highlight(props.row.totalFreeSpace || '-')"
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

        <template
          v-if="
            typeName === 'KVM' ||
            typeName === 'DOM0' ||
            typeName === 'BARE METAL'
          "
        >
          <b-table-column
            field="totalVCPU"
            :label="`VCPU ${'\n'} Total`"
            cell-class="col-separate-left"
            centered
            sortable
            header-class="break-line"
            width="1%"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.totalCPU)"
                v-html="highlight(props.row.totalCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="usedVCPU"
            :label="`VCPU ${'\n'} Used`"
            centered
            sortable
            header-class="break-line"
            width="1%"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.usedCPU)"
                v-html="highlight(props.row.usedCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="freeVCPU"
            :label="`VCPU ${'\n'} Free`"
            centered
            sortable
            header-class="break-line"
            width="1%"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.freeCPU)"
                v-html="highlight(props.row.freeCPU)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="freeVCPU"
            :label="`VCPU ${'\n'} Reserved`"
            centered
            sortable
            header-class="break-line"
            width="1%"
            v-if="typeName === 'KVM' || typeName === 'DOM0'"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.reservedCPU) || 0"
                v-html="highlight(props.row.reservedCPU) || 0"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="usageVCPU"
            :label="`VCPU ${'\n'} Usage`"
            cell-class="col-separate-right"
            centered
            sortable
            header-class="break-line"
            width="10%"
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

          <b-table-column
            field="totalRam"
            :label="`Ram Total ${'\n'} (GiB)`"
            centered
            sortable
            header-class="break-line"
            width="1%"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.memory}`)"
                v-html="highlight(`${props.row.memory}`)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="usedRam"
            :label="`Ram Used ${'\n'} (GiB)`"
            centered
            sortable
            header-class="break-line"
            width="1%"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.usedRAM}`)"
                v-html="highlight(`${props.row.usedRAM}`)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="freeRam"
            :label="`Ram Free ${'\n'} (GiB)`"
            centered
            sortable
            header-class="break-line"
            width="1%"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(`${props.row.freeRAM}`)"
                v-html="highlight(`${props.row.freeRAM}`)"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="freeVCPU"
            :label="`Ram ${'\n'} Reserved`"
            centered
            sortable
            header-class="break-line"
            width="1%"
            v-if="typeName === 'KVM' || typeName === 'DOM0'"
          >
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.reservedRAM) || 0"
                v-html="highlight(props.row.reservedRAM) || 0"
              />
            </template>
          </b-table-column>

          <b-table-column
            field="usageRam"
            :label="`Ram ${'\n'} Usage `"
            cell-class="col-separate-right"
            centered
            sortable
            header-class="break-line"
            width="10%"
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
          <b-table-column field="kernel" label="Kernel" centered sortable>
            <template v-slot="props">
              <p
                v-tooltip="options(props.row.kernel)"
                v-html="highlight(props.row.kernel)"
              />
            </template>
          </b-table-column>
        </template>

        <b-table-column
          field="model"
          label="Model"
          centered
          sortable
          header-class="model-class"
          width="300"
        >
          <template v-slot="props">
            <p
              v-tooltip="options(formatModel(props.row.model))"
              v-html="highlight(formatModel(props.row.model))"
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
import _ from 'lodash'
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
    formatModel(val) {
      const truncText = 'Oracle Corporation'
      if (val.includes(truncText)) {
        return val.split(truncText)[1]
      }
      return val
    },
    toggle(row) {
      this.$refs.table.toggleDetails(row)
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
