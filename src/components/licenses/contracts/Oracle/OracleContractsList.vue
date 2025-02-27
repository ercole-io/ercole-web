<template>
  <FullTable
    :placeholder="$t('menu.licContracts')"
    :keys="keys"
    :tableData="getOracleContracts"
    :clickedRow="() => []"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th colspan="4" style="text-align: center !important">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="location"> Location </v-th>
      <v-th sortKey="contractID">
        {{ $t('common.collumns.agreeNumber') }}
      </v-th>
      <v-th sortKey="licenseTypeID">
        {{ $t('common.collumns.partNumber') }}
      </v-th>
      <v-th sortKey="itemDescription">
        {{ $t('common.collumns.description') }}
      </v-th>
      <v-th sortKey="metric">
        {{ $t('common.collumns.metric') }}
      </v-th>
      <v-th sortKey="csi">
        {{ $t('common.collumns.csi') }}
      </v-th>
      <v-th sortKey="referenceNumber" v-if="toggleReferenceNumber">
        {{ $t('common.collumns.refNumber') }}
      </v-th>
      <v-th sortKey="supportExpiration">Support Expiration</v-th>
      <v-th sortKey="status">Status</v-th>
      <v-th sortKey="productOrderDate">Product Order Date</v-th>
      <v-th sortKey="unlimited">
        {{ $t('common.collumns.ula') }}
      </v-th>
      <v-th sortKey="licensesPerCore">
        {{ $t('common.collumns.licPerCore') }}
      </v-th>
      <v-th sortKey="availableLicensesPerCore">
        {{ $t('common.collumns.avLicPerCore') }}
      </v-th>
      <v-th sortKey="licensesPerUser">
        {{ $t('common.collumns.licPerUser') }}
      </v-th>
      <v-th sortKey="availableLicensesPerUser">
        {{ $t('common.collumns.avLicPerUser') }}
      </v-th>
      <v-th sortKey="basket">
        {{ $t('common.collumns.basket') }}
      </v-th>
      <v-th sortKey="restricted">
        {{ $t('common.collumns.restricted') }}
      </v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options('Hosts')"
          type="is-custom-primary"
          class="hosts-icon"
          pack="fas"
          icon="server"
          @click.native="openModal(rowData.scope)"
          v-if="rowData.scope.hosts && rowData.scope.hosts.length > 0"
        />
        <span v-else>-</span>
      </td>
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options($t('common.general.edit'))"
          type="is-info"
          class="edit-icon"
          pack="fas"
          icon="edit"
          @click.native="editOracleContract(rowData.scope)"
        />
      </td>
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options($t('common.general.delete'))"
          type="is-danger"
          class="delete-icon"
          pack="fas"
          icon="trash-alt"
          @click.native="
            deleteContract(rowData.scope.id, rowData.scope.contractID)
          "
        />
      </td>
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options('Clone Information')"
          type="is-warning"
          class="edit-icon"
          pack="fas"
          icon="clone"
          @click.native="cloneOracleContract(rowData.scope)"
        />
      </td>
      <TdContent :value="rowData.scope.location" />
      <TdContent :value="rowData.scope.contractID" />
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
      <TdContent
        :value="rowData.scope.supportExpiration | formatDate"
        v-if="rowData.scope.supportExpiration"
      />
      <TdContent value="-" v-else />
      <TdContent :value="rowData.scope.status" />
      <TdContent
        :value="rowData.scope.productOrderDate | formatDate"
        v-if="rowData.scope.productOrderDate"
      />
      <TdContent value="-" v-else />
      <TdIcon :value="rowData.scope.unlimited" />
      <TdContent :value="rowData.scope.licensesPerCore" />
      <TdContent :value="rowData.scope.availableLicensesPerCore" />
      <TdContent :value="rowData.scope.licensesPerUser" />
      <TdContent :value="rowData.scope.availableLicensesPerUser" />
      <TdIcon :value="rowData.scope.basket" />
      <TdIcon :value="rowData.scope.restricted" />
    </template>

    <div class="is-flex" slot="export">
      <ExportButton
        url="contracts/oracle/sample"
        expName="oracleContractsSample"
        text="Download Sample"
        type="csv"
        extension="csv"
      />
      <ImportCSV contractType="oracle" />
      <ExportButton url="contracts/oracle/database" expName="oracleContracts" />
    </div>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import OracleAssociatedModal from '@/components/licenses/contracts/Oracle/OracleAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import ImportCSV from '@/components/licenses/contracts/ImportCSV.vue'

export default {
  name: 'licenses-contracts-oracle-list-component',
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    TdIcon,
    ExportButton,
    ImportCSV,
  },
  data() {
    return {
      keys: [
        'contractID',
        'licenseTypeID',
        'itemDescription',
        'metric',
        'csi',
        'referenceNumber',
        'unlimited',
        'licensesPerCore',
        'licensesPerUser',
        'availableLicensesPerCore',
        'availableLicensesPerUser',
        'basket',
        'restricted',
        'location',
      ],
    }
  },
  methods: {
    ...mapActions(['oracleContractsActions']),
    deleteContract(id, contract) {
      this.$buefy.dialog.confirm({
        title: 'Delete Contract',
        message: `Are you sure you want to <b>delete</b> the contract number <b>${contract}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.oracleContractsActions({ action: 'delete', id: id })
        },
      })
    },
    editOracleContract(data) {
      bus.$emit('editOracleContract', data)
    },
    cloneOracleContract(data) {
      bus.$emit('cloneOracleContract', _.omit(data, ['id']))
    },
    openModal(data) {
      this.$buefy.modal.open({
        component: OracleAssociatedModal,
        hasModalCard: true,
        props: {
          data: data,
        },
      })
    },
  },
  computed: {
    ...mapGetters(['getOracleContracts', 'loadingTableStatus']),
    toggleReferenceNumber() {
      return _.some(this.getOracleContracts, 'referenceNumber')
    },
  },
}
</script>

<style lang="scss" scoped></style>
