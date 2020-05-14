<template>
  <BoxContent>
    <div class="table-container">
      <table class="table is-narrow is-stripe">
        <thead>
          <tr>
            <th colspan="4"></th>
            <th
              colspan="3"
              class="has-text-centered has-background-grey-lighter"
            >
              Virtual
            </th>
            <th colspan="5"></th>
            <th
              colspan="4"
              class="has-text-centered has-background-grey-lighter"
            >
              CPU
            </th>
            <th
              colspan="2"
              class="has-text-centered has-background-grey-lighter"
            >
              Agent
            </th>
          </tr>
          <tr class="has-background-grey-lighter">
            <th @click="sortBy('hostname')" class="table-head">
              Hostname
            </th>
            <th @click="sortBy('env')" class="table-head">
              Env
            </th>
            <th @click="sortBy('dbs')" class="table-head">
              DBs
            </th>
            <th @click="sortBy('technologie')" class="table-head">
              Tech
            </th>
            <th @click="sortBy('platform')" class="table-head">
              Platform
            </th>
            <th @click="sortBy('cluster')" class="table-head">
              Cluster
            </th>
            <th @click="sortBy('physical')" class="table-head">
              Physical
            </th>
            <th @click="sortBy('os')" class="table-head">
              OS
            </th>
            <th @click="sortBy('kernel')" class="table-head">
              kernel
            </th>
            <th @click="sortBy('memory')" class="table-head">
              Mem.
            </th>
            <th @click="sortBy('swap')" class="table-head">
              Swap
            </th>
            <th @click="sortBy('clust')" class="table-head">
              Clust
            </th>
            <th @click="sortBy('model')" class="table-head">
              Model
            </th>
            <th @click="sortBy('threa')" class="table-head">
              Threa
            </th>
            <th @click="sortBy('cores')" class="table-head">
              Cores
            </th>
            <th @click="sortBy('socket')" class="table-head">
              Socket
            </th>
            <th @click="sortBy('version')" class="table-head">
              Version
            </th>
            <th @click="sortBy('last')" class="table-head">
              Last
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedData" :key="item.id">
            <td class="table-body">{{ item.hostname }}</td>
            <td class="table-body">{{ item.env }}</td>
            <td class="table-body">{{ item.dbs }}</td>
            <td class="table-body">{{ item.technologie }}</td>
            <td class="table-body">{{ item.platform }}</td>
            <td class="table-body">{{ item.cluster }}</td>
            <td class="table-body">{{ item.physical }}</td>
            <td class="table-body">{{ item.os }}</td>
            <td class="table-body">{{ item.kernel }}</td>
            <td class="table-body">{{ item.memory }}</td>
            <td class="table-body">{{ item.swap }}</td>
            <td class="table-body">{{ item.clust }}</td>
            <td class="table-body">{{ item.model }}</td>
            <td class="table-body">{{ item.threa }}</td>
            <td class="table-body">{{ item.cores }}</td>
            <td class="table-body">{{ item.socket }}</td>
            <td class="table-body">{{ item.version }}</td>
            <td class="table-body">{{ item.last }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-field grouped group-multiline>
      <b-select v-model="perPage" size="is-small">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="15">15 per page</option>
        <option value="20">20 per page</option>
        <option value="50">50 per page</option>
      </b-select>
    </b-field>
    <b-pagination
      :total="total"
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
</template>

<script>
const data = require('@/components/Hosts/hosts.json')
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  data() {
    return {
      data: data,
      currentSort: 'hostname',
      currentSortDir: 'asc',
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      size: 'is-small',
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right'
    }
  },
  methods: {
    sortBy(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    sorted() {
      return this.paginated.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    }
  },
  computed: {
    sortedData() {
      return this.sorted()
    },
    paginated() {
      return this.data.slice(
        (this.current - 1) * this.perPage,
        this.current * this.perPage
      )
    },
    total() {
      return this.data.length
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  font-size: 14px;

  .table-head {
    cursor: pointer;
    text-align: center;

    &:first-child {
      text-align: left;
    }
  }

  .table-body {
    text-align: center;
    min-width: 100px;

    &:first-child {
      text-align: left;
    }
  }
}
</style>
