<template>
  <FullTable
    :keys="['actions', 'name', 'createdAt', 'hostname', 'core']"
    :tableData="getListScenarios"
    @clickedRow="handleClickedRow"
    isClickable
    :isLoadingTable="loadingTableStatus"
  >
    <template slot="headData">
      <v-th sortKey="actions">Actions</v-th>
      <v-th sortKey="name">Scenarios</v-th>
      <v-th sortKey="createdAt">Created Date</v-th>
      <v-th sortKey="hostname">Hostname</v-th>
      <v-th sortKey="core">Core</v-th>
    </template>

    <template slot="bodyData" slot-scope="rowData">
      <TdContent isSlot>
        <b-icon
          v-tooltip="`Delete ${rowData.scope.name}`"
          type="is-danger"
          pack="fas"
          icon="trash-alt"
          size="is-small"
          @click.native="deleteScenario(rowData.scope)"
          class="is-clickable"
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
      <TdContent :value="getDateTime(rowData.scope.createdAt)" />
      <td>
        <p
          v-for="item in rowData.scope.data"
          :key="item.name"
          v-tooltip="options(item.hostname)"
        >
          {{ item.hostname }}
        </p>
      </td>
      <td>
        <p
          v-for="item in rowData.scope.data"
          :key="item.name"
          v-tooltip="options(item.core)"
        >
          {{ item.core }}
        </p>
      </td>
    </template>
  </FullTable>
</template>

<script>
// import _ from 'lodash'
// import { bus } from '@/helpers/eventBus.js'
import formatDateTime from '@/filters/formatDateTime.js'
import { mapActions, mapGetters } from 'vuex'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
// import FullTable from '@/components/common/Table/buefy/FullTable.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

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
    ...mapActions(['fetchListScenarios']),
    deleteScenario(data) {
      console.log(data)
    },
    detailScenario(data) {
      console.log(data)
    },
    getDateTime(date) {
      return formatDateTime(date)
    },
    handleClickedRow() {},
  },
  computed: {
    ...mapGetters(['getListScenarios', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss"></style>
