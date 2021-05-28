<template>
  <FullTable
    placeholder="Search on Oracle Agreements"
    :keys="keys"
    :tableData="returnLicensesAgreement('oracle')"
    :clickedRow="() => []"
  >
    <template slot="headData">
      <th colspan="3" style="text-align: center !important;">Actions</th>
      <v-th sortKey="agreementID">Agreement Number</v-th>
      <v-th sortKey="licenseTypeID">Part Number</v-th>
      <v-th sortKey="itemDescription">Description</v-th>
      <v-th sortKey="metric">Metric</v-th>
      <v-th sortKey="csi">CSI</v-th>
      <v-th sortKey="referenceNumber" v-if="toggleReferenceNumber"
        >Reference Number</v-th
      >
      <v-th sortKey="unlimited">ULA</v-th>
      <v-th sortKey="licensesCount">Licenses Core</v-th>
      <v-th sortKey="usersCount">Licenses User</v-th>
      <v-th sortKey="availableCount">Number Available</v-th>
      <v-th sortKey="catchAll">Basket</v-th>
      <v-th sortKey="restricted">Restricted</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td style="min-width: 0;">
        <b-icon
          v-tooltip="options('Show Hosts')"
          type="is-link"
          class="hosts-icon"
          pack="fas"
          icon="server"
          @click.native="openModal(rowData.scope)"
          v-if="rowData.scope.hosts.length > 0"
        />
        <span v-else>-</span>
      </td>
      <td style="min-width: 0;">
        <b-icon
          v-tooltip="options('Edit License')"
          type="is-info"
          class="edit-icon"
          pack="fas"
          icon="edit"
          @click.native="editAgreement(rowData.scope)"
        />
      </td>
      <td style="min-width: 0;">
        <b-icon
          v-tooltip="options('Delete License')"
          type="is-danger"
          class="delete-icon"
          pack="fas"
          icon="trash-alt"
          @click.native="
            deleteAgreement(
              'oracle',
              rowData.scope.id,
              rowData.scope.agreementID
            )
          "
        />
      </td>
      <TdContent :value="rowData.scope.agreementID" />
      <TdContent :value="rowData.scope.licenseTypeID" />
      <TdContent
        :value="rowData.scope.itemDescription"
        style="max-width: 250px"
      />
      <TdContent :value="rowData.scope.metric" />
      <TdContent :value="rowData.scope.csi" />
      <TdContent
        :value="rowData.scope.referenceNumber"
        v-if="toggleReferenceNumber"
      />
      <TdIcon :value="rowData.scope.unlimited" />
      <TdContent :value="rowData.scope.licensesCount" />
      <TdContent :value="rowData.scope.usersCount" />
      <TdContent :value="rowData.scope.availableCount" />
      <TdIcon :value="rowData.scope.catchAll" />
      <TdIcon :value="rowData.scope.restricted" />
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import OracleAssociatedModal from '@/components/licenses/agreement/Oracle/OracleAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  mixins: [TooltipMixin, LicensesAgreementMixin],
  components: {
    FullTable,
    TdContent,
    TdIcon
  },
  data() {
    return {
      keys: [
        'agreementID',
        'licenseTypeID',
        'itemDescription',
        'metric',
        'csi',
        'referenceNumber',
        'unlimited',
        'licensesCount',
        'usersCount',
        'availableCount',
        'catchAll',
        'restricted'
      ]
    }
  },
  methods: {
    editAgreement(data) {
      bus.$emit('editAgreementOracle', data)
    },
    openModal(data) {
      this.$buefy.modal.open({
        component: OracleAssociatedModal,
        hasModalCard: true,
        props: {
          data: data
        }
      })
    }
  },
  computed: {
    toggleReferenceNumber() {
      return _.some(this.returnLicensesAgreement('oracle'), 'referenceNumber')
    }
  }
}
</script>

<style lang="scss" scoped></style>
