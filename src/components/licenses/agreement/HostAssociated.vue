<template>
  <div>
    <b-icon
      v-tooltip="options('Show Hosts')"
      type="is-link"
      class="hosts-icon"
      pack="fas"
      icon="server"
      @click.native="openModal = true"
    />

    <b-modal
      :active.sync="openModal"
      :width="750"
      scroll="keep"
      :on-cancel="getLicensesAgreement"
    >
      <header class="modal-card-head">
        <p class="modal-card-title">
          Hosts Associated From License Agreement Number {{ agreeNumber }}
        </p>
      </header>
      <section class="modal-card-body">
        <FullTable
          placeholder="Search on Hosts Associated"
          :keys="keys"
          :tableData="associatedHosts"
          :clickedRow="() => []"
        >
          <template slot="headData">
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="coveredLicensesCount">Number Licenses Used</v-th>
            <th>Actions</th>
          </template>

          <template slot="bodyData" slot-scope="rowData">
            <HostLink :hostname="rowData.scope.hostname" />
            <TdContent :value="rowData.scope.coveredLicensesCount" />
            <td>
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
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions } from 'vuex'
import axiosDefault from '@/axios/axios-default.js'
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
    hosts: {
      type: Array,
      default: () => []
    },
    agreeNumber: {
      type: String,
      required: true
    },
    licenseID: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      openModal: false,
      keys: ['hostname', 'coveredLicensesCount'],
      associatedHosts: this.hosts
    }
  },
  methods: {
    ...mapActions(['getLicensesAgreement']),
    deleteHostAssociated(hostname) {
      axiosDefault
        .delete(
          `/agreements/oracle/database/${this.licenseID}/hosts/${hostname}`
        )
        .then(() => {
          this.associatedHosts = _.filter(this.associatedHosts, val => {
            return val.hostname !== hostname
          })
        })
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
