<template>
  <b-tab-item label="Info" class="databasesInfo" v-if="hasInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Database Details</li>
              <b-carousel-list>
                <span>Db Name</span>
                <span
                  v-tooltip.right="options(dbInfo.dbName)"
                  v-html="highlight(dbInfo.dbName)"
                />
              </b-carousel-list>
              <li>
                <span>Charset</span>
                <span
                  v-tooltip.right="options(dbInfo.charset)"
                  v-html="highlight(dbInfo.charset)"
                />
              </li>
              <li>
                <span>Collections</span>
                <span
                  v-tooltip.right="options(dbInfo.collections)"
                  v-html="highlight(dbInfo.collections)"
                />
              </li>
              <li>
                <span>Objects</span>
                <span
                  v-tooltip.right="options(dbInfo.objects)"
                  v-html="highlight(dbInfo.objects)"
                />
              </li>
              <li>
                <span>Shard DBs</span>
                <SimpleBooleanIcon
                  :value="dbInfo.shardDBs"
                  v-tooltip.right="options(dbInfo.shardDBs)"
                />
              </li>
              <li>
                <span>Users</span>
                <span
                  v-tooltip.right="options(dbInfo.users)"
                  v-html="highlight(dbInfo.users)"
                />
              </li>
              <li>
                <span>Views</span>
                <span
                  v-tooltip.right="options(dbInfo.views)"
                  v-html="highlight(dbInfo.views)"
                />
              </li>
              <li>
                <span>Indexes</span>
                <span
                  v-tooltip.right="options(dbInfo.indexes)"
                  v-html="highlight(dbInfo.indexes)"
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
                  v-html="highlight(dbInfo.dataSize)"
                />
              </li>
              <li>
                <span>Free Storage Size</span>
                <span
                  v-tooltip.right="options(dbInfo.freeStorageSize)"
                  v-html="highlight(dbInfo.freeStorageSize)"
                />
              </li>
              <li>
                <span>Fs Total Size</span>
                <span
                  v-tooltip.right="options(dbInfo.fsTotalSize)"
                  v-html="highlight(dbInfo.fsTotalSize)"
                />
              </li>
              <li>
                <span>Fs Used Size</span>
                <span
                  v-tooltip.right="options(dbInfo.fsUsedSize)"
                  v-html="highlight(dbInfo.fsUsedSize)"
                />
              </li>
              <li>
                <span>Index Free Storage Size</span>
                <span
                  v-tooltip.right="options(dbInfo.indexFreeStorageSize)"
                  v-html="highlight(dbInfo.indexFreeStorageSize)"
                />
              </li>
              <li>
                <span>Index Size</span>
                <span
                  v-tooltip.right="options(dbInfo.indexSize)"
                  v-html="highlight(dbInfo.indexSize)"
                />
              </li>
              <li>
                <span>Storage Size</span>
                <span
                  v-tooltip.right="options(dbInfo.storageSize)"
                  v-html="highlight(dbInfo.storageSize)"
                />
              </li>
              <li>
                <span>Total Free Storage Size</span>
                <span
                  v-tooltip.right="options(dbInfo.totalFreeStorageSize)"
                  v-html="highlight(dbInfo.totalFreeStorageSize)"
                />
              </li>
              <li>
                <span>Total Size</span>
                <span
                  v-tooltip.right="options(dbInfo.totalSize)"
                  v-html="highlight(dbInfo.totalSize)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </b-tab-item>
</template>

<script>
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

export default {
  name: 'hosts-details-mysql-databases-info-component',
  mixins: [infoMixin],
}
</script>

<style lang="scss" scoped></style>
