<template>
  <FullTable
    :tableData="getHostsData"
    sortField="hostname"
    :fnCallback="() => fetchHostsData()"
  >
    <template slot="noCheckboxActions">
      <CustomField label="Location" labelPosition="on-border">
        <CustomSelect
          v-model="locationSelected"
          :options="locationOptions"
          :hasReset="false"
          style="min-width: 100px"
        />
      </CustomField>

      <template v-if="selectedHosts && selectedHosts.length > 0">
        <b-button
          :label="`Clear All selected (${selectedHosts.length})`"
          size="is-small"
          type="is-dark"
          icon-left="close"
          class="has-text-weight-semibold ml-2"
          @click="handleClearHosts"
        />

        <b-button
          label="Save Scenarios"
          type="is-primary"
          size="is-small"
          icon-pack="fas"
          icon-left="check-circle"
          class="has-text-weight-semibold ml-2"
          @click="handleSaveScenarios"
        />
      </template>
    </template>

    <template slot="cols">
      <b-table-column
        field="hostname"
        label="Hostname"
        left
        sortable
        width="400"
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.hostname)"
          v-html="highlight(props.row.hostname)"
        />
      </b-table-column>

      <b-table-column
        field="threads"
        label="Threads"
        centered
        sortable
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.threads)"
          v-html="highlight(props.row.threads)"
        />
      </b-table-column>

      <b-table-column
        field="socket"
        label="Socket"
        centered
        sortable
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.socket)"
          v-html="highlight(props.row.socket)"
        />
      </b-table-column>

      <b-table-column
        field="cores"
        label="Original Core"
        centered
        sortable
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.cores)"
          v-html="highlight(props.row.cores)"
          class="original-text"
        />
      </b-table-column>

      <b-table-column
        field="newCore"
        label="Simulated Core"
        centered
        sortable
        width="150"
        v-slot="props"
      >
        <b-field
          :type="
            props.row.newCore !== props.row.cores ? 'is-custom-warning' : ''
          "
        >
          <CustomInput
            v-model="props.row.newCore"
            inputType="number"
            @input="getCoreValue(props.row)"
          />
        </b-field>
      </b-table-column>
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'
import CustomSelect from '@/components/common/Form/CustomSelect.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  name: 'CreateScenarios',
  mixins: [TooltipMixin, HighlightSearchMixin],
  components: {
    FullTable,
    CustomInput,
    CustomSelect,
    CustomField,
  },
  data() {
    return {
      selectedHosts: [],
      originalHosts: [],
      locationSelected: 'All',
      locationOptions: [],
    }
  },
  async beforeMount() {
    this.locationOptions = _.cloneDeep(this.globalFilters.locationsLicenses)
    this.locationOptions.unshift('All')

    if (this.getCloneLocation) {
      this.locationSelected = this.getCloneLocation
    }

    if (this.getCloneHosts.length > 0) {
      this.selectedHosts = this.getCloneHosts
    }

    await this.fetchHostsData(this.locationSelected)
    this.originalHosts = _.cloneDeep(this.getHostsData)
  },
  methods: {
    ...mapActions(['fetchHostsData', 'createScenario', 'offLoadingTable']),
    ...mapMutations(['SET_PAGE_NUM', 'SET_CLONE_HOSTS']),
    handleSaveScenarios() {
      this.$buefy.dialog.prompt({
        title: 'Set Scenario Name',
        message: 'Please insert a name for this scenario creation!',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: (value) => this.saveScenario(value),
        confirmText: 'Save',
        cancelText: 'Cancel',
      })
    },
    async saveScenario(name) {
      const hosts = this.selectedHosts
        .filter((host) => host.newCore !== host.cores)
        .map((host) => {
          return {
            hostname: host.hostname,
            core: host.newCore,
          }
        })

      const saveScenarios = {
        name: name,
        location: this.locationSelected,
        hosts: hosts,
      }

      await this.createScenario(saveScenarios)
        .then((res) => {
          if (res.status === 200) {
            this.$buefy.toast.open({
              message: `The scenario ${name} was created!`,
              type: 'is-success',
              duration: 5000,
              position: 'is-bottom',
            })
            this.handleClearHosts()
          } else {
            this.$buefy.toast.open({
              message: `Something went wrong with this scenario. Please try again!`,
              type: 'is-danger',
              duration: 5000,
              position: 'is-bottom',
            })
          }
        })
        .then(() => {
          this.SET_PAGE_NUM(1)
          this.offLoadingTable()
        })
    },
    handleClearHosts() {
      this.getHostsData.forEach((host) => {
        const originalHost = this.originalHosts.find(
          (o) => o.hostname === host.hostname
        )
        if (originalHost) {
          host.newCore = originalHost.cores
        }
      })
      this.selectedHosts = []
      this.SET_CLONE_HOSTS([])
    },
    getCoreValue(data) {
      const exists = this.selectedHosts.find(
        (host) => host.hostname === data.hostname
      )

      if (exists) {
        if (data.newCore === data.cores) {
          this.selectedHosts = this.selectedHosts.filter(
            (host) => host.hostname !== data.hostname
          )
        }
      } else {
        if (data.newCore !== data.cores) {
          this.selectedHosts = [...this.selectedHosts, data]
        }
      }
    },
  },
  computed: {
    ...mapState(['globalFilters']),
    ...mapGetters(['getHostsData', 'getCloneLocation', 'getCloneHosts']),
  },
  watch: {
    locationSelected(newValue, oldValue) {
      if (newValue !== oldValue && newValue !== this.getCloneLocation) {
        this.fetchHostsData(newValue)
      }
    },
  },
  beforeDestroy() {
    this.handleClearHosts()
  },
}
</script>

<style lang="scss">
.original-text {
  color: #0c8c29;
  font-weight: bold;
}
.is-custom-warning {
  border-color: #b58003;
  background-color: #f3ca6a;
}
</style>
