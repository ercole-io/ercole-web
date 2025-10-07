<template>
  <FullTable
    :tableData="getHostsData"
    sortField="hostname"
    :fnCallback="() => fetchHostsData()"
  >
    <template
      slot="noCheckboxActions"
      v-if="selectedHosts && selectedHosts.length > 0"
    >
      <b-button
        :label="`Clear All selected (${selectedHosts.length})`"
        size="is-small"
        type="is-dark"
        icon-left="close"
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

    <template slot="cols">
      <b-table-column
        field="hostname"
        label="Hostname"
        left
        sortable
        width="300"
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.hostname)"
          v-html="highlight(props.row.hostname)"
        />
      </b-table-column>

      <b-table-column
        field="newCore"
        label="New Cores"
        centered
        sortable
        width="100"
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

      <b-table-column
        field="cores"
        label="Cores"
        centered
        sortable
        v-slot="props"
      >
        <span
          v-tooltip="options(props.row.cores)"
          v-html="highlight(props.row.cores)"
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
    </template>
  </FullTable>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'

export default {
  name: 'CreateScenarios',
  mixins: [TooltipMixin, HighlightSearchMixin],
  components: {
    FullTable,
    CustomInput,
  },
  data() {
    return {
      selectedHosts: [],
      originalHosts: [],
    }
  },
  async beforeMount() {
    await this.fetchHostsData()
    this.originalHosts = _.cloneDeep(this.getHostsData)
  },
  methods: {
    ...mapActions(['fetchHostsData', 'createScenario']),
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
        hosts: hosts,
      }

      console.log(saveScenarios)
      this.handleClearHosts()

      // this.createScenario(saveScenarios).then((res) => {
      //   if (res.status === 200) {
      //     this.$buefy.toast.open({
      //       message: `The scenario ${name} was created!`,
      //       type: 'is-success',
      //       duration: 5000,
      //       position: 'is-bottom',
      //     })
      //     this.handleClearHosts()
      //   } else {
      //     this.$buefy.toast.open({
      //       message: `Something went wrong with this scenario. Please try again!`,
      //       type: 'is-danger',
      //       duration: 5000,
      //       position: 'is-bottom',
      //     })
      //   }
      // })
    },
    handleClearHosts() {
      this.getHostsData.forEach((host) => {
        const originalHost = this.originalHosts.find((o) => o.id === host.id)
        if (originalHost) {
          host.newCore = originalHost.newCore
        }
      })
      this.selectedHosts = []
    },
    getCoreValue(data) {
      const exists = this.selectedHosts.find((host) => host.id === data.id)

      if (exists) {
        if (data.newCore === data.cores) {
          this.selectedHosts = this.selectedHosts.filter(
            (host) => host.id !== data.id
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
    ...mapGetters(['getHostsData']),
  },
}
</script>

<style lang="scss">
.is-custom-warning {
  border-color: #b58003;
  background-color: #f3ca6a;
}
</style>
