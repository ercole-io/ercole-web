<template>
  <BoxContent>
    <div class="top-table">
      <b-field
        class="search"
        custom-class="is-small"
        label="Search on Hosts"
        horizontal
      >
        <b-input size="is-small" v-model="filters.search.value" />
      </b-field>

      <div class="table-buttons">
        <span class="is-size-7 has-text-weight-medium">Show more info:</span>
        <b-button
          size="is-small"
          :type="hideVirtual ? 'is-light' : 'is-primary'"
          @click="hideVirtual = !hideVirtual"
          rounded
        >
          Virtual
        </b-button>
        <b-button
          size="is-small"
          :type="hideCPU ? 'is-light' : 'is-primary'"
          @click="hideCPU = !hideCPU"
          rounded
        >
          CPU
        </b-button>
        <b-button
          size="is-small"
          :type="hideAgent ? 'is-light' : 'is-primary'"
          @click="hideAgent = !hideAgent"
          rounded
        >
          Agent
        </b-button>
      </div>

      <b-field>
        <b-select v-model="perPage" size="is-small">
          <option value="5" v-if="totalHosts > '5'">5 per page</option>
          <option value="10" v-if="totalHosts > '10'">10 per page</option>
          <option value="15" v-if="totalHosts > '15'">15 per page</option>
          <option value="20" v-if="totalHosts > '20'">20 per page</option>
          <option value="25" v-if="totalHosts > '25'">25 per page</option>
          <option value="50" v-if="totalHosts > '50'">50 per page</option>
          <option :value="totalHosts">All Hosts</option>
        </b-select>
      </b-field>
    </div>

    <div class="table-container">
      <v-table
        :data="paginatedHosts"
        :filters="filters"
        :hideSortIcons="true"
        @selectionChanged="clickedRow = $event"
        class="vTable-custom"
      >
        <thead slot="head">
          <tr
            :class="{
              'has-background-grey-light':
                !hideVirtual || !hideCPU || !hideAgent
            }"
          >
            <th colspan="4"></th>
            <th
              colspan="3"
              class="has-text-centered border-left border-right"
              :class="{ hide: hideVirtual }"
            >
              Virtual
            </th>
            <th colspan="5"></th>
            <th
              colspan="4"
              class="has-text-centered border-left"
              :class="{ hide: hideCPU }"
            >
              CPU
            </th>
            <th
              colspan="2"
              class="has-text-centered border-left"
              :class="{ hide: hideAgent }"
            >
              Agent
            </th>
          </tr>
          <tr class="has-background-grey-lighter">
            <v-th sortKey="hostname">Hostname</v-th>
            <v-th sortKey="environment">Env</v-th>
            <v-th sortKey="databases">DBs</v-th>
            <v-th sortKey="hosttype">Tech</v-th>
            <v-th
              sortKey="platform"
              class="border-left"
              :class="{ hide: hideVirtual }"
              >Platform</v-th
            >
            <v-th sortKey="cluster" :class="{ hide: hideVirtual }"
              >Cluster</v-th
            >
            <v-th
              sortKey="physicalhost"
              class="border-right"
              :class="{ hide: hideVirtual }"
              >Physical</v-th
            >
            <v-th sortKey="os">OS</v-th>
            <v-th sortKey="kernel">kernel</v-th>
            <v-th sortKey="memorytotal">Mem.</v-th>
            <v-th sortKey="swaptotal">Swap</v-th>
            <v-th sortKey="aixcluster">Clust</v-th>
            <v-th sortKey="model" class="border-left" :class="{ hide: hideCPU }"
              >Model</v-th
            >
            <v-th sortKey="threads" :class="{ hide: hideCPU }">Threa</v-th>
            <v-th sortKey="cores" :class="{ hide: hideCPU }">Cores</v-th>
            <v-th sortKey="socket" :class="{ hide: hideCPU }">Socket</v-th>
            <v-th
              sortKey="version"
              class="border-left"
              :class="{ hide: hideAgent }"
              >Version</v-th
            >
            <v-th sortKey="updated" :class="{ hide: hideAgent }">Updated</v-th>
          </tr>
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <v-tr v-for="row in displayData" :key="row._id" :row="row">
            <TdContent :value="row.hostname" />
            <TdContent :value="row.environment" />
            <TdContent :value="row.databases" isArray />
            <TdContent :value="row.hosttype" />
            <TdContent
              :value="row.platform"
              class="border-left"
              :class="{ hide: hideVirtual }"
            />
            <TdContent :value="row.cluster" :class="{ hide: hideVirtual }" />
            <TdContent
              :value="row.physicalhost"
              class="border-right"
              :class="{ hide: hideVirtual }"
            />
            <TdContent :value="row.os" />
            <TdContent :value="row.kernel" />
            <TdContent :value="row.memorytotal" />
            <TdContent :value="row.swaptotal" />
            <TdContent :value="row.aixcluster" hasIcon />
            <TdContent
              :value="row.model"
              class="border-left"
              :class="{ hide: hideCPU }"
            />
            <TdContent :value="row.threads" :class="{ hide: hideCPU }" />
            <TdContent :value="row.cores" :class="{ hide: hideCPU }" />
            <TdContent :value="row.socket" :class="{ hide: hideCPU }" />
            <TdContent
              :value="row.version"
              class="border-left"
              :class="{ hide: hideAgent }"
            />
            <TdContent :value="row.updated" :class="{ hide: hideAgent }" />
          </v-tr>
        </tbody>
      </v-table>
    </div>

    <BoxContent class="is-size-7 has-text-weight-medium has-text-centered">
      Showing {{ perPage }} hosts from {{ totalHosts }}
    </BoxContent>

    <div
      class="is-flex"
      style="justify-content: space-between; margin-bottom: 10px"
    >
      <b-pagination
        :total="totalHosts"
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

      <div class="buttons" style="order: 2;">
        <b-button type="is-primary" size="is-small">Host List File</b-button>
        <b-button type="is-primary" size="is-small">LMS Audit File</b-button>
      </div>
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import TdContent from '@/components/common/TdContent.vue'

export default {
  components: {
    BoxContent,
    TdContent
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
        search: {
          value: '',
          keys: [
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
        }
      },
      clickedRow: [],
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 3,
      size: 'is-small',
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      hideVirtual: true,
      hideCPU: true,
      hideAgent: true
    }
  },
  computed: {
    paginatedHosts() {
      return this.hosts.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage
      )
    },
    totalHosts() {
      return this.hosts.length
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
.top-table {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .search {
    margin-bottom: 0;
  }

  .table-buttons {
    button {
      margin: 0 5px;
    }
  }

  .field-label {
    .label {
      min-width: 100px;
    }
  }
}

.pagination {
  .pagination-previous {
    order: 1;
  }
  .pagination-list {
    order: 2;
    display: flex;
    justify-content: flex-end;
    flex-grow: 0;
  }
  .pagination-next {
    order: 3;
  }
}

.no-margin-bottom {
  margin-bottom: 0 !important;
}

.hide {
  display: none;
}
</style>
