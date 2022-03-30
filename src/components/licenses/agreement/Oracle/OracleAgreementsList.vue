<template>
  <FullTable
    :placeholder="$t('menu.licAgreements')"
    :keys="keys"
    :tableData="returnLicensesAgreement('oracle')"
    :clickedRow="() => []"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <th colspan="4" style="text-align: center !important">
        {{ $t('common.collumns.actions') }}
      </th>
      <v-th sortKey="agreementID">
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
          v-if="rowData.scope.hosts.length > 0"
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
            deleteAgreement(
              'oracle',
              rowData.scope.id,
              rowData.scope.agreementID
            )
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
          @click.native="cloneAgreement(rowData.scope)"
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
      <TdContent :value="rowData.scope.licensesPerCore" />
      <TdContent :value="rowData.scope.availableLicensesPerCore" />
      <TdContent :value="rowData.scope.licensesPerUser" />
      <TdContent :value="rowData.scope.availableLicensesPerUser" />
      <TdIcon :value="rowData.scope.basket" />
      <TdIcon :value="rowData.scope.restricted" />
    </template>

    <ExportButton
      slot="export"
      url="agreements/oracle/database"
      expName="oracleAgreements"
    />
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import OracleAssociatedModal from '@/components/licenses/agreement/Oracle/OracleAssociatedModal.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  mixins: [TooltipMixin, LicensesAgreementMixin],
  components: {
    FullTable,
    TdContent,
    TdIcon,
    ExportButton,
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
        'licensesPerCore',
        'licensesPerUser',
        'availableLicensesPerCore',
        'availableLicensesPerUser',
        'basket',
        'restricted',
      ],
    }
  },
  methods: {
    editAgreement(data) {
      bus.$emit('editAgreementOracle', data)
    },
    cloneAgreement(data) {
      bus.$emit('cloneAgreementOracle', _.omit(data, ['id']))
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
    ...mapGetters(['loadingTableStatus']),
    toggleReferenceNumber() {
      return _.some(this.returnLicensesAgreement('oracle'), 'referenceNumber')
    },
  },
}
</script>

<style lang="scss" scoped></style>
