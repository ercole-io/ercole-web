<template>
  <article>
    <BoxContent>
      <div class="table-container">
        <v-table
          :data="paginatedData"
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
              <v-th sortKey="threa">v-threa</v-th>
              <v-th sortKey="cores">Cores</v-th>
              <v-th sortKey="socket" class="border-right">Socket</v-th>
              <v-th sortKey="version">Version</v-th>
              <v-th sortKey="last">Last</v-th>
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
            <v-tr v-for="row in displayData" :key="row.id" :row="row">
              <td>{{ row.hostname }}</td>
              <td>{{ row.env }}</td>
              <td>{{ row.dbs }}</td>
              <td>{{ row.technologie }}</td>
              <td class="border-left">{{ row.platform }}</td>
              <td>{{ row.cluster }}</td>
              <td class="border-right">{{ row.physical }}</td>
              <td>{{ row.os }}</td>
              <td>{{ row.kernel }}</td>
              <td>{{ row.memory }}</td>
              <td>{{ row.swap }}</td>
              <td>{{ row.clust }}</td>
              <td class="border-left">{{ row.model }}</td>
              <td>{{ row.threa }}</td>
              <td>{{ row.cores }}</td>
              <td class="border-right">{{ row.socket }}</td>
              <td>{{ row.version }}</td>
              <td>{{ row.last }}</td>
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
        :total="totalData"
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
const hosts = require('@/data/hosts.json')
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  data() {
    return {
      hosts,
      filters: {
        hostname: { value: '', keys: ['hostname'] },
        env: { value: '', keys: ['env'] },
        dbs: { value: '', keys: ['dbs'] },
        technologie: { value: '', keys: ['technologie'] },
        platform: { value: '', keys: ['platform'] },
        cluster: { value: '', keys: ['cluster'] },
        physical: { value: '', keys: ['physical'] },
        os: { value: '', keys: ['os'] },
        kernel: { value: '', keys: ['kernel'] },
        memory: { value: '', keys: ['memory'] },
        swap: { value: '', keys: ['swap'] },
        clust: { value: '', keys: ['clust'] },
        model: { value: '', keys: ['model'] },
        threa: { value: '', keys: ['threa'] },
        cores: { value: '', keys: ['cores'] },
        socket: { value: '', keys: ['socket'] },
        version: { value: '', keys: ['version'] },
        last: { value: '', keys: ['last'] }
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
    paginatedData() {
      return this.hosts.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage
      )
    },
    totalData() {
      return this.hosts.length
    }
  },
  watch: {
    clickedRow(row) {
      if (row.length > 0) {
        const hostID = row[0].id
        this.$router.push({
          name: 'hosts-details',
          params: { hostID: hostID }
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
