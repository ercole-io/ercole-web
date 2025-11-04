<template>
  <FullTable
    :keys="['actions', 'name', 'createdAt', 'hostname', 'core', 'location']"
    :tableData="getListScenarios"
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th
        sortKey="actions"
        style="width: 100px; text-align: center !important"
      >
        Actions
      </v-th>
      <v-th sortKey="name">Scenarios</v-th>
      <v-th sortKey="location">Location</v-th>
      <v-th sortKey="createdAt">Created Date</v-th>
      <v-th sortKey="hostname">Hostname</v-th>
      <v-th sortKey="originalCore">Original Core</v-th>
      <v-th sortKey="simulatedCore">Simulated Core</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent isSlot style="text-align: center !important">
        <b-icon
          v-tooltip="`Delete ${rowData.scope.name}`"
          type="is-danger"
          pack="fas"
          icon="trash-alt"
          size="is-small"
          @click.native="handleDeleteScenario(rowData.scope)"
          class="is-clickable mx-2"
        />
        <b-icon
          v-tooltip="`Clone ${rowData.scope.name}`"
          type="is-warning"
          pack="fas"
          icon="clone"
          size="is-small"
          @click.native="handleCloneScenario(rowData.scope)"
          class="is-clickable mx-2"
        />
      </TdContent>
      <TdContent isSlot>
        <a
          href="#"
          @click="detailScenario(rowData.scope)"
          type="is-ghost"
          v-tooltip="options(rowData.scope.name)"
          v-html="highlight(rowData.scope.name)"
        />
      </TdContent>
      <TdContent :value="rowData.scope.location" />
      <TdContent :value="getDateTime(rowData.scope.createdAt)" />
      <td>
        <p
          v-for="item in rowData.scope.hosts"
          :key="item.id"
          v-tooltip="options(item.hostname)"
        >
          {{ item.hostname }}
        </p>
      </td>
      <td>
        <p
          v-for="item in rowData.scope.hosts"
          :key="item.id"
          v-tooltip="options(item.originalCore)"
          class="original-core"
        >
          {{ item.originalCore }}
        </p>
      </td>
      <td>
        <p
          v-for="item in rowData.scope.hosts"
          :key="item.id"
          v-tooltip="options(item.simulatedCore)"
          class="simulated-core"
        >
          {{ item.simulatedCore }}
        </p>
      </td>
    </template>
  </FullTable>
</template>

<script>
import formatDateTime from '@/filters/formatDateTime.js'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
// import CloneModal from '@/views/scenarios/CloneModal.vue'

export default {
  name: 'CreateScenarios',
  mixins: [TooltipMixin, HighlightSearchMixin],
  components: {
    FullTable,
    TdContent,
  },
  data() {
    return {}
  },
  async beforeMount() {
    await this.fetchListScenarios()
  },
  methods: {
    ...mapActions([
      'fetchListScenarios',
      'deleteListScenario',
      'offLoadingTable',
    ]),
    ...mapMutations(['SET_CLONE_HOSTS']),
    handleDeleteScenario(data) {
      this.$buefy.dialog.confirm({
        title: `Delete Scenario`,
        message: `Are you sure you want to <b>delete</b> the scenario <b>${data.name}</b>? This action cannot be undone.`,
        confirmText: 'Confirm',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.deleteScenario(data.id, data.name)
        },
      })
    },
    async deleteScenario(id, name) {
      await this.deleteListScenario(id).then((res) => {
        if (res.status === 204) {
          this.$buefy.toast.open({
            message: `The scenario ${name} was deleted!`,
            type: 'is-success',
            duration: 5000,
            position: 'is-bottom',
          })
          this.fetchListScenarios()
        } else {
          this.$buefy.toast.open({
            message: `Something went wrong with this scenario. Please try again!`,
            type: 'is-danger',
            duration: 5000,
            position: 'is-bottom',
          })
        }
      })
    },
    handleCloneScenario(data) {
      this.SET_CLONE_HOSTS(data)

      this.$router.push({
        name: 'create-scenarios',
      })

      // this.$buefy.modal.open({
      //   component: CloneModal,
      //   hasModalCard: true,
      //   props: {
      //     data: data,
      //   },
      // })
    },
    detailScenario(data) {
      this.$router.push({
        name: 'details-scenarios',
        params: { scenario: data.name, id: data.id },
      })
    },
    getDateTime(date) {
      return formatDateTime(date)
    },
  },
  computed: {
    ...mapGetters(['getListScenarios', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.original-core {
  color: #0c8c29;
  font-weight: bold;
}
.simulated-core {
  color: #b58003;
  font-weight: bold;
}
</style>
