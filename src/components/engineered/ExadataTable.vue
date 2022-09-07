<template>
  <article>
    <section class="columns mb-0">
      <div class="column is-6">
        <b-progress
          format="percent"
          type="is-warning"
          :value="calcValues(data.totalRam, data.totalFreeRam)"
          show-value
        />
      </div>
      <div class="column is-6">
        <b-progress
          format="percent"
          type="is-warning"
          :value="calcValues(data.totalVCPU, data.totalFreeVCPU)"
          show-value
        />
      </div>
    </section>
    <section>
      <p class="subHeader mb-0">DB Servers</p>
      <div class="table-container">
        <b-table
          :data="data.dbServers"
          detailed
          detail-transition="fade"
          detail-key="hostname"
          :show-detail-icon="true"
          :opened-detailed="defaultOpenedDetails"
        >
          <b-table-column
            field="hostname"
            label="Hostname"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.hostname }}
          </b-table-column>

          <b-table-column field="totalRam" label="Ram Usage" centered sortable>
            <template v-slot="props">
              <b-progress
                format="percent"
                type="is-warning"
                :value="calcValues(props.row.totalRam, props.row.totalFreeRam)"
                show-value
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
              <b-progress
                format="percent"
                type="is-warning"
                :value="
                  calcValues(props.row.totalVCPU, props.row.totalFreeVCPU)
                "
                show-value
              />
            </template>
          </b-table-column>

          <b-table-column
            field="model"
            label="Model"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.model }}
          </b-table-column>

          <b-table-column
            field="swVersion"
            label="Version"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.swVersion }}
          </b-table-column>

          <template #detail="props">
            <b-table :data="props.row.vms">
              <b-table-column
                field="hostname"
                label="Hostname"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.hostname }}
              </b-table-column>

              <b-table-column
                field="ram"
                label="Ram"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.ram }}
              </b-table-column>

              <b-table-column
                field="vcpu"
                label="VCPU"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.vcpu }}
              </b-table-column>
            </b-table>
          </template>
        </b-table>
      </div>
    </section>
    <section>
      <p class="subHeader mb-0">IBSwitch</p>
      <div class="table-container">
        <b-table
          :data="data.ibSwitches"
          detailed
          detail-transition="fade"
          detail-key="hostname"
          :show-detail-icon="true"
          :opened-detailed="defaultOpenedDetails"
          @details-open="(row) => closeAllOtherDetails(row)"
        >
          <b-table-column
            field="hostname"
            label="Hostname"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.hostname }}
          </b-table-column>

          <b-table-column field="totalRam" label="Ram Usage" centered sortable>
            <template v-slot="props">
              <b-progress
                format="percent"
                type="is-warning"
                :value="calcValues(props.row.totalRam, props.row.totalFreeRam)"
                show-value
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
              <b-progress
                format="percent"
                type="is-warning"
                :value="
                  calcValues(props.row.totalVCPU, props.row.totalFreeVCPU)
                "
                show-value
              />
            </template>
          </b-table-column>

          <b-table-column
            field="model"
            label="Model"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.model }}
          </b-table-column>

          <b-table-column
            field="swVersion"
            label="Version"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.swVersion }}
          </b-table-column>

          <template #detail="props">
            <b-table :data="props.row.vms">
              <b-table-column
                field="hostname"
                label="Hostname"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.hostname }}
              </b-table-column>

              <b-table-column
                field="ram"
                label="Ram"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.ram }}
              </b-table-column>

              <b-table-column
                field="vcpu"
                label="VCPU"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.vcpu }}
              </b-table-column>
            </b-table>
          </template>
        </b-table>
      </div>
    </section>
    <section>
      <p class="subHeader mb-0">Storage</p>
      <div class="table-container">
        <b-table
          :data="data.storageServers"
          detailed
          detail-transition="fade"
          detail-key="hostname"
          :show-detail-icon="true"
          :opened-detailed="defaultOpenedDetails"
          @details-open="(row) => closeAllOtherDetails(row)"
        >
          <b-table-column
            field="hostname"
            label="Hostname"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.hostname }}
          </b-table-column>

          <b-table-column field="totalRam" label="Ram Usage" centered sortable>
            <template v-slot="props">
              <b-progress
                format="percent"
                type="is-warning"
                :value="calcValues(props.row.totalRam, props.row.totalFreeRam)"
                show-value
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
              <b-progress
                format="percent"
                type="is-warning"
                :value="
                  calcValues(props.row.totalVCPU, props.row.totalFreeVCPU)
                "
                show-value
              />
            </template>
          </b-table-column>

          <b-table-column
            field="model"
            label="Model"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.model }}
          </b-table-column>

          <b-table-column
            field="swVersion"
            label="Version"
            centered
            sortable
            v-slot="props"
          >
            {{ props.row.swVersion }}
          </b-table-column>

          <template #detail="props">
            <b-table :data="props.row.vms">
              <b-table-column
                field="hostname"
                label="Hostname"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.hostname }}
              </b-table-column>

              <b-table-column
                field="ram"
                label="Ram"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.ram }}
              </b-table-column>

              <b-table-column
                field="vcpu"
                label="VCPU"
                centered
                sortable
                v-slot="props"
              >
                {{ props.row.vcpu }}
              </b-table-column>
            </b-table>
          </template>
        </b-table>
      </div>
    </section>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    data: {
      type: Object,
      default: () => [],
    },
  },
  data() {
    return {
      defaultOpenedDetails: ['exaerc01a', 'exaerc01b'],
    }
  },
  methods: {
    setTooltip(total, free, format) {
      return `Total: ${total}${format}<br>Free: ${free}${format}`
    },
    calcValues(total, free) {
      return (free / total) * 100
    },
    closeAllOtherDetails(row) {
      this.defaultOpenedDetails = [row.hostname]
    },
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
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
