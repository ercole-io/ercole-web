<template>
  <div class="table-container" v-if="hostTable">
    <table class="vTable-custom">
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
          <th colspan="2" class="has-text-centered border-left">
            Agent
          </th>
        </tr>
        <tr class="has-background-grey-lighter">
          <th>Hostname</th>
          <th>Env</th>
          <th>Filesys</th>
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
          <td>{{ hostTable.hostname }}</td>
          <td>{{ hostTable.environment }}</td>
          <td>
            <a
              v-for="(filesys, index) in hostTable.filesys"
              :key="index"
              :href="filesys.Filesystem"
              target="_blank"
              class="is-block"
            >
              {{ filesys.Available }}
              <b-icon icon="download" type="is-dark" size="is-small" />
            </a>
          </td>
          <td>{{ hostTable.hostType }}</td>
          <td class="border-left">{{ hostTable.platform }}</td>
          <td>{{ hostTable.cluster === null ? 'no' : hostTable.cluster }}</td>
          <td class="border-right">
            {{
              hostTable.physicalHost === null ? 'no' : hostTable.physicalHost
            }}
          </td>
          <td>{{ hostTable.os }}</td>
          <td>{{ hostTable.kernel }}</td>
          <td>{{ hostTable.memoryTotal }}</td>
          <td>{{ hostTable.swapTotal }}</td>
          <td>{{ hostTable.aixCluster }}</td>
          <td class="border-left">{{ hostTable.model }}</td>
          <td>{{ hostTable.threads }}</td>
          <td>{{ hostTable.cores }}</td>
          <td class="border-right">{{ hostTable.socket }}</td>
          <td>{{ hostTable.version }}</td>
          <td>{{ hostTable.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    hostTable: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
