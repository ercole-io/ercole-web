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
          <td>
            <b-progress
              format="percent"
              :type="rowData.scope.compliance[1]"
              :value="rowData.scope.compliance[0]"
              show-value
            />
          </td>
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
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BoxContent,
    FullTable,
    TdContent,
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
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapGetters(['getLicensesCompliance'])
  }
}
</script>

<style lang="scss" scoped></style>
