<template>
  <div class="columns is-mobile is-multiline">
    <div class="column">
      <div class="columns">
        <div class="column">
          <ul class="db-info">
            <li>Database Details</li>
            <li>
              <span>Db Name</span>
              <span>{{ info.dbName }}</span>
            </li>
            <li>
              <span>Charset</span>
              <span>{{ info.charset }}</span>
            </li>
            <li>
              <span>Collections</span>
              <span>{{ info.collections }}</span>
            </li>
            <li>
              <span>Objects</span>
              <span>{{ info.objects }}</span>
            </li>
            <li>
              <span>Users</span>
              <span>{{ info.objects }}</span>
            </li>
            <li>
              <span>Views</span>
              <span>{{ info.views }}</span>
            </li>
            <li>
              <span>Indexes</span>
              <span>{{ info.indexes }}</span>
            </li>
            <li>
              <span>Shard DBs</span>
              <span>{{ info.shardDBs }}</span>
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="db-info">
            <li>Additional Info</li>
            <li>
              <span>Data Size</span>
              <span>{{ info.dataSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Free Storage Size</span>
              <span>{{ info.freeStorageSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Fs Total Size</span>
              <span>{{ info.fsTotalSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Fs Used Size</span>
              <span>{{ info.fsUsedSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Index Free Storage Size</span>
              <span>{{
                info.indexFreeStorageSize | prettyBytes(1, true)
              }}</span>
            </li>
            <li>
              <span>Index Size</span>
              <span>{{ info.indexSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Storage Size</span>
              <span>{{ info.storageSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Total Free Storage Size</span>
              <span>{{
                info.totalFreeStorageSize | prettyBytes(1, true)
              }}</span>
            </li>
            <li>
              <span>Total Size</span>
              <span>{{ info.totalSize | prettyBytes(1, true) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hosts-details-microsoft-databases-dbs-info-component',
  props: {
    info: {
      type: Object,
      default: () => {},
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
