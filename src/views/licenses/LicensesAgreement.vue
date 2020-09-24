<template>
  <section>
    <div class="columns">
      <b-button
        class="toggleCol"
        size="is-small"
        type="is-text"
        slot="customTitle"
        pack="fas"
        :icon-right="toggleIcon"
        @click="isExpanded = !isExpanded"
      >
        {{ toggleText }}
      </b-button>
      <div class="column" :class="tabsCol">
        <b-tabs size="is-small" type="is-boxed" class="block">
          <b-tab-item label="Oracle">
            <FullTable
              placeholder="Search on Licenses"
              :keys="keys"
              :tableData="returnLicensesAgreement"
              :clickedRow="() => []"
            >
              <template slot="headData">
                <v-th sortKey="agreementID">Agreement Number</v-th>
                <v-th sortKey="partID">Part Number</v-th>
                <v-th sortKey="itemDescription">Item Description</v-th>
                <v-th sortKey="metrics">Metrics</v-th>
                <v-th sortKey="csi">csi</v-th>
                <v-th sortKey="referenceNumber">Reference Number</v-th>
                <v-th sortKey="unlimited">ULA</v-th>
                <v-th sortKey="licensesCount">Number Licenses</v-th>
                <v-th sortKey="usersCount">Number User</v-th>
                <v-th sortKey="availableCount">Number Available</v-th>
                <th>Actions</th>
              </template>

              <template slot="bodyData" slot-scope="rowData">
                <TdContent :value="rowData.scope.agreementID" />
                <TdContent :value="rowData.scope.partID" />
                <TdContent :value="rowData.scope.itemDescription" />
                <TdContent :value="rowData.scope.metrics" />
                <TdContent :value="rowData.scope.csi" />
                <TdContent :value="rowData.scope.referenceNumber" />
                <TdContent :value="rowData.scope.unlimited" />
                <TdContent :value="rowData.scope.licensesCount" />
                <TdContent :value="rowData.scope.usersCount" />
                <TdContent :value="rowData.scope.availableCount" />
                <td class="is-flex action-buttons">
                  <b-icon
                    v-tooltip="options('Show Hosts')"
                    type="is-link"
                    class="hosts-icon"
                    pack="fas"
                    icon="server"
                    @click.native="showLicencedHosts(rowData.scope.hosts)"
                  />

                  <b-icon
                    v-tooltip="options('Edit License')"
                    type="is-info"
                    class="edit-icon"
                    pack="fas"
                    icon="edit"
                    @click.native="editLicense(rowData.scope)"
                  />
                  <b-icon
                    v-tooltip="options('Delete License')"
                    type="is-danger"
                    class="delete-icon"
                    pack="fas"
                    icon="trash-alt"
                    @click.native="deleteLicense(rowData.scope.id)"
                  />
                </td>
              </template>

              <exportButton slot="export" url="" expName="databases" />
            </FullTable>
          </b-tab-item>
          <!-- <b-tab-item label="MySQL">
            mysql
          </b-tab-item> -->
        </b-tabs>
      </div>
      <div class="column" :class="addCol">
        <BoxContent title="Add or Modify a License">
          <b-field label="Type of Technologie *" custom-class="is-small">
            <b-select
              size="is-small"
              placeholder="Select"
              v-model="licenseAddData.techType"
              expanded
            >
              <option value="Oracle">Oracle</option>
            </b-select>
          </b-field>

          <b-field label="Agreement Number *" custom-class="is-small">
            <b-input
              size="is-small"
              type="number"
              v-model="licenseAddData.agreeNumber"
            />
          </b-field>

          <b-field
            label="Part Number, Item Description and Metrics *"
            custom-class="is-small"
          >
            <b-select
              size="is-small"
              placeholder="Select"
              v-model="licenseAddData.partNumber"
              expanded
            >
              <option
                v-for="(part, index) in returnAgreementParts"
                :key="index"
                :value="part.agreeParts"
              >
                {{ part.agreeParts }}
              </option>
            </b-select>
          </b-field>

          <b-field label="CSI *" custom-class="is-small">
            <b-input
              size="is-small"
              type="number"
              v-model="licenseAddData.csi"
            />
          </b-field>

          <b-field label="Reference Number" custom-class="is-small">
            <b-input
              size="is-small"
              type="number"
              v-model="licenseAddData.referenceNumber"
            />
          </b-field>

          <b-field label="Licenses *" custom-class="is-small" grouped>
            <b-field label="ULA" custom-class="is-small" expanded>
              <b-checkbox size="is-small" v-model="licenseAddData.ula" />
            </b-field>
            <span class="pr-4 pt-3">or</span>
            <b-field label="Number" custom-class="is-small" expanded>
              <b-input
                size="is-small"
                type="number"
                v-model="licenseAddData.licenseNumber"
                :disabled="licenseAddData.ula"
              />
            </b-field>
          </b-field>

          <b-field label="Host Associated" custom-class="is-small">
            <b-taginput
              v-model="licenseAddData.hostAssociated"
              :data="filteredHostTags"
              ref="taginput"
              autocomplete
              icon="label"
              placeholder="Add a hostname"
              @typing="getFilteredHostTags"
              custom-class="is-small"
              :open-on-focus="true"
            >
              <template slot-scope="props">
                {{ props.option }}
              </template>

              <template slot="selected" slot-scope="props">
                <b-tag
                  v-for="(host, index) in props.tags"
                  :key="index"
                  type="is-primary"
                  :tabstop="false"
                  closable
                  attached
                  close-type="is-light"
                  @close="$refs.taginput.removeTag(index, $event)"
                >
                  {{ host }}
                </b-tag>
              </template>

              <template slot="empty">
                There are no hostnames
              </template>
            </b-taginput>
          </b-field>

          <div class="buttons is-flex" style="justify-content: space-between;">
            <b-button
              type="is-danger"
              size="is-small"
              @click="cancelAddLicense"
            >
              Cancel
            </b-button>
            <b-button type="is-primary" size="is-small" @click="addLicense">
              Add License
            </b-button>
          </div>
        </BoxContent>
      </div>
    </div>
  </section>
