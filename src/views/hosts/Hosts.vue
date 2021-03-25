<template>
  <section>
    <div class="columns is-desktop">
      <div class="column is-3">
        <div
          class="is-flex is-justify-content-center is-align-items-center mb-5"
        >
          <span class="is-size-7 has-text-weight-medium mr-2">
            Show more info:
          </span>
          <b-button
            class="mr-1"
            size="is-small"
            :type="hideVirtual ? 'is-light' : 'is-primary'"
            @click="hideVirtual = !hideVirtual"
          >
            Virtual
          </b-button>
          <b-button
            class="mr-1"
            size="is-small"
            :type="hideCPU ? 'is-light' : 'is-primary'"
            @click="hideCPU = !hideCPU"
          >
            CPU
          </b-button>
          <b-button
            class="mr-1"
            size="is-small"
            :type="hideAgent ? 'is-light' : 'is-primary'"
            @click="hideAgent = !hideAgent"
          >
            Agent
          </b-button>
        </div>
        <HostsFilters v-if="isMounted" />
      </div>
      <div class="column is-9">
        <BoxContent :mbottom="false">
          <FullTable
            placeholder="Search on Hosts"
            :keys="keys"
            :tableData="getAllHosts"
            @clickedRow="handleClickedRow"
            isClickable
          >
            <template
              slot="customHeadData"
              v-if="!hideVirtual || !hideCPU || !hideAgent"
            >
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
            </template>

            <template slot="headData">
              <v-th sortKey="hostname">Hostname</v-th>
              <v-th sortKey="environment">Env</v-th>
              <v-th sortKey="databases">DBs</v-th>
              <v-th sortKey="techType">Tech</v-th>
              <v-th
                sortKey="platform"
                class="border-left"
                :class="{ hide: hideVirtual }"
              >
                Platform
              </v-th>
              <v-th sortKey="cluster" :class="{ hide: hideVirtual }"
                >Cluster</v-th
              >
              <v-th
                sortKey="virtNode"
                :class="{ hide: hideVirtual }"
                class="border-right"
              >
                Node
              </v-th>
              <v-th sortKey="os">OS</v-th>
              <v-th sortKey="iconCluster">Clust</v-th>
              <v-th sortKey="kernel">Kernel</v-th>
              <v-th sortKey="memorytotal">Mem.</v-th>
              <v-th sortKey="swaptotal">Swap</v-th>

              <v-th
                sortKey="model"
                class="border-left"
                :class="{ hide: hideCPU }"
              >
                Processor Model
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
              <v-th sortKey="updated" :class="{ hide: hideAgent }"
                >Updated</v-th
              >
            </template>

            <template slot="bodyData" slot-scope="rowData">
              <HostLink :hostname="rowData.scope.hostname" />
              <TdContent :value="rowData.scope.environment" />
              <TdArrayMore :value="rowData.scope.databases" />
              <TdContent :value="rowData.scope.techType" />
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
              <TdIcon :value="rowData.scope.iconCluster" />
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
              <TdContent
                :value="rowData.scope.cores"
                :class="{ hide: hideCPU }"
              />
              <TdContent
                :value="rowData.scope.socket"
                :class="{ hide: hideCPU }"
              />
              <TdContent
                :value="rowData.scope.version"
                class="border-left"
                :class="{ hide: hideAgent }"
              />
              <TdContent
                :value="rowData.scope.updated"
                dataType="date"
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
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import exportButton from '@/components/common/exportButton.vue'
import HostsFilters from '@/components/hosts/hosts/HostsFilters.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin, hostnameLinkRow],
  components: {
    BoxContent,
    FullTable,
    TdContent,
    TdIcon,
    TdArrayMore,
    exportButton,
    HostsFilters,
    HostLink
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
      hideAgent: true,
      isMounted: false
    }
  },
  async beforeMount() {
    await this.getHosts().then(() => (this.isMounted = true))
  },
  methods: {
    ...mapActions(['getHosts']),
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  }
}
</script>

<style lang="scss">
.no-margin-bottom {
  margin-bottom: 0 !important;
}

.hide {
  display: none;
}
</style>
