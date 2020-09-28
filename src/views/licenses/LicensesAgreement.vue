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
              :customSelection="isEditing"
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
                <th colspan="3" style="max-width: 100px">Actions</th>
              </template>

              <template slot="bodyData" slot-scope="rowData">
                <TdContent :value="rowData.scope.agreementID" />
                <TdContent :value="rowData.scope.partID" />
                <TdContent :value="rowData.scope.itemDescription" />
                <TdContent :value="rowData.scope.metrics" />
                <TdContent :value="rowData.scope.csi" />
                <TdContent :value="rowData.scope.referenceNumber" />
                <TdIcon :value="bindIcon(rowData.scope.unlimited)" />
                <TdContent :value="rowData.scope.licensesCount" />
                <TdContent :value="rowData.scope.usersCount" />
                <TdContent :value="rowData.scope.availableCount" />

                <td style="min-width: 50px;">
                  <HostAssociated
                    :hosts="rowData.scope.hosts"
                    :agreeNumber="rowData.scope.agreementID"
                    :licenseID="rowData.scope.id"
                  />
                </td>
                <td style="min-width: 50px;">
                  <b-icon
                    v-tooltip="options('Edit License')"
                    type="is-info"
                    class="edit-icon"
                    pack="fas"
                    icon="edit"
                    @click.native="openLicenseEdition(rowData.scope)"
                  />
                </td>
                <td style="min-width: 50px;">
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
          <form @submit.prevent="addUpdateLicense">
            <b-field
              label="Type of Technologie *"
              custom-class="is-small"
              :type="{
                'is-danger': $v.techType.$error
              }"
              :message="{
                'This field is required':
                  !$v.techType.required && $v.techType.$error
              }"
            >
              <b-select
                @blur="$v.techType.$touch()"
                @input="$v.techType.$touch()"
                size="is-small"
                placeholder="Select"
                v-model="techType"
                expanded
              >
                <option value="Oracle">Oracle</option>
              </b-select>
            </b-field>

            <b-field
              label="Agreement Number *"
              custom-class="is-small"
              :type="{
                'is-danger': $v.agreeNumber.$error
              }"
              :message="{
                'This field is required':
                  !$v.agreeNumber.required && $v.agreeNumber.$error,
                'This field accepts only numbers':
                  !$v.agreeNumber.numeric && $v.agreeNumber.$error
              }"
            >
              <b-autocomplete
                v-model="agreeNumber"
                size="is-small"
                type="number"
                :data="filteredAgreeNumbers"
                @typing="getFilteredAgreeNumbers"
                clearable
                :open-on-focus="true"
                @blur="$v.agreeNumber.$touch()"
                @input="$v.agreeNumber.$touch()"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
            </b-field>

            <b-field
              label="Part Number, Item Description and Metrics *"
              custom-class="is-small"
              :type="{
                'is-danger': $v.partNumber.$error
              }"
              :message="{
                'This field is required':
                  !$v.partNumber.required && $v.partNumber.$error
              }"
            >
              <b-select
                @blur="$v.partNumber.$touch()"
                @input="$v.partNumber.$touch()"
                size="is-small"
                placeholder="Select"
                v-model="partNumber"
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

            <b-field
              label="CSI *"
              custom-class="is-small"
              :type="{
                'is-danger': $v.csi.$error
              }"
              :message="{
                'This field is required': !$v.csi.required && $v.csi.$error
              }"
            >
              <b-autocomplete
                v-model="csi"
                size="is-small"
                type="text"
                :data="filteredCsi"
                @typing="getFilteredCsi"
                clearable
                :open-on-focus="true"
                @blur="$v.csi.$touch()"
                @input="$v.csi.$touch()"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
            </b-field>

            <b-field
              label="Reference Number *"
              custom-class="is-small"
              :type="{
                'is-danger': $v.referenceNumber.$error
              }"
              :message="{
                'This field is required':
                  !$v.referenceNumber.required && $v.referenceNumber.$error
              }"
            >
              <b-autocomplete
                v-model="referenceNumber"
                size="is-small"
                type="number"
                :data="filteredReferenceNumbers"
                @typing="getFilteredReferenceNumbers"
                clearable
                :open-on-focus="true"
                @blur="$v.referenceNumber.$touch()"
                @input="$v.referenceNumber.$touch()"
              >
                <template slot="empty">No results found</template>
              </b-autocomplete>
            </b-field>

            <b-field label="Licenses *" custom-class="is-small" grouped>
              <b-field label="ULA" custom-class="is-small" expanded>
                <b-checkbox size="is-small" v-model="ula" />
              </b-field>

              <span class="pr-4 pt-3">or</span>

              <b-field
                label="Number"
                custom-class="is-small"
                expanded
                :type="{
                  'is-danger': $v.licenseNumber.$error
                }"
                :message="{
                  'This field is required':
                    !$v.licenseNumber.required && $v.licenseNumber.$error,
                  'This field accepts only numbers':
                    !$v.licenseNumber.numeric && $v.licenseNumber.$error
                }"
              >
                <b-input
                  @blur="$v.licenseNumber.$touch()"
                  @input="$v.licenseNumber.$touch()"
                  size="is-small"
                  type="number"
                  step="any"
                  v-model="licenseNumber"
                  :disabled="ula"
                />
              </b-field>
            </b-field>

            <b-field label="Host Associated" custom-class="is-small">
              <b-taginput
                v-model="hostAssociated"
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

            <div
              class="buttons is-flex"
              style="justify-content: space-between;"
            >
              <b-button
                type="is-danger"
                size="is-small"
                @click="cancelAddLicense"
              >
                Cancel
              </b-button>
              <b-button
                type="is-primary"
                size="is-small"
                :disabled="$v.$invalid"
                native-type="submit"
              >
                {{ isEditing ? 'Edit License' : 'Add License' }}
              </b-button>
            </div>
          </form>
        </BoxContent>
      </div>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import axiosDefault from '@/axios/axios-default.js'
