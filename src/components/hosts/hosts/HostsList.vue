<template>
  <BoxContent>
    <b-field label="Search on Hosts" label-position="on-border">
      <b-input size="is-small" v-model="search" @input="handleSearch" />
    </b-field>

    <div class="table-container">
      <v-table
        :data="paginatedHosts"
        :filters="filters"
        :hideSortIcons="true"
        @selectionChanged="clickedRow = $event"
        class="vTable-custom"
      >
        <thead slot="head">
          <tr class="has-background-grey-light">
            <th colspan="4"></th>
            <th colspan="3" class="has-text-centered border-left border-right">
              Virtual
            </th>
            <th colspan="5"></th>
            <th colspan="4" class="has-text-centered border-left border-right">
              CPU
            </th>
            <th colspan="2" class="has-text-centered border-left">
              Agent
            </th>
          </tr>
          <tr class="has-background-grey-lighter">
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="environment">Env</v-th>
            <v-th sortKey="databases">DBs</v-th>
            <v-th sortKey="hosttype">Tech</v-th>
            <v-th sortKey="platform" class="border-left">Platform</v-th>
            <v-th sortKey="cluster">Cluster</v-th>
            <v-th sortKey="physicalhost" class="border-right">Physical</v-th>
            <v-th sortKey="os">OS</v-th>
            <v-th sortKey="kernel">kernel</v-th>
            <v-th sortKey="memorytotal">Mem.</v-th>
            <v-th sortKey="swaptotal">Swap</v-th>
            <v-th sortKey="aixcluster">Clust</v-th>
            <v-th sortKey="model" class="border-left">Model</v-th>
            <v-th sortKey="threads">Threa</v-th>
            <v-th sortKey="cores">Cores</v-th>
            <v-th sortKey="socket" class="border-right">Socket</v-th>
            <v-th sortKey="version">Version</v-th>
            <v-th sortKey="updated">Updated</v-th>
          </tr>
          <!-- <tr>
            <th>
              <b-input size="is-small" v-model="filters.hostname.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.env.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.dbs.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.technologie.value" />
            </th>
            <th class="border-left">
              <b-input size="is-small" v-model="filters.platform.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.cluster.value" />
            </th>
            <th class="border-right">
              <b-input size="is-small" v-model="filters.physical.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.os.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.kernel.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.memory.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.swap.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.clust.value" />
            </th>
            <th class="border-left">
              <b-input size="is-small" v-model="filters.model.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.threa.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.cores.value" />
            </th>
            <th class="border-right">
              <b-input size="is-small" v-model="filters.socket.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.version.value" />
            </th>
            <th>
              <b-input size="is-small" v-model="filters.last.value" />
            </th>
          </tr> -->
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <v-tr v-for="row in displayData" :key="row._id" :row="row">
            <td>{{ row.hostname }}</td>
            <td>{{ row.environment }}</td>
            <td>{{ row.databases }}</td>
            <td>{{ row.hosttype }}</td>
            <td class="border-left">{{ row.platform }}</td>
            <td>{{ row.cluster === null ? 'no' : row.cluster }}</td>
            <td class="border-right">
              {{ row.physicalhost === null ? 'no' : row.physicalhost }}
            </td>
            <td>{{ row.os }}</td>
            <td>{{ row.kernel }}</td>
            <td>{{ row.memorytotal }}</td>
            <td>{{ row.swaptotal }}</td>
            <td>{{ row.aixcluster }}</td>
            <td class="border-left">{{ row.model }}</td>
            <td>{{ row.threads }}</td>
            <td>{{ row.cores }}</td>
            <td class="border-right">{{ row.socket }}</td>
            <td>{{ row.version }}</td>
            <td>{{ row.updated }}</td>
          </v-tr>
        </tbody>
      </v-table>
    </div>

    <div
      class="is-flex"
      style="justify-content: space-between; margin-bottom: 10px"
    >
      <b-field class="is-margin-bottom-less">
        <b-select v-model="perPage" size="is-small" style="order: 1;">
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="15">15 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </b-select>
      </b-field>

      <div class="buttons" style="order: 2;">
        <b-button type="is-primary" size="is-small">Host List File</b-button>
        <b-button type="is-primary" size="is-small">LMS Audit File</b-button>
      </div>
    </div>

    <b-pagination
      :total="results.length"
      :current.sync="current"
      :range-before="rangeBefore"
      :range-after="rangeAfter"
      :size="size"
      :per-page="perPage"
      :icon-prev="prevIcon"
      :icon-next="nextIcon"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
    />
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  props: {
    hosts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      filters: {
        hostname: { value: '', keys: ['Hostname'] },
        env: { value: '', keys: ['Environment'] },
        dbs: { value: '', keys: ['Databases'] },
        technologie: { value: '', keys: ['HostType'] },
        platform: { value: '', keys: ['Platform'] },
        cluster: { value: '', keys: ['Cluster'] },
        physical: { value: '', keys: ['PhysicalHost'] },
        os: { value: '', keys: ['Info.OS'] },
        kernel: { value: '', keys: ['Info.Kernel'] },
        memory: { value: '', keys: ['Info.MemoryTotal'] },
        swap: { value: '', keys: ['Info.SwapTotal'] },
        clust: { value: '', keys: ['Info.AixCluster'] },
        model: { value: '', keys: ['Info.CPUModel'] },
        threa: { value: '', keys: ['Info.CPUThreads'] },
        cores: { value: '', keys: ['Info.CPUCores'] },
        socket: { value: '', keys: ['Info.Socket'] },
        version: { value: '', keys: ['Version'] },
        last: { value: '', keys: ['CreatedAt'] }
      },
      clickedRow: [],
      current: 1,
      perPage: 5,
      rangeBefore: 3,
      rangeAfter: 3,
      size: 'is-small',
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      search: '',
      results: []
    }
  },
  created() {
    this.results = this.hosts
  },
  methods: {
    handleSearch() {
      if (this.search) {
        this.$search(this.search, this.results, {
          include: ['score', 'matches'],
          shouldSort: true,
          threshold: 0.5,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 3,
          matchAllTokens: true,
          keys: [
            'hostname',
            'hostname',
            'environment',
            'databases',
            'hosttype',
            'platform',
            'cluster',
            'physicalhost',
            'os',
            'kernel',
            'memorytotal',
            'swaptotal',
            'aixcluster',
            'model',
            'threads',
            'cores',
            'socket',
            'version',
            'updated'
          ]
        }).then(result => {
          this.results = result
        })
      }
      this.results = this.hosts
    }
  },
  computed: {
    paginatedHosts() {
      return this.results.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage
      )
    }
  },
  watch: {
    clickedRow(row) {
      if (row.length > 0) {
        const hostname = row[0].hostname
        this.$router.replace({
          name: 'hosts-details',
          params: { hostname: hostname }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.pagination {
  .pagination-previous {
    order: 1;
  }
  .pagination-list {
    order: 2;
    justify-content: center;
  }
  .pagination-next {
    order: 3;
  }
}

.is-margin-bottom-less {
  margin-bottom: 0 !important;
}
</style>
