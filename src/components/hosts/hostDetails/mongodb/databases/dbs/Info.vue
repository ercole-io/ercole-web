<template>
  <div class="columns is-mobile is-multiline" v-if="dbInfo">
    <div class="column">
      <div class="columns">
        <div class="column">
          <ul class="db-info">
            <li>Database Details</li>
            <li>
              <span>Db Name</span>
              <span
                v-tooltip.right="options(dbInfo.dbName)"
                v-html="highlight(toString(dbInfo.dbName))"
              />
            </li>
            <li>
              <span>Charset</span>
              <span
                v-tooltip.right="options(dbInfo.charset)"
                v-html="highlight(toString(dbInfo.charset))"
              />
            </li>
            <li>
              <span>Collections</span>
              <span
                v-tooltip.right="options(dbInfo.collections)"
                v-html="highlight(toString(dbInfo.collections))"
              />
            </li>
            <li>
              <span>Objects</span>
              <span
                v-tooltip.right="options(dbInfo.objects)"
                v-html="highlight(toString(dbInfo.objects))"
              />
            </li>
            <li>
              <span>Users</span>
              <span
                v-tooltip.right="options(dbInfo.users)"
                v-html="highlight(toString(dbInfo.users))"
              />
            </li>
            <li>
              <span>Views</span>
              <span
                v-tooltip.right="options(dbInfo.views)"
                v-html="highlight(toString(dbInfo.views))"
              />
            </li>
            <li>
              <span>Indexes</span>
              <span
                v-tooltip.right="options(dbInfo.indexes)"
                v-html="highlight(toString(dbInfo.indexes))"
              />
            </li>
            <li>
              <span>Shard DBs</span>
              <span
                v-tooltip.right="options(dbInfo.shardDBs)"
                v-html="highlight(toString(dbInfo.shardDBs))"
              />
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="db-info">
            <li>Additional Info</li>
            <li>
              <span>Data Size</span>
              <span
                v-tooltip.right="options(dbInfo.dataSize)"
                v-html="highlight(toString(dbInfo.dataSize))"
              />
            </li>
            <li>
              <span>Free Storage Size</span>
              <span
                v-tooltip.right="options(dbInfo.freeStorageSize)"
                v-html="highlight(toString(dbInfo.freeStorageSize))"
              />
            </li>
            <li>
              <span>Fs Total Size</span>
              <span
                v-tooltip.right="options(dbInfo.fsTotalSize)"
                v-html="highlight(toString(dbInfo.fsTotalSize))"
              />
            </li>
            <li>
              <span>Fs Used Size</span>
              <span
                v-tooltip.right="options(dbInfo.fsUsedSize)"
                v-html="highlight(toString(dbInfo.fsUsedSize))"
              />
            </li>
            <li>
              <span>Index Free Storage Size</span>
              <span
                v-tooltip.right="options(dbInfo.indexFreeStorageSize)"
                v-html="highlight(toString(dbInfo.indexFreeStorageSize))"
              />
            </li>
            <li>
              <span>Index Size</span>
              <span
                v-tooltip.right="options(dbInfo.indexSize)"
                v-html="highlight(toString(dbInfo.indexSize))"
              />
            </li>
            <li>
              <span>Storage Size</span>
              <span
                v-tooltip.right="options(dbInfo.storageSize)"
                v-html="highlight(toString(dbInfo.storageSize))"
              />
            </li>
            <li>
              <span>Total Free Storage Size</span>
              <span
                v-tooltip.right="options(dbInfo.totalFreeStorageSize)"
                v-html="highlight(toString(dbInfo.totalFreeStorageSize))"
              />
            </li>
            <li>
              <span>Total Size</span>
              <span
                v-tooltip.right="options(dbInfo.totalSize)"
                v-html="highlight(toString(dbInfo.totalSize))"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

export default {
  name: 'hosts-details-microsoft-databases-dbs-info-component',
  mixins: [infoMixin],
  props: {
    dbInfo: {
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
