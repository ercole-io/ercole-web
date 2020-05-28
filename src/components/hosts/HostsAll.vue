<template>
  <article>
    <BoxContent>
      <div class="table-container">
        <v-table
          :data="paginatedHosts"
          :filters="filters"
          :hideSortIcons="true"
          @selectionChanged="clickedRow = $event"
          class="hosts-table"
        >
          <thead slot="head">
            <tr class="has-background-grey-light">
              <th colspan="4"></th>
              <th
                colspan="3"
                class="has-text-centered border-left border-right"
              >
                Virtual
              </th>
              <th colspan="5"></th>
              <th
                colspan="4"
                class="has-text-centered border-left border-right"
              >
                CPU
              </th>
              <th
                colspan="2"
                class="has-text-centered border-left border-right"
              >
                Agent
              </th>
            </tr>
            <tr class="has-background-grey-lighter">
              <v-th sortKey="hostname">Hostname</v-th>
              <v-th sortKey="env">Env</v-th>
              <v-th sortKey="dbs">DBs</v-th>
              <v-th sortKey="technologie">Tech</v-th>
              <v-th sortKey="platform" class="border-left">Platform</v-th>
              <v-th sortKey="cluster">Cluster</v-th>
              <v-th sortKey="physical" class="border-right">Physical</v-th>
              <v-th sortKey="os">OS</v-th>
              <v-th sortKey="kernel">kernel</v-th>
              <v-th sortKey="memorie">Mem.</v-th>
              <v-th sortKey="swap">Swap</v-th>
              <v-th sortKey="clust">Clust</v-th>
              <v-th sortKey="model" class="border-left">Model</v-th>
              <v-th sortKey="threa">Threa</v-th>
              <v-th sortKey="cores">Cores</v-th>
              <v-th sortKey="socket" class="border-right">Socket</v-th>
              <v-th sortKey="version">Version</v-th>
              <v-th sortKey="last">Updated</v-th>
            </tr>
            <tr>
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
            </tr>
          </thead>
          <tbody slot="body" slot-scope="{ displayData }">
            <v-tr v-for="row in displayData" :key="row._id" :row="row">
              <td>{{ row.Hostname }}</td>
              <td>{{ row.Environment }}</td>
              <td>{{ row.Databases }}</td>
              <td>{{ row.HostType }}</td>
              <td class="border-left">{{ row.platform }}</td>
              <td>{{ row.Cluster === null ? 'no' : row.Cluster }}</td>
              <td class="border-right">
                {{ row.PhysicalHost === null ? 'no' : row.PhysicalHost }}
              </td>
              <td>{{ row.Info.OS }}</td>
              <td>{{ row.Info.Kernel }}</td>
              <td>{{ row.Info.MemoryTotal }}</td>
              <td>{{ row.Info.SwapTotal }}</td>
              <td>{{ row.Info.AixCluster }}</td>
              <td class="border-left">{{ row.Info.CPUModel }}</td>
              <td>{{ row.Info.CPUThreads }}</td>
              <td>{{ row.Info.CPUCores }}</td>
              <td class="border-right">{{ row.Info.Socket }}</td>
              <td>{{ row.Version }}</td>
              <td>{{ row.CreatedAt }}</td>
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
        :total="hosts.length"
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
      >
      </b-pagination>
    </BoxContent>
  </article>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    hosts: {
      type: Array,
      required: true
    }
  },
  components: {
    BoxContent
  },
  data() {
    return {
      filters: {
        hostname: { value: '', keys: ['Hostname'] },
        env: { value: '', keys: ['Environment'] },
        dbs: { value: '', keys: ['Databases'] },
        technologie: { value: '', keys: ['HostType'] },
        platform: { value: '', keys: ['platform'] },
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
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 3,
      size: 'is-small',
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right'
    }
  },
  computed: {
    paginatedHosts() {
      return this.hosts.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage
      )
    }
  },
  watch: {
    clickedRow(row) {
      if (row.length > 0) {
        const hostname = row[0].Hostname
        this.$router.push({
          name: 'hosts-details',
          params: { hostname: hostname }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.hosts-table {
  font-size: 13px;

  thead {
    tr {
      th {
        cursor: pointer;
        text-align: center !important;
        border-width: 0;

        &:first-child {
          text-align: left !important;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        font-size: 12px;
        text-align: center;
        min-width: 100px;
        padding: 0.3em 1em;
        vertical-align: middle;

        &:first-child {
          text-align: left;
        }
      }
    }
  }

  .border-left {
    border-left: 1px solid hsl(0, 0%, 48%) !important;
  }
  .border-right {
    border-right: 1px solid hsl(0, 0%, 48%) !important;
  }
}

.vt-sort:before {
  font-family: 'Font Awesome 5 Free';
  padding-right: 0.5em;
  width: 1.28571429em;
  display: inline-block;
  text-align: center;
}

.vt-sortable:before {
  content: '\f0dc';
}

.vt-asc:before {
  content: '\f106';
}

.vt-desc:before {
  content: '\f107';
}

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
