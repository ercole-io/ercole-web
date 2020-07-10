<template>
  <BoxContent>
    <TopTable>
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

      <SelectPerPage :totalItem="totalHosts" />
    </TopTable>

    <div class="table-container">
      <v-table
        :data="hosts"
        :filters="filters"
        :hideSortIcons="true"
        :currentPage.sync="currentPage"
        :pageSize="perPage"
        @totalPagesChanged="totalPages = $event"
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
              colspan="4"
              class="has-text-centered border-left border-right"
              :class="{ hide: hideVirtual }"
            >
              Virtual
            </th>
            <th colspan="4"></th>
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
            <v-th sortKey="physicalhost" :class="{ hide: hideVirtual }"
              >Physical</v-th
            >
            <v-th
              sortKey="aixcluster"
              class="border-right"
              :class="{ hide: hideVirtual }"
              >Clust</v-th
            >
            <v-th sortKey="os">OS</v-th>
            <v-th sortKey="kernel">kernel</v-th>
            <v-th sortKey="memorytotal">Mem.</v-th>
            <v-th sortKey="swaptotal">Swap</v-th>

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
              :class="{ hide: hideVirtual }"
            />
            <TdContent
              :value="row.aixcluster"
              class="border-right"
              :class="{ hide: hideVirtual }"
              hasIcon
            />
            <TdContent :value="row.os" />
            <TdContent :value="row.kernel" />
            <TdContent :value="row.memorytotal" />
            <TdContent :value="row.swaptotal" />
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

    <BottomTable>
      <template slot="info">
        Showing {{ perPage }} hosts from {{ totalHosts }}
      </template>
      <template>
        <smart-pagination
          :currentPage.sync="currentPage"
          :totalPages="totalPages"
        />

        <div class="buttons">
          <b-button type="is-primary" size="is-small">Host List File</b-button>
          <b-button type="is-primary" size="is-small">LMS Audit File</b-button>
        </div>
      </template>
    </BottomTable>
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import BoxContent from '@/components/common/BoxContent.vue'
import TdContent from '@/components/common/TdContent.vue'
import SelectPerPage from '@/components/common/SelectPerPage.vue'
import TopTable from '@/components/common/TopTable.vue'
import BottomTable from '@/components/common/BottomTable.vue'

export default {
  components: {
    BoxContent,
    TdContent,
    SelectPerPage,
    TopTable,
    BottomTable
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
      currentPage: 1,
      totalPages: 0,
      perPage: 10,
      paginatedItems: [],
      hideVirtual: true,
      hideCPU: true,
      hideAgent: true
    }
  },
  created() {
    bus.$on('changePerPage', value => {
      this.perPage = value
    })
  },
  computed: {
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
.search {
  margin-bottom: 0;

  .field-label {
    .label {
      min-width: 100px;
    }
  }
}

.table-buttons {
  button {
    margin: 0 5px;
  }
}

.no-margin-bottom {
  margin-bottom: 0 !important;
}

.hide {
  display: none;
}
</style>
