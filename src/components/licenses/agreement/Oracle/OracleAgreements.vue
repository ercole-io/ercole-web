<template>
  <ShowHideColumn :leftCol="'is-9'" :rightCol="'is-3'">
    <FullTable
      placeholder="Search on Oracle Agreements"
      :keys="keys"
      :tableData="returnLicensesAgreement('oracle')"
      :clickedRow="() => []"
      slot="left"
    >
      <template slot="headData">
        <v-th sortKey="agreementID">Agreement Number</v-th>
        <v-th sortKey="licenseTypeID">Part Number</v-th>
        <v-th sortKey="itemDescription">Description</v-th>
        <v-th sortKey="metric">Metric</v-th>
        <v-th sortKey="csi">CSI</v-th>
        <v-th sortKey="referenceNumber">Reference Number</v-th>
        <v-th sortKey="unlimited">ULA</v-th>
        <v-th sortKey="licensesCount">Number Licenses</v-th>
        <v-th sortKey="usersCount">Number User</v-th>
        <v-th sortKey="availableCount">Number Available</v-th>
        <v-th sortKey="catchAll">Basket</v-th>
        <v-th sortKey="restricted">Restricted</v-th>
        <th colspan="3" style="max-width: 100px">Actions</th>
      </template>

      <template slot="bodyData" slot-scope="rowData">
        <TdContent :value="rowData.scope.agreementID" />
        <TdContent :value="rowData.scope.licenseTypeID" />
        <TdContent :value="rowData.scope.itemDescription" />
        <TdContent :value="rowData.scope.metric" />
        <TdContent :value="rowData.scope.csi" />
        <TdContent :value="rowData.scope.referenceNumber" />
        <TdIcon :value="rowData.scope.unlimited" />
        <TdContent :value="rowData.scope.licensesCount" />
        <TdContent :value="rowData.scope.usersCount" />
        <TdContent :value="rowData.scope.availableCount" />
        <TdIcon :value="rowData.scope.catchAll" />
        <TdIcon :value="rowData.scope.restricted" />

        <td style="min-width: 50px;">
          <HostAssociatedModal
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
            @click.native="editAgreement(rowData.scope)"
          />
        </td>
        <td style="min-width: 50px;">
          <b-icon
            v-tooltip="options('Delete License')"
            type="is-danger"
            class="delete-icon"
            pack="fas"
            icon="trash-alt"
            @click.native="deleteAgreement('oracle', rowData.scope.id)"
          />
        </td>
      </template>
    </FullTable>

    <BoxContent title="Add or Modify an Oracle Agreement" slot="right">
      <form @submit.prevent="addUpdateAgreement">
        <b-field
          label="Type of Technologie *"
          custom-class="is-small"
          :type="{
            'is-danger': $v.oracleForm.techType.$error
          }"
          :message="{
            'This field is required':
              !$v.oracleForm.techType.required && $v.oracleForm.techType.$error
          }"
        >
          <b-select
            @blur="$v.oracleForm.techType.$touch()"
            @input="$v.oracleForm.techType.$touch()"
            size="is-small"
            placeholder="Select"
            v-model="oracleForm.techType"
            expanded
          >
            <option value="Oracle">Oracle</option>
          </b-select>
        </b-field>

        <b-field
          label="Agreement Number *"
          custom-class="is-small"
          :type="{
            'is-danger': $v.oracleForm.agreeNumber.$error
          }"
          :message="{
            'This field is required':
              !$v.oracleForm.agreeNumber.required &&
              $v.oracleForm.agreeNumber.$error,
            'This field accepts only numbers':
              !$v.oracleForm.agreeNumber.numeric &&
              $v.oracleForm.agreeNumber.$error
          }"
        >
          <b-autocomplete
            v-model="oracleForm.agreeNumber"
            size="is-small"
            type="number"
            :data="filteredAgreeNumbers"
            @typing="
              getAutocompleteData($event, 'agreeNumber', returnAgreeNumbers)
            "
            clearable
            @blur="$v.oracleForm.agreeNumber.$touch()"
            @input="$v.oracleForm.agreeNumber.$touch()"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field
          label="Part Number, Item Description and Metric *"
          custom-class="is-small"
          :type="{
            'is-danger': $v.oracleForm.partNumber.$error
          }"
          :message="{
            'This field is required':
              !$v.oracleForm.partNumber.required &&
              $v.oracleForm.partNumber.$error
          }"
        >
          <b-select
            @blur="$v.oracleForm.partNumber.$touch()"
            @input="$v.oracleForm.partNumber.$touch()"
            size="is-small"
            placeholder="Select"
            v-model="oracleForm.partNumber"
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
            'is-danger': $v.oracleForm.csi.$error
          }"
          :message="{
            'This field is required':
              !$v.oracleForm.csi.required && $v.oracleForm.csi.$error
          }"
        >
          <b-autocomplete
            v-model="oracleForm.csi"
            size="is-small"
            type="text"
            :data="filteredCsi"
            @typing="getAutocompleteData($event, 'csi', returnCsiNumbers)"
            clearable
            @blur="$v.oracleForm.csi.$touch()"
            @input="$v.oracleForm.csi.$touch()"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field
          label="Reference Number"
          custom-class="is-small"
          :type="{
            'is-danger': $v.oracleForm.referenceNumber.$error
          }"
          :message="{
            'This field is accepts only numbers':
              !$v.oracleForm.referenceNumber.numeric &&
              $v.oracleForm.referenceNumber.$error
          }"
        >
          <b-autocomplete
            v-model="oracleForm.referenceNumber"
            size="is-small"
            type="number"
            :data="filteredReferenceNumbers"
            @typing="
              getAutocompleteData(
                $event,
                'referenceNumber',
                returnReferenceNumbers
              )
            "
            clearable
            @blur="$v.oracleForm.referenceNumber.$touch()"
            @input="$v.oracleForm.referenceNumber.$touch()"
          >
            <template slot="empty">No results found</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Licenses *" custom-class="is-small" grouped>
          <b-field label="ULA" custom-class="is-small" expanded>
            <b-checkbox size="is-small" v-model="oracleForm.ula" />
          </b-field>

          <span class="pr-4 pt-3">or</span>

          <b-field
            label="Number"
            custom-class="is-small"
            expanded
            :type="{
              'is-danger': $v.oracleForm.licenseNumber.$error
            }"
            :message="{
              'This field is required':
                !$v.oracleForm.licenseNumber.required &&
                $v.oracleForm.licenseNumber.$error,
              'This field accepts only numbers':
                !$v.oracleForm.licenseNumber.numeric &&
                $v.oracleForm.licenseNumber.$error
            }"
          >
            <b-input
              @blur="$v.oracleForm.licenseNumber.$touch()"
              @input="$v.oracleForm.licenseNumber.$touch()"
              size="is-small"
              type="number"
              step="any"
              v-model="oracleForm.licenseNumber"
              :disabled="ula"
            />
          </b-field>
        </b-field>

        <b-field label="Host Associated" custom-class="is-small">
          <b-taginput
            v-model="oracleForm.hostAssociated"
            :data="filteredHostTags"
            ref="taginput"
            autocomplete
            icon="label"
            placeholder="Add a hostname"
            @typing="
              getAutocompleteData($event, 'hostTags', hostnames.hostnames)
            "
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

        <b-field label="Basket" custom-class="is-small">
          <div class="is-flex" style="justify-content: space-around;">
            <b-radio
              size="is-small"
              v-model="oracleForm.basket"
              :native-value="true"
              :disabled="restricted"
            >
              Yes
            </b-radio>
            <b-radio
              size="is-small"
              v-model="oracleForm.basket"
              :native-value="false"
              :disabled="restricted"
            >
              No
            </b-radio>
          </div>
        </b-field>

        <b-field label="Restricted" custom-class="is-small">
          <div class="is-flex" style="justify-content: space-around;">
            <b-radio
              size="is-small"
              v-model="oracleForm.restricted"
              :native-value="true"
            >
              Yes
            </b-radio>
            <b-radio
              size="is-small"
              v-model="oracleForm.restricted"
              :native-value="false"
            >
              No
            </b-radio>
          </div>
        </b-field>

        <div class="buttons is-flex is-justify-content-space-between mt-5">
          <b-button type="is-danger" size="is-small" @click="cancelAddLicense">
            Cancel
          </b-button>
          <b-button
            type="is-primary"
            size="is-small"
            native-type="submit"
            :disabled="$v.$invalid"
          >
            {{ oracleForm.licenseId ? 'Edit Agreement' : 'Add Agreement' }}
          </b-button>
        </div>
      </form>
    </BoxContent>
  </ShowHideColumn>
