<template>
  <b-tab-item label="Info">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Database Details</li>
              <li>
                <span>Db Name</span>
                <span>{{ dbInfo.name }}</span>
              </li>
              <li>
                <span>Db ID</span>
                <span>{{ dbInfo.databaseID }}</span>
              </li>
              <li>
                <span>Collation Name</span>
                <span>{{ dbInfo.collationName }}</span>
              </li>
              <li>
                <span>Status</span>
                <span>{{ dbInfo.status }}</span>
              </li>
              <li>
                <span>Recovery Model</span>
                <span>{{ dbInfo.recoveryModel }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Memory</li>
              <li>
                <span>Max Server Memory</span>
                <span>{{ dbInfo.maxServerMemory }}</span>
              </li>
              <li>
                <span>Min Server Memory</span>
                <span>{{ dbInfo.minServerMemory }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li>
                <span>Affinity Mask</span>
                <span>{{ dbInfo.affinityMask }}</span>
              </li>
              <li>
                <span>Allocation</span>
                <span>{{ dbInfo.alloc }}</span>
              </li>
              <li>
                <span>Block Size</span>
                <span>{{ dbInfo.blockSize }}</span>
              </li>
              <li>
                <span>CTP</span>
                <span>{{ dbInfo.ctp }}</span>
              </li>
              <li>
                <span>Max Dop</span>
                <span>{{ dbInfo.maxDop }}</span>
              </li>
              <li>
                <span>Schedulers Count</span>
                <span>{{ dbInfo.schedulersCount }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </b-tab-item>
</template>

<script>
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  props: {
    dbInfo: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    bindIcon(value) {
      return mapBooleanIcon(value)
    },
  },
  // computed: {
  //   info() {
  //     return {
  //       name: this.dbInfo.name,
  //       platform: this.dbInfo.platform,
  //       edition: this.dbInfo.edition,
  //       engine: this.dbInfo.engine,
  //       architecture: this.dbInfo.architecture,
  //       sortBufferSize: this.dbInfo.sortBufferSize,
  //       logBufferSize: this.dbInfo.logBufferSize,
  //       bufferPoolSize: this.dbInfo.bufferPoolSize,
  //       readOnly: this.dbInfo.readOnly,
  //       redoLogEnabled: this.dbInfo.redoLogEnabled,
  //       threadsConcurrency: this.dbInfo.threadsConcurrency,
  //       charsetServer: this.dbInfo.charsetServer,
  //       charsetSystem: this.dbInfo.charsetSystem,
  //       pageSize: this.dbInfo.pageSize,
  //       version: this.dbInfo.version,
  //     }
  //   },
  // },
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
