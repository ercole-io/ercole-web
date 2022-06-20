<template>
  <b-tab-item label="Info" v-if="hasInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column is-4">
        <ul class="db-info">
          <li>Database Details</li>
          <li v-if="dbInfo.status">
            <span>Status</span>
            <span>{{ dbInfo.status }}</span>
          </li>
          <li v-if="dbInfo.role">
            <span>Role</span>
            <span>{{ dbInfo.role }}</span>
          </li>
          <li v-if="dbInfo.dbID">
            <span>Db ID</span>
            <span>{{ dbInfo.dbID }}</span>
          </li>
          <li v-if="dbInfo.uniqueName">
            <span>Unique Name</span>
            <span>{{ dbInfo.uniqueName }}</span>
          </li>
          <li v-if="dbInfo.archivelog">
            <span>Archive Log</span>
            <SimpleBooleanIcon :value="dbInfo.archivelog" />
          </li>
          <li v-if="dbInfo.blockSize">
            <span>Block Size</span>
            <span>{{ dbInfo.blockSize }}</span>
          </li>
          <li v-if="dbInfo.charset">
            <span>Charset</span>
            <span>{{ dbInfo.charset }}</span>
          </li>
          <li v-if="dbInfo.nCharset">
            <span>N Charset</span>
            <span>{{ dbInfo.nCharset }}</span>
          </li>
        </ul>
      </div>

      <div class="column is-4">
        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Memory</li>
              <li v-if="dbInfo.memoryTarget">
                <span>Memory Target</span>
                <SimpleBooleanIcon :value="dbInfo.memoryTarget" />
              </li>
              <li v-if="dbInfo.pgaTarget">
                <span>PGA Target (GB)</span>
                <span>{{ dbInfo.pgaTarget }}</span>
              </li>
              <li v-if="dbInfo.sgaMaxSize">
                <span>SGA MaxSize (GB)</span>
                <span>{{ dbInfo.sgaMaxSize }}</span>
              </li>
              <li v-if="dbInfo.sgaTarget">
                <span>SGA Target (GB)</span>
                <span>{{ dbInfo.sgaTarget }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Resource Utilization</li>
              <li v-if="dbInfo.dbTime">
                <span>Db Time</span>
                <span>{{ dbInfo.dbTime }}</span>
              </li>
              <li v-if="dbInfo.elapsed">
                <span>Elapsed</span>
                <span>{{ dbInfo.elapsed }}</span>
              </li>
              <li v-if="dbInfo.work">
                <span>DB time / Elapsed (min. 1)</span>
                <span>{{ dbInfo.work }}</span>
              </li>
              <li v-if="dbInfo.cpuCount">
                <span>CPU Count</span>
                <span>{{ dbInfo.cpuCount }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="column is-4">
        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Space Utilization</li>
              <li v-if="dbInfo.allocable">
                <span>Allocable (GB)</span>
                <span>{{ dbInfo.allocable }}</span>
              </li>
              <li v-if="dbInfo.allocable">
                <span>DataFile Size (GB)</span>
                <span>{{ dbInfo.allocable }}</span>
              </li>
              <li v-if="dbInfo.segmentsSize">
                <span>Segments Size (GB)</span>
                <span>{{ dbInfo.segmentsSize }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.asm">
                <span>ASM</span>
                <SimpleBooleanIcon :value="dbInfo.asm" />
              </li>
              <li v-if="dbInfo.dataguard">
                <span>Data Guard</span>
                <SimpleBooleanIcon :value="dbInfo.dataguard" />
              </li>
              <li v-if="dbInfo.platform">
                <span>Platform</span>
                <span>{{ dbInfo.platform }}</span>
              </li>
              <li v-if="dbInfo.version">
                <span>Version</span>
                <span>{{ dbInfo.version }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </b-tab-item>
</template>

<script>
import { mapState } from 'vuex'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import { filterOptionsOracle } from '@/helpers/hostDetails/filterOptions/oracle.js'
import SimpleBooleanIcon from '@/components/common/SimpleBooleanIcon.vue'

export default {
  props: {
    dbInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    SimpleBooleanIcon,
  },
  methods: {
    bindIcon(value) {
      return mapBooleanIcon(value)
    },
  },
  computed: {
    ...mapState(['hostDetails']),
    hasInfo() {
      return (
        (this.hostDetails.selectedKeys.length === 1 &&
          this.hostDetails.selectedKeys.includes('name')) ||
        filterOptionsOracle.filter(
          (opt) =>
            this.hostDetails.selectedKeys.includes(opt.value) &&
            opt.group === 'info'
        ).length > 0
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.db-info {
  padding-top: 0;

  li {
    padding: 0 5px;
    font-size: 0.7em;

    span:first-child {
      font-weight: 500;
    }
  }

  li:not(:first-child) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    padding: 3px 6px;

    &:nth-child(odd) {
      background: #f1f1f1;
    }
  }

  li:first-child {
    box-shadow: 0 0.08em 0 lightslategrey;
    font-weight: 600;
    text-transform: uppercase;
    padding-left: 0;
  }
}
</style>
