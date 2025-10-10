<template>
  <FullTable
    :keys="keys"
    :tableData="getLicensesScenario('COMPLIANCE')"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th sortKey="partNumber">Part Number</v-th>
      <v-th sortKey="description">Description</v-th>
      <v-th sortKey="metric">Metric</v-th>
      <v-th sortKey="available">Available (Original)</v-th>
      <v-th sortKey="availableSim">Available (Simulated)</v-th>
      <v-th sortKey="purchased">Purchased (Original)</v-th>
      <v-th sortKey="purchasedSim">Purchased (Simulated)</v-th>
      <v-th sortKey="consumed">Consumed (Original)</v-th>
      <v-th sortKey="consumedSim">Consumed (Simulated)</v-th>
      <v-th sortKey="covered">Covered (Original)</v-th>
      <v-th sortKey="coveredSim">Covered (Simulated)</v-th>
      <v-th sortKey="compliance">Compliance (Original)</v-th>
      <v-th sortKey="complianceSim">Compliance (Simulated)</v-th>
      <v-th sortKey="unlimited">ULA (Original)</v-th>
      <v-th sortKey="unlimitedSim">ULA (Simulated)</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.partNumber" />
      <TdContent :value="rowData.scope.description" />
      <TdContent :value="rowData.scope.metric" />
      <TdContent :value="rowData.scope.available" class="original-col" />
      <TdContent :value="rowData.scope.availableSim" class="simulated-col" />
      <TdContent :value="rowData.scope.purchased" class="original-col" />
      <TdContent :value="rowData.scope.purchasedSim" class="simulated-col" />
      <TdContent :value="rowData.scope.consumed" class="original-col" />
      <TdContent :value="rowData.scope.consumedSim" class="simulated-col" />
      <TdContent :value="rowData.scope.covered" class="original-col" />
      <TdContent :value="rowData.scope.coveredSim" class="simulated-col" />
      <TdContent :value="roundPerc(rowData.scope.compliance)" isSlot>
        <span
          v-if="rowData.scope.compliance === 0"
          class="zero-progress-danger"
        >
          {{ rowData.scope.compliance }}%
        </span>
        <b-progress
          :value="rowData.scope.compliance"
          :type="rowData.scope.complianceStroke"
          show-value
          format="percent"
          v-else
        />
      </TdContent>
      <TdContent :value="roundPerc(rowData.scope.complianceSim)" isSlot>
        <span
          v-if="rowData.scope.complianceSim === 0"
          class="zero-progress-danger"
        >
          {{ rowData.scope.complianceSim }}%
        </span>
        <b-progress
          :value="rowData.scope.complianceSim"
          :type="rowData.scope.complianceSimStroke"
          show-value
          format="percent"
          v-else
        />
      </TdContent>
      <TDIcon :value="rowData.scope.unlimited" />
      <TDIcon :value="rowData.scope.unlimitedSim" />
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TDIcon from '@/components/common/Table/TDIcon.vue'

export default {
  name: 'ScenariosDetailsLicensesCompliance',
  components: {
    FullTable,
    TdContent,
    TDIcon,
  },
  data() {
    return {
      keys: [
        'partNumber',
        'description',
        'metric',
        'available',
        'availableSim',
        'purchased',
        'purchasedSim',
        'consumed',
        'consumedSim',
        'covered',
        'coveredSim',
        'compliance',
        'complianceSim',
        'unlimited',
        'unlimitedSim',
      ],
    }
  },
  async beforeMount() {
    await this.fetchScenarioLicenses({
      id: this.$route.params.id,
      type: 'COMPLIANCE',
    })
  },
  methods: {
    ...mapActions(['fetchScenarioLicenses']),
    roundPerc(value) {
      return `${_.round(value, 2)}%`
    },
  },
  computed: {
    ...mapGetters(['getLicensesScenario', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.zero-progress-danger {
  width: 100%;
  height: 16px;
  background-color: #f14668;
  opacity: 1;
  border-radius: 10px;
  display: block;
  color: white;
}
</style>
