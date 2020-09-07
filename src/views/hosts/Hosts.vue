<template>
  <section>
    <BoxContent>
      <FullTable
        placeholder="Search on Hosts"
        :keys="keys"
        :tableData="getAllHosts"
        :clickedRow="handleClickedRow"
      >
        <div class="top-table-buttons" slot="customTopHeader">
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

        <template slot="customHeadData">
          <tr
            :class="{
              'has-background-grey-light':
                !hideVirtual || !hideCPU || !hideAgent
            }"
          >
            <th colspan="5"></th>
            <th
              colspan="3"
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
        </template>

        <template slot="headData">
          <v-th sortKey="hostname">Hostname</v-th>
          <v-th sortKey="environment">Env</v-th>
          <v-th sortKey="databases">DBs</v-th>
          <v-th sortKey="techType">Tech</v-th>
          <v-th sortKey="iconCluster">Clust</v-th>
          <v-th
            sortKey="platform"
            class="border-left"
            :class="{ hide: hideVirtual }"
          >
            Platform
          </v-th>
          <v-th sortKey="cluster" :class="{ hide: hideVirtual }">Cluster</v-th>
          <v-th
            sortKey="virtNode"
            :class="{ hide: hideVirtual }"
            class="border-right"
          >
            Node
          </v-th>
          <v-th sortKey="os">OS</v-th>
          <v-th sortKey="kernel">kernel</v-th>
          <v-th sortKey="memorytotal">Mem.</v-th>
          <v-th sortKey="swaptotal">Swap</v-th>

          <v-th sortKey="model" class="border-left" :class="{ hide: hideCPU }">
            Model
          </v-th>
          <v-th sortKey="threads" :class="{ hide: hideCPU }">Threa</v-th>
          <v-th sortKey="cores" :class="{ hide: hideCPU }">Cores</v-th>
          <v-th sortKey="socket" :class="{ hide: hideCPU }">Socket</v-th>
          <v-th
            sortKey="version"
            class="border-left"
            :class="{ hide: hideAgent }"
          >
            Version
          </v-th>
          <v-th sortKey="updated" :class="{ hide: hideAgent }">Updated</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.hostname" />
          <TdContent :value="rowData.scope.environment" />
          <TdArray :value="rowData.scope.databases" />
          <TdContent :value="rowData.scope.techType" />
          <TdIcon :value="rowData.scope.iconCluster" />
          <TdContent
            :value="rowData.scope.platform"
            class="border-left"
            :class="{ hide: hideVirtual }"
          />
          <TdContent
            :value="rowData.scope.cluster"
            :class="{ hide: hideVirtual }"
          />
          <TdContent
            :value="rowData.scope.virtNode"
            class="border-right"
            :class="{ hide: hideVirtual }"
          />
          <TdContent :value="rowData.scope.os" />
          <TdContent :value="rowData.scope.kernel" />
          <TdContent :value="rowData.scope.memorytotal" />
          <TdContent :value="rowData.scope.swaptotal" />
          <TdContent
            :value="rowData.scope.model"
            class="border-left"
            :class="{ hide: hideCPU }"
          />
          <TdContent
            :value="rowData.scope.threads"
            :class="{ hide: hideCPU }"
          />
          <TdContent :value="rowData.scope.cores" :class="{ hide: hideCPU }" />
          <TdContent :value="rowData.scope.socket" :class="{ hide: hideCPU }" />
          <TdContent
            :value="rowData.scope.version"
            class="border-left"
            :class="{ hide: hideAgent }"
          />
          <TdContent
            :value="rowData.scope.updated"
            :class="{ hide: hideAgent }"
          />
        </template>

        <template slot="export">
          <exportButton url="hosts" expName="hosts-data" />
          <exportButton
            url="hosts"
            expName="hosts-lms-data"
            text="LMS Audit File"
            type="LMS"
          />
        </template>
      </FullTable>
    </BoxContent>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import paginationMixin from '@/mixins/paginationMixin.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArray from '@/components/common/Table/TdArray.vue'
import exportButton from '@/components/common/exportButton.vue'

export default {
  mixins: [paginationMixin],
  components: {
    BoxContent,
    FullTable,
    TdContent,
    TdIcon,
    TdArray,
    exportButton
  },
  data() {
    return {
      keys: [
        'hostname',
        'environment',
        'databases',
        'techType',
        'platform',
        'cluster',
        'virtNode',
        'os',
        'kernel',
        'memorytotal',
        'swaptotal',
        'iconCluster',
        'model',
        'threads',
        'cores',
        'socket',
        'version',
        'updated'
      ],
      hideVirtual: true,
      hideCPU: true,
      hideAgent: true
    }
  },
  async beforeMount() {
    await this.getHosts()

    bus.$on('hostDismissedMsg', value => {
      this.$buefy.toast.open({
        message: `The host ${value} was successfully dismissed!`,
        type: 'is-success',
        duration: 5000
      })
    })
  },
  methods: {
    ...mapActions(['getHosts']),
    handleClickedRow($event) {
      if ($event.length > 0) {
        const selectedRow = $event[0].hostname
        this.$router.push({
          name: 'hosts-details',
          params: { hostname: selectedRow }
        })
      }
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  }
}
</script>

<style lang="scss">
.top-table-buttons {
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
