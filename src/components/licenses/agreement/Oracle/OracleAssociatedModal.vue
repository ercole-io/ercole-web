<template>
  <div class="modal-card" style="width: auto">
    <b-loading
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ modalTitle }} <br />
        <span class="is-size-7">{{ agreeNumberText }} {{ agreeNumber }}</span>
      </p>
    </header>
    <section class="modal-card-body">
      <FullTable
        :placeholder="modalTitle"
        :keys="keys"
        :tableData="hostsData"
        :clickedRow="() => []"
        :isLoadingTable="false"
      >
        <template slot="headData">
          <v-th sortKey="hostname">{{ headData[0] }}</v-th>
          <v-th sortKey="consumedLicensesCount">{{ headData[1] }}</v-th>
          <v-th sortKey="coveredLicensesCount">{{ headData[2] }}</v-th>
          <v-th sortKey="totalCoveredLicensesCount">{{ headData[3] }}</v-th>
          <th>{{ headData[4] }}</th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <HostLink
            :hostname="rowData.scope.hostname"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <TdContent
            :value="rowData.scope.consumedLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <TdContent
            :value="rowData.scope.coveredLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <TdContent
            :value="rowData.scope.totalCoveredLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <td
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          >
            <b-icon
              v-tooltip="options(delButton)"
              type="is-danger"
              class="delete-icon"
              pack="fas"
              icon="trash-alt"
              @click.native="deleteHostAssociated(rowData.scope.hostname)"
            />
          </td>
        </template>
      </FullTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import i18n from '@/i18n.js'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    HostLink,
    TdContent,
  },
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
  },
  data() {
    return {
      keys: [
        'hostname',
        'coveredLicensesCount',
        'consumedLicensesCount',
        'totalCoveredLicensesCount',
      ],
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(['getLicensesAgreement']),
    deleteHostAssociated(hostname) {
      this.isLoading = true
      axiosNoLoading
        .delete(
          `/agreements/oracle/database/${this.licenseID}/hosts/${hostname}`
        )
        .then(() => {
          this.data.hosts = _.filter(this.data.hosts, (val) => {
            if (val.hostname !== hostname) {
              return val
            }
          })
        })
        .then(() => {
          this.isLoading = false
        })
    },
  },
  computed: {
    hostsData() {
      return this.data.hosts
    },
    licenseID() {
      return this.data.id
    },
    agreeNumber() {
      return this.data.agreementID
    },
    agreeNumberText() {
      return i18n.t('menu.licAgreements')
    },
    modalTitle() {
      return i18n.t('common.fields.hostsAssociated')
    },
    headData() {
      return [
        i18n.t('common.collumns.hostname'),
        i18n.t('common.collumns.usedLicenses'),
        i18n.t('common.collumns.agreeCovered'),
        i18n.t('common.collumns.agreeCoveredAll'),
        i18n.t('common.collumns.actions'),
      ]
    },
    delButton() {
      return i18n.t('common.general.delete')
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-card-title {
  font-size: 1.2rem;
}

.modal-card-body {
  font-size: 1rem;
  cursor: default;
}
</style>
