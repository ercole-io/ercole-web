<template>
  <FullTable
    :placeholder="$t('menu.licAgreements')"
    :keys="keys"
    :tableData="returnLicensesContracts('mysql')"
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
      <v-th sortKey="csi">
        {{ $t('common.collumns.csi') }}
      </v-th>
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
          @click.native="editAgreement(rowData.scope)"
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
            deleteAgreement('mysql', rowData.scope.id, rowData.scope.contractID)
          "
        />
      </td>
      <TdContent :value="rowData.scope.type | toLower" />
      <TdContent :value="rowData.scope.contractID" />
      <TdContent :value="rowData.scope.csi" />
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

    <ExportButton
      slot="export"
      url="agreements/mysql/database"
      expName="mysqlAgreements"
    />
  </FullTable>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesContractsMixin from '@/mixins/licensesContracts.js'
import MysqlAssociatedModal from '@/components/licenses/contracts/MySQL/MysqlAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  mixins: [TooltipMixin, LicensesContractsMixin],
  components: {
    FullTable,
    TdContent,
    ExportButton,
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
    editAgreement(data) {
      bus.$emit('editAgreementMysql', data)
    },
    openModal(type, data, agreeID = ' - ') {
      this.$buefy.modal.open({
        component: MysqlAssociatedModal,
        hasModalCard: true,
        props: {
          agreementType: type,
          agreementData: data,
          agreementNumber: agreeID,
        },
      })
    },
  },
  computed: {
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
