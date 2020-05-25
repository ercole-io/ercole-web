<template>
  <article>
    <PageTitle :pageTitle="`Host Details - ${host.hostname}`" />
    <BoxContent>
      <div class="table-container">
        <table class="hosts-table">
          <thead>
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
              <th>Hostname</th>
              <th>Env</th>
              <th>DBs</th>
              <th>Tech</th>
              <th class="border-left">Platform</th>
              <th>Cluster</th>
              <th class="border-right">Physical</th>
              <th>OS</th>
              <th>kernel</th>
              <th>Mem.</th>
              <th>Swap</th>
              <th>Clust</th>
              <th class="border-left">Model</th>
              <th>threa</th>
              <th>Cores</th>
              <th class="border-right">Socket</th>
              <th>Version</th>
              <th>Last</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ host.hostname }}</td>
              <td>{{ host.env }}</td>
              <td>{{ host.dbs }}</td>
              <td>{{ host.technologie }}</td>
              <td class="border-left">{{ host.platform }}</td>
              <td>{{ host.cluster }}</td>
              <td class="border-right">{{ host.physical }}</td>
              <td>{{ host.os }}</td>
              <td>{{ host.kernel }}</td>
              <td>{{ host.memory }}</td>
              <td>{{ host.swap }}</td>
              <td>{{ host.clust }}</td>
              <td class="border-left">{{ host.model }}</td>
              <td>{{ host.threa }}</td>
              <td>{{ host.cores }}</td>
              <td class="border-right">{{ host.socket }}</td>
              <td>{{ host.version }}</td>
              <td>{{ host.last }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </BoxContent>

    <div class="columns">
      <div class="column is-4">GPUGrowth of {{ host.hostname }}</div>
      <div class="column is-8">Databases of {{ host.hostname }}</div>
    </div>
  </article>
</template>

<script>
const hosts = require('@/data/hosts.json')
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    hostID: {
      required: true
    }
  },
  components: {
    PageTitle,
    BoxContent
  },
  data() {
    return {
      host: null
    }
  },
  created() {
    this.host = hosts.filter(host => {
      return host.id == this.hostID
    })
    this.host = this.host[0]
  }
}
</script>

<style lang="scss" scoped>
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
</style>