import { mapActions, mapGetters, mapState } from 'vuex'
import {
  required,
  requiredIf,
  numeric,
  decimal
} from 'vuelidate/lib/validators'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import exportButton from '@/components/common/exportButton.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HostAssociated from '@/components/licenses/agreement/HostAssociated.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    BoxContent,
    FullTable,
    exportButton,
    TdContent,
    HostAssociated,
    TdIcon
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
      filteredHostTags: [],
      filteredAgreeNumbers: [],
      filteredCsi: [],
      filteredReferenceNumbers: [],
      isEditing: false,
      licenseId: null,
      techType: null,
      agreeNumber: null,
      partNumber: null,
      csi: null,
      referenceNumber: null,
      ula: false,
      licenseNumber: null,
      hostAssociated: []
    }
  },
  validations: {
    techType: { required },
    agreeNumber: { required, numeric },
    partNumber: { required },
    csi: { required },
    referenceNumber: { required, numeric },
    licenseNumber: {
      required: requiredIf(val => {
        return !val.ula
      }),
      decimal
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement()
    await this.getAgreementParts()

    this.filteredHostTags = this.hostnames.hostnames
    this.filteredAgreeNumbers = this.returnAgreeNumbers
    this.filteredCsi = this.returnCsiNumbers
    this.filteredReferenceNumbers = this.returnReferenceNumbers
  },
  methods: {
    ...mapActions(['getLicensesAgreement', 'getAgreementParts']),
    addUpdateLicense() {
      const license = {
        agreementID: this.agreeNumber,
        csi: this.csi,
        partsID: [this.partNumber.split(' - ')[0]],
        referenceNumber: this.referenceNumber,
        unlimited: this.ula,
        count: Number(this.licenseNumber),
        hosts: this.hostAssociated,
        catchAll: false
      }

      if (!this.isEditing) {
        axiosDefault.post('/agreements/oracle/database', license).then(res => {
          if (res.data[0].InsertedID) {
            this.getLicensesAgreement()
            this.cancelAddLicense()
            this.isEditing = false
          }
        })
      } else {
        license.id = this.licenseId
        license.partID = this.partNumber.split(' - ')[0]

        axiosDefault.put('/agreements/oracle/database', license).then(() => {
          this.getLicensesAgreement()
          this.cancelAddLicense()
          this.isEditing = false
        })
      }
    },
    cancelAddLicense() {
      this.techType = null
      this.agreeNumber = null
      this.partNumber = null
      this.csi = null
      this.referenceNumber = null
      this.ula = false
      this.licenseNumber = null
      this.hostAssociated = []
      this.isEditing = false
    },
    openLicenseEdition(data) {
      this.licenseId = data.id
      this.agreeNumber = data.agreementID
      this.csi = data.csi
      this.partNumber = `${data.partID} - ${data.itemDescription} - ${data.metrics}`
      this.referenceNumber = data.referenceNumber
      this.techType = 'Oracle'
      this.ula = data.unlimited
      this.licenseNumber = Number(data.count)
      this.hostAssociated = _.map(data.hosts, host => {
        return host.hostname
      })
      this.isEditing = true
      this.isExpanded = true
    },
    deleteLicense(id) {
      axiosDefault.delete(`/agreements/oracle/database/${id}`).then(() => {
        this.getLicensesAgreement()
        this.cancelAddLicense()
        this.isEditing = false
      })
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
    },
    getFilteredAgreeNumbers(text) {
      this.filteredAgreeNumbers = this.returnAgreeNumbers.filter(option => {
        return option.toString().indexOf(text) >= 0
      })
    },
    getFilteredCsi(text) {
      this.filteredCsi = this.returnCsiNumbers.filter(option => {
        return option.toString().indexOf(text) >= 0
      })
    },
    getFilteredReferenceNumbers(text) {
      this.filteredReferenceNumbers = this.returnReferenceNumbers.filter(
        option => {
          return option.toString().indexOf(text) >= 0
        }
      )
    },
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  },
  computed: {
    ...mapState(['hostnames']),
    ...mapGetters([
      'returnAgreementParts',
      'returnLicensesAgreement',
      'returnAgreeNumbers',
      'returnCsiNumbers',
      'returnReferenceNumbers'
    ])
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
    },
    ula(val) {
      if (val) {
        this.licenseNumber = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toggleCol {
  position: absolute;
  right: 20px;
  top: 120px;
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
</style>
