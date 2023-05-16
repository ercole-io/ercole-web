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
      >
        <b-table-column field="hostname" label="Hostname" centered sortable>
          <template v-slot="props">
            <p v-tooltip.bottom="options(props.row.hostname)">
              {{ props.row.hostname }}
            </p>
          </template>
        </b-table-column>

        <b-table-column field="totalRam" label="Ram Usage" centered sortable>
          <template v-slot="props">
            <b-progress
              format="percent"
              type="is-warning"
              :value="calcValues(props.row.totalRam, props.row.totalFreeRam)"
              show-value
              v-tooltip.bottom="
                options(
                  setTooltip(props.row.totalRam, props.row.totalFreeRam, 'GB')
                )
              "
            />
          </template>
        </b-table-column>

        <b-table-column field="totalVCPU" label="VCPU Usage" centered sortable>
          <template v-slot="props">
            <b-progress
              format="percent"
              type="is-warning"
              :value="calcValues(props.row.totalVCPU, props.row.totalFreeVCPU)"
              show-value
              v-tooltip.bottom="
                options(
                  setTooltip(props.row.totalVCPU, props.row.totalFreeVCPU, 'GB')
                )
              "
            />
          </template>
        </b-table-column>

        <b-table-column field="model" label="Model" centered sortable>
          <template v-slot="props">
            <p v-tooltip.bottom="options(props.row.model)">
              {{ props.row.model }}
            </p>
          </template>
        </b-table-column>

        <b-table-column field="swVersion" label="Version" centered sortable>
          <template v-slot="props">
            <p v-tooltip.bottom="options(props.row.swVersion)">
              {{ props.row.swVersion }}
            </p>
          </template>
        </b-table-column>

        <template #detail="props">
          <b-table :data="props.row.vms || props.row.storageCells">
            <b-table-column field="hostname" label="Hostname" centered sortable>
              <template v-slot="props">
                <p v-tooltip.bottom="options(props.row.hostname)">
                  {{ props.row.hostname || props.row.name }}
                </p>
              </template>
            </b-table-column>

            <b-table-column field="ram" label="Ram" centered sortable>
              <template v-slot="props">
                <p v-tooltip.bottom="options(props.row.ram)">
                  {{ props.row.ram }}
                </p>
              </template>
            </b-table-column>

            <b-table-column field="vcpu" label="VCPU" centered sortable>
              <template v-slot="props">
                <p v-tooltip.bottom="options(props.row.vcpu)">
                  {{ props.row.vcpu }}
                </p>
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

export default {
  mixins: [tooltipMixin],
  props: {
    typeName: {
      type: String,
      required: true,
    },
    typeData: {
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
