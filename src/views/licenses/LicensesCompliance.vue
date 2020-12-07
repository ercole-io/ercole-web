<template>
  <section>
    <BoxContent>
      <FullTable
        placeholder="Search on Licenses"
        :keys="keys"
        :tableData="getLicensesCompliance"
        :clickedRow="() => []"
      >
        <template slot="headData">
          <v-th sortKey="partID">ID</v-th>
          <v-th sortKey="itemDescription">Description</v-th>
          <v-th sortKey="metric">Metric</v-th>
          <v-th sortKey="consumed">Consumed</v-th>
          <v-th sortKey="covered">Covered</v-th>
          <v-th sortKey="compliance">Compliance</v-th>
          <v-th sortKey="unlimited">ULA</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.partID" />
          <TdContent :value="rowData.scope.itemDescription" />
          <TdContent :value="rowData.scope.metric" />
          <TdContent :value="rowData.scope.consumed" />
          <TdContent :value="rowData.scope.covered" />
          <div class="progress has-text-centered">
            <Progress
              :radius="20"
              :value="calcCompliance(rowData.scope.compliance)"
              :strokeColor="
                showStrokeColor(calcCompliance(rowData.scope.compliance))
              "
              :transitionDuration="2000"
            />
          </div>
          <TdIcon :value="bindIcon(rowData.scope.unlimited)" />
        </template>
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import Progress from 'easy-circular-progress'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BoxContent,
    FullTable,
    TdContent,
    Progress,
    TdIcon
  },
  data() {
    return {
      keys: [
        'partID',
        'itemDescription',
        'metric',
        'consumed',
        'covered',
        'compliance',
        'unlimited'
      ]
    }
  },
  async beforeMount() {
    await this.getComplianceList()
  },
  methods: {
    ...mapActions(['getComplianceList']),
    calcCompliance(value) {
      return (value *= 100)
    },
    showStrokeColor(value) {
      return value >= 100 ? '#23d160' : '#ff3860'
    },
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapGetters(['getLicensesCompliance'])
  }
}
</script>

<style lang="scss" scoped>
.progress {
  height: 45px;
  display: flex;
  align-items: center;
  margin: 0;
  padding-top: 6px;
  justify-content: center;
}
</style>
