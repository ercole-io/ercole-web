<template>
  <ToggleColumns
    getPage="licensesCompliance"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <LicensesComplianceFilters slot="left" />
    <FullTable
      slot="center"
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
        <v-th sortKey="itemDescription" defaultSort="asc">
          {{ $t('common.collumns.description') }}
        </v-th>
        <v-th sortKey="metric">
          {{ $t('common.collumns.metric') }}
        </v-th>
        <v-th sortKey="available">
          {{ $t('common.collumns.licAvailable') }}
        </v-th>
        <v-th sortKey="purchased">
          {{ $t('common.collumns.purchased') }}
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
        <TdContent :value="rowData.scope.available" />
        <TdContent :value="rowData.scope.purchased" />
        <TdContent :value="rowData.scope.consumed" />
        <TdContent :value="rowData.scope.covered" />
        <TdContent :value="roundPerc(rowData.scope.compliance)" isSlot>
          <a @click="handleClickedRow([rowData.scope])">
            <b-progress
              format="percent"
              :type="rowData.scope.complianceStroke"
              :value="rowData.scope.compliance"
              show-value
            />
          </a>
        </TdContent>
        <TdIcon
          :value="rowData.scope.unlimited"
          @click.native="handleClickedRow([rowData.scope])"
        />
      </template>

      <ExportButton
        slot="export"
        url="hosts/technologies/all/databases/licenses-compliance"
        expName="licensesCompliance"
      />
    </FullTable>
  </ToggleColumns>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import LicensesComplianceFilters from '@/components/licenses/compliance/LicensesComplianceFilters.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  mixins: [paginationMixin],
  components: {
    ToggleColumns,
    FullTable,
    TdContent,
    TdIcon,
    LicensesComplianceFilters,
    ExportButton,
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
        'unlimited',
        'purchased',
        'available',
      ],
      isMounted: false,
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
            partNumber: value[0].licenseTypeID,
          },
        })
      }
    },
    roundPerc(value) {
      return `${_.round(value, 2)}%`
    },
  },
  computed: {
    ...mapGetters(['getLicensesCompliance']),
  },
}
</script>

<style lang="scss" scoped></style>
