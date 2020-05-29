<template>
  <BoxContent :title="hostTable.Hostname">
    <div class="table-container">
      <table class="hosts-table">
        <thead>
          <tr class="has-background-grey-light">
            <th colspan="4"></th>
            <th colspan="3" class="has-text-centered border-left border-right">
              Virtual
            </th>
            <th colspan="5"></th>
            <th colspan="4" class="has-text-centered border-left border-right">
              CPU
            </th>
            <th colspan="2" class="has-text-centered border-left border-right">
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
            <td>{{ hostTable.Hostname }}</td>
            <td>{{ hostTable.Environment }}</td>
            <td>{{ hostTable.Databases }}</td>
            <td>{{ hostTable.HostType }}</td>
            <td class="border-left">{{ hostTable.platform }}</td>
            <td>{{ hostTable.Cluster === null ? 'no' : hostTable.Cluster }}</td>
            <td class="border-right">
              {{
                hostTable.PhysicalHost === null ? 'no' : hostTable.PhysicalHost
              }}
            </td>
            <td>{{ hostTable.Info.OS }}</td>
            <td>{{ hostTable.Info.Kernel }}</td>
            <td>{{ hostTable.Info.MemoryTotal }}</td>
            <td>{{ hostTable.Info.SwapTotal }}</td>
            <td>{{ hostTable.Info.AixCluster }}</td>
            <td class="border-left">{{ hostTable.Info.CPUModel }}</td>
            <td>{{ hostTable.Info.CPUThreads }}</td>
            <td>{{ hostTable.Info.CPUCores }}</td>
            <td class="border-right">{{ hostTable.Info.Socket }}</td>
            <td>{{ hostTable.Version }}</td>
            <td>{{ hostTable.CreatedAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    hostTable: {
      type: Object,
      required: true
    }
  },
  components: {
    BoxContent
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
</style>
