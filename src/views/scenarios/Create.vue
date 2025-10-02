<template>
  <BoxContent title="Select the Hosts you want to Create new Scenarios" border>
    <FullTable
      :tableData="getAllHostsScenarios"
      sortField="hostname"
      :fnCallback="() => getHostsScenarios()"
      hasCheckbox
    >
      <template
        slot="checkboxActions"
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
          centered
          sortable
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
              :customInputDisable="!isRowSelected(props.row)"
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
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/buefy/FullTable.vue'
import CustomInput from '@/components/common/Form/CustomInput.vue'

export default {
  name: 'CreateScenarios',
  mixins: [TooltipMixin, HighlightSearchMixin],
  components: {
    BoxContent,
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
    await this.getHostsScenarios()
    this.originalHosts = _.cloneDeep(this.getAllHostsScenarios)

    bus.$on('tableCheckedRows', (data) => {
      this.selectedHosts = data
    })
  },
  methods: {
    ...mapActions(['getHostsScenarios']),
    handleSaveScenarios() {
      const saveScenarios = this.selectedHosts
        .filter((host) => host.newCore !== host.cores)
        .map((host) => ({
          id: host.id,
          hostname: host.hostname,
          cores: host.cores,
          newCore: host.newCore,
        }))

      // call endpoint to save scenarios
      console.log(saveScenarios)
    },
    handleClearHosts() {
      this.getAllHostsScenarios.forEach((host) => {
        const originalHost = this.originalHosts.find((o) => o.id === host.id)
        if (originalHost) {
          host.newCore = originalHost.newCore
        }
      })
      this.selectedHosts = []
      bus.$emit('tableCheckedRows', this.selectedHosts)
    },
    isRowSelected(row) {
      return this.selectedHosts.some((host) => host.id === row.id)
    },
  },
  computed: {
    ...mapGetters(['getAllHostsScenarios']),
    listSelected() {
      return this.selectedHosts
    },
  },
}
</script>

<style lang="scss">
.is-custom-warning {
  border-color: #b58003;
  background-color: #f3ca6a;
}
</style>