</template>

<script>
import _ from 'lodash'
import {
  required,
  requiredIf,
  numeric,
  decimal
} from 'vuelidate/lib/validators'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import LicensesAgreementMixin from '@/mixins/licensesAgreement.js'
import HostAssociatedModal from '@/components/licenses/agreement/Oracle/HostAssociatedModal.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import ShowHideColumn from '@/components/common/ShowHideColumn.vue'

export default {
  mixins: [TooltipMixin, LicensesAgreementMixin],
  components: {
    ShowHideColumn,
    BoxContent,
    FullTable,
    TdContent,
    HostAssociatedModal,
    TdIcon
  },
  validations: {
    oracleForm: {
      techType: { required },
      agreeNumber: { required, numeric },
      partNumber: { required },
      csi: { required },
      referenceNumber: { numeric },
      licenseNumber: {
        required: requiredIf(val => {
          return !val.ula
        }),
        decimal
      }
    }
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
        'licensesCount',
        'usersCount',
        'availableCount',
        'catchAll',
        'restricted'
      ],
      oracleForm: {
        licenseId: '',
        techType: 'Oracle',
        agreeNumber: '',
        partNumber: [],
        csi: '',
        referenceNumber: '',
        ula: false,
        licenseNumber: '',
        hostAssociated: [],
        basket: false,
        restricted: false
      }
    }
  },
  async beforeMount() {
    await this.getLicensesAgreement('oracle')
  },
  methods: {
    addUpdateAgreement() {
      const oracleAgreementData = {
        agreementID: this.oracleForm.agreeNumber,
        csi: this.oracleForm.csi,
        referenceNumber: this.oracleForm.referenceNumber,
        unlimited: this.oracleForm.ula,
        count: Number(this.oracleForm.licenseNumber),
        hosts: this.oracleForm.hostAssociated,
        catchAll: this.oracleForm.basket,
        licenseTypeID: this.oracleForm.partNumber.split(' - ')[0],
        restricted: this.oracleForm.restricted
      }
      if (!this.oracleForm.licenseId) {
        this.createLicenseAgreement({
          body: oracleAgreementData,
          type: 'oracle'
        }).then(() => {
          this.cancelAddLicense()
        })
      } else {
        oracleAgreementData.id = this.oracleForm.licenseId
        this.updateLicenseAgreement({
          body: oracleAgreementData,
          type: 'oracle'
        }).then(() => {
          this.cancelAddLicense()
        })
      }
    },
    cancelAddLicense() {
      this.oracleForm = {
        techType: 'Oracle',
        agreeNumber: '',
        partNumber: [],
        csi: '',
        referenceNumber: '',
        ula: false,
        licenseNumber: '',
        hostAssociated: [],
        basket: false,
        restricted: false
      }
    },
    editAgreement(data) {
      this.oracleForm.licenseId = data.id
      this.oracleForm.agreeNumber = data.agreementID
      this.oracleForm.csi = data.csi
      this.oracleForm.partNumber = `${data.licenseTypeID} - ${data.itemDescription} - ${data.metric}`
      this.oracleForm.referenceNumber = data.referenceNumber
      this.oracleForm.techType = 'Oracle'
      this.oracleForm.ula = data.unlimited
      this.oracleForm.licenseNumber = Number(data.count)
      this.oracleForm.hostAssociated = this.checkArray(data.hosts)
        ? data.hosts
        : this.mapHostsAssociated(data.hosts)
      this.oracleForm.basket = data.catchAll
      this.oracleForm.restricted = data.restricted
    },
    checkArray(array) {
      return array.every(i => typeof i === 'string')
    },
    mapHostsAssociated(hostsAssociated) {
      return _.map(hostsAssociated, host => {
        return host.hostname
      })
    }
  },
  computed: {
    ula() {
      return this.oracleForm.ula
    },
    restricted() {
      return this.oracleForm.restricted
    }
  },
  watch: {
    ula(val) {
      if (val) {
        this.oracleForm.licenseNumber = null
      }
    },
    restricted(val) {
      if (val) {
        this.oracleForm.basket = false
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
