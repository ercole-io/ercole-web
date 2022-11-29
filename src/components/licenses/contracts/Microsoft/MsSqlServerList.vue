<template>
  <FullTable
    :placeholder="$t('menu.licContracts')"
    :keys="keys"
    :tableData="getMicrosoftContracts"
    :clickedRow="() => []"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th colspan="2" style="text-align: center !important">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="type"> Type </v-th>
      <v-th sortKey="contractID"> Contract ID </v-th>
      <v-th sortKey="licenseTypeID"> License Type </v-th>
      <v-th sortKey="supportExpiration">Support Expiration</v-th>
      <v-th sortKey="description"> Description </v-th>
      <v-th sortKey="metric"> Edition - Version </v-th>
      <v-th sortKey="licensesNumber">
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
          @click.native="editMicrosoftContract(rowData.scope)"
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
      <TdContent :value="rowData.scope.type" />
      <TdContent :value="rowData.scope.contractID" />
      <TdContent :value="rowData.scope.licenseTypeID" />
      <TdContent
        :value="rowData.scope.supportExpiration | formatDate"
        v-if="rowData.scope.supportExpiration"
      />
      <TdContent value="-" v-else />
      <TdContent :value="rowData.scope.description" />
      <TdContent :value="rowData.scope.metric" />
      <TdContent :value="rowData.scope.licensesNumber" />
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

    <ExportButton
      slot="export"
      url="contracts/microsoft/database"
      expName="msSqlServerContracts"
    />
  </FullTable>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import MsSqlServerAssociatedModal from '@/components/licenses/contracts/Microsoft/MsSqlServerAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
    ExportButton,
  },
  data() {
    return {
      keys: [
        'clusters',
        'contractID',
        'hosts',
        'licensesNumber',
        'type',
        'licenseTypeID',
        'description',
        'metric',
      ],
    }
  },
  methods: {
    ...mapActions(['microsoftContractsActions']),
    deleteContract(id, contract) {
      this.$buefy.dialog.confirm({
        title: 'Delete Contract',
        message: `Are you sure you want to <b>delete</b> the contract number <b>${contract}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.microsoftContractsActions({ action: 'delete', id: id })
        },
      })
    },
    editMicrosoftContract(data) {
      bus.$emit('updateMicrosoftContract', data)
    },
    openModal(type, data, contractID = ' - ') {
      this.$buefy.modal.open({
        component: MsSqlServerAssociatedModal,
        hasModalCard: true,
        props: {
          associatedType: type,
          contractData: data,
          contractID: contractID,
        },
      })
    },
  },
  computed: {
    ...mapGetters(['getMicrosoftContracts', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
