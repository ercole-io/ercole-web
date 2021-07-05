<template>
  <BaseLayoutColumns v-if="isMounted">
    <LicensesComplianceFilters slot="col1" />
    <FullTable
      slot="col2"
      :placeholder="$t('menu.licCompliance')"
      :keys="keys"
      :tableData="getLicensesCompliance"
      @clickedRow="handleClickedRow"
      isClickable
    >
      <template slot="headData">
        <v-th sortKey="licenseTypeID">
          {{ $t('common.collumns.partNumber') }}
        </v-th>
        <v-th sortKey="itemDescription">
          {{ $t('common.collumns.description') }}
        </v-th>
        <v-th sortKey="metric">
          {{ $t('common.collumns.metric') }}
        </v-th>
        <v-th sortKey="consumed">
          {{ $t('common.collumns.consumed') }}
        </v-th>
        <v-th sortKey="covered">
          {{ $t('common.collumns.covered') }}
        </v-th>
        <v-th sortKey="compliance">
          {{ $t('common.collumns.compliance') }}
        </v-th>
        <v-th sortKey="unlimited">
          {{ $t('common.collumns.ula') }}
        </v-th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.itemDescription" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent :value="rowData.scope.consumed" />
        <TdContent :value="rowData.scope.covered" />
        <td>
          <b-progress
            format="percent"
            :type="rowData.scope.complianceStroke"
            :value="rowData.scope.compliance"
            show-value
          />
        </td>
        <TdIcon :value="rowData.scope.unlimited" />
      </template>
    </FullTable>
  </BaseLayoutColumns>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import LicensesComplianceFilters from '@/components/licenses/compliance/LicensesComplianceFilters.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BaseLayoutColumns,
    FullTable,
    TdContent,
    TdIcon,
    LicensesComplianceFilters
  },
  data() {
    return {
      keys: [
        'licenseTypeID',
        'itemDescription',
        'metric',
        'consumed',
        'covered',
        'compliance',
        'unlimited'
      ],
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getComplianceList().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getComplianceList']),
    handleClickedRow(value) {
      if (value.length > 0) {
        this.$router.push({
          name: 'licenses-used',
          params: {
            partNumber: value[0].licenseTypeID
          }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getLicensesCompliance'])
  }
}
</script>

<style lang="scss" scoped></style>