</template>

<script>
import axiosDefault from '@/axios/axios-default.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [TooltipMixin],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent
  },
  data() {
    return {
      isExpanded: true,
      tabsCol: 'is-9',
      addCol: 'is-3',
      toggleText: 'Hide',
      toggleIcon: 'chevron-left',
      keys: [
        'agreementID',
        'partID',
        'itemDescription',
        'metrics',
        'csi',
        'referenceNumber',
        'unlimited',
        'licensesCount',
        'usersCount',
        'availableCount'
      ],
      licenseAddData: {
        ula: false,
        licenseNumber: null,
        hostAssociated: []
      },
      filteredHostTags: []
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement()
    await this.getAgreementParts()

    this.filteredHostTags = this.hostnames.hostnames
  },
  methods: {
    ...mapActions(['getLicensesAgreement', 'getAgreementParts']),
    addLicense() {
      const addLicense = {
        agreementID: this.licenseAddData.agreeNumber,
        csi: this.licenseAddData.csi,
        partsID: [this.licenseAddData.partNumber.split(' - ')[0]],
        referenceNumber: this.licenseAddData.referenceNumber,
        unlimited: this.licenseAddData.ula,
        count: Number(this.licenseAddData.licenseNumber),
        hosts: this.licenseAddData.hostAssociated,
        catchAll: false
      }
      axiosDefault.post('/agreements/oracle/database', addLicense).then(res => {
        if (res.data[0].InsertedID) {
          this.getLicensesAgreement()
          this.cancelAddLicense()
        }
      })
    },
    cancelAddLicense() {
      this.licenseAddData = {
        agreeNumber: null,
        csi: null,
        partNumber: null,
        referenceNumber: null,
        techType: null,
        ula: false,
        licenseNumber: null,
        hostAssociated: []
      }
    },
    editLicense(data) {
      console.log(data)
    },
    deleteLicense(id) {
      axiosDefault.delete(`/agreements/oracle/database/${id}`).then(() => {
        this.getLicensesAgreement()
      })
    },
    showLicencedHosts(hosts) {
      console.log(hosts)
    },
    getFilteredHostTags(text) {
      this.filteredHostTags = this.hostnames.hostnames.filter(option => {
        return (
          option
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        )
      })
    }
  },
  computed: {
    ...mapState(['hostnames']),
    ...mapGetters(['returnAgreementParts', 'returnLicensesAgreement'])
  },
  watch: {
    isExpanded(value) {
      if (!value) {
        this.tabsCol = 'is-12'
        this.addCol = 'is-hidden'
        this.toggleText = 'Show Add License'
        this.toggleIcon = 'chevron-right'
      } else {
        this.tabsCol = 'is-9'
        this.addCol = 'is-3'
        this.toggleText = 'Hide'
        this.toggleIcon = 'chevron-left'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toggleCol {
  position: absolute;
  right: 20px;
  top: 145px;
  padding: 0;

  &:hover {
    background-color: transparent;
    color: #679189;
  }

  &:focus {
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
}

.action-buttons {
  justify-content: space-around;
  min-width: 150px;

  .edit-icon,
  .delete-icon,
  .hosts-icon {
    font-size: 1rem;
    cursor: pointer;
  }
}
</style>
