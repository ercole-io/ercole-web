<template>
  <div class="modal-card" style="width: auto;">
    <b-loading
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <header class="modal-card-head">
      <p class="modal-card-title">
        Hosts Associated <br />
        <span class="is-size-7">Agreement Number {{ agreeNumber }}</span>
      </p>
    </header>
    <section class="modal-card-body">
      <FullTable
        placeholder="Search on Hosts Associated"
        :keys="keys"
        :tableData="hostsData"
        :clickedRow="() => []"
      >
        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="consumedLicensesCount">Used Licenses</v-th>
          <v-th sortKey="coveredLicensesCount">Covered by this agreement</v-th>
          <v-th sortKey="totalCoveredLicensesCount"
            >Covered by all agreements</v-th
          >
          <th>Actions</th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <HostLink
            :hostname="rowData.scope.hostname"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount
            }"
          />
          <TdContent
            :value="rowData.scope.consumedLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount
            }"
          />
          <TdContent
            :value="rowData.scope.coveredLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount
            }"
          />
          <TdContent
            :value="rowData.scope.totalCoveredLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount
            }"
          />
          <td
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount
            }"
          >
            <b-icon
              v-tooltip="options('Delete License')"
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

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    HostLink,
    TdContent
  },
  props: {
    data: {
      type: [Array, Object],
      required: true
    }
  },
  data() {
    return {
      keys: [
        'hostname',
        'coveredLicensesCount',
        'consumedLicensesCount',
        'totalCoveredLicensesCount'
      ],
      isLoading: false
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
          this.data.hosts = _.filter(this.data.hosts, val => {
            if (val.hostname !== hostname) {
              return val
            }
          })
        })
        .then(() => {
          this.isLoading = false
        })
    }
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
    }
  }
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
