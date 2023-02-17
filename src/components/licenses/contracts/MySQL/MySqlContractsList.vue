<template>
  <FullTable
    :placeholder="$t('menu.licContracts')"
    :keys="keys"
    :tableData="getMysqlContracts"
    :clickedRow="() => []"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th colspan="2" style="text-align: center !important">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="type"> Type </v-th>
      <v-th sortKey="contractID">
        {{ $t('common.collumns.agreeNumber') }}
      </v-th>
      <v-th sortKey="licenseTypeID"> License Type </v-th>
      <v-th sortKey="description"> Description </v-th>
      <v-th sortKey="csi">
        {{ $t('common.collumns.csi') }}
      </v-th>
      <v-th sortKey="supportExpiration">Support Expiration</v-th>
      <v-th sortKey="numberOfLicenses">
        {{ $t('common.collumns.numberLicenses') }}
      </v-th>
      <v-th sortKey="clusters">Clusters</v-th>
      <v-th sortKey="hosts">Hosts</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <td style="min-width: 0">
        <b-icon
          v-tooltip="options($t('common.general.edit'))"
          type="is-info"
          class="edit-icon"
          pack="fas"
          icon="edit"
          @click.native="updateMysqlContract(rowData.scope)"
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
      <TdContent :value="rowData.scope.type | toLower" />
      <TdContent :value="rowData.scope.contractID" />
      <TdContent :value="rowData.scope.licenseTypeID" />
      <TdContent :value="rowData.scope.description" />
      <TdContent :value="rowData.scope.csi" />
      <TdContent
        :value="rowData.scope.supportExpiration | formatDate"
        v-if="rowData.scope.supportExpiration"
      />
      <TdContent value="-" v-else />
      <TdContent :value="rowData.scope.numberOfLicenses" />
      <td>
        <b-icon
          v-tooltip="options('Clusters')"
          type="is-link"
          class="hosts-icon"
          pack="fas"
          icon="server"
          @click.native="
            openModal(
              'Clusters',
              rowData.scope.clusters,
              rowData.scope.contractID
            )
          "
          v-if="rowData.scope.clusters && rowData.scope.clusters.length > 0"
        />
        <span v-else>-</span>
      </td>
      <td>
        <b-icon
          v-tooltip="options('Hosts')"
          type="is-link"
          class="hosts-icon"
          pack="fas"
          icon="server"
          @click.native="
            openModal('Hosts', rowData.scope.hosts, rowData.scope.contractID)
          "
          v-if="rowData.scope.hosts && rowData.scope.hosts.length > 0"
        />
        <span v-else>-</span>
      </td>
    </template>

    <div class="is-flex" slot="export">
      <ImportCSV contractType="mysql" />
      <ExportButton url="contracts/mysql/database" expName="mysqlContracts" />
    </div>
  </FullTable>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import MysqlAssociatedModal from '@/components/licenses/contracts/MySQL/MysqlAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import ImportCSV from '@/components/licenses/contracts/ImportCSV.vue'

export default {
  name: 'licenses-contracts-mysql-list-component',
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    ExportButton,
    ImportCSV,
  },
  data() {
    return {
      keys: [
        'type',
        'numberOfLicenses',
        'clusters',
        'hosts',
        'csi',
        'contractID',
      ],
    }
  },
  methods: {
    ...mapActions(['mysqlContractsActions']),
    deleteContract(id, contract) {
      this.$buefy.dialog.confirm({
        title: 'Delete Contract',
        message: `Are you sure you want to <b>delete</b> the contract number <b>${contract}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.mysqlContractsActions({ action: 'delete', id: id })
        },
      })
    },
    updateMysqlContract(data) {
      bus.$emit('updateMysqlContract', data)
    },
    openModal(type, data, contract) {
      this.$buefy.modal.open({
        component: MysqlAssociatedModal,
        hasModalCard: true,
        props: {
          contractType: type,
          contractData: data,
          contractID: contract,
        },
      })
    },
  },
  computed: {
    ...mapGetters(['getMysqlContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
