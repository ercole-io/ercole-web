<template>
  <b-tab-item label="Info" class="databasesInfo" v-if="hasInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Database Details</li>
              <li v-if="dbInfo.dbName">
                <span>Db Name</span>
                <span
                  v-tooltip.right="options(dbInfo.dbName)"
                  v-html="highlight(dbInfo.dbName)"
                />
              </li>
              <li v-if="dbInfo.version">
                <span>Version</span>
                <span
                  v-tooltip.right="options(dbInfo.version)"
                  v-html="highlight(dbInfo.version)"
                />
              </li>
              <li v-if="dbInfo.platform">
                <span>Platform</span>
                <span
                  v-tooltip.right="options(dbInfo.platform)"
                  v-html="highlight(dbInfo.platform)"
                />
              </li>
              <li v-if="dbInfo.architecture">
                <span>Architecture</span>
                <span
                  v-tooltip.right="options(dbInfo.architecture)"
                  v-html="highlight(dbInfo.architecture)"
                />
              </li>
              <li v-if="dbInfo.edition">
                <span>Edition</span>
                <span
                  v-tooltip.right="options(dbInfo.edition)"
                  v-html="highlight(dbInfo.edition)"
                />
              </li>
              <li v-if="dbInfo.engine">
                <span>Engine</span>
                <span
                  v-tooltip.right="options(dbInfo.engine)"
                  v-html="highlight(dbInfo.engine)"
                />
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Memory</li>
              <li v-if="dbInfo.sortBufferSize">
                <span>Sort Buffer Size</span>
                <span
                  v-tooltip.right="options(dbInfo.sortBufferSize)"
                  v-html="highlight(dbInfo.sortBufferSize)"
                />
              </li>
              <li v-if="dbInfo.logBufferSize">
                <span>Log Buffer Size</span>
                <span
                  v-tooltip.right="options(dbInfo.logBufferSize)"
                  v-html="highlight(dbInfo.logBufferSize)"
                />
              </li>
              <li v-if="dbInfo.bufferPoolSize">
                <span>Pool Buffer Size</span>
                <span
                  v-tooltip.right="options(dbInfo.bufferPoolSize)"
                  v-html="highlight(dbInfo.bufferPoolSize)"
                />
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.readOnly">
                <span>Read Only</span>
                <SimpleBooleanIcon
                  :value="dbInfo.readOnly"
                  v-tooltip.right="options(dbInfo.readOnly)"
                />
              </li>
              <li v-if="dbInfo.redoLogEnabled">
                <span>Redo Log Enabled</span>
                <span
                  v-tooltip.right="options(dbInfo.redoLogEnabled)"
                  v-html="highlight(dbInfo.redoLogEnabled)"
                />
              </li>
              <li v-if="dbInfo.threadsConcurrency">
                <span>Threads Concurrency</span>
                <span
                  v-tooltip.right="options(dbInfo.threadsConcurrency)"
                  v-html="highlight(dbInfo.threadsConcurrency)"
                />
              </li>
              <li v-if="dbInfo.charsetServer">
                <span>Server Charset</span>
                <span
                  v-tooltip.right="options(dbInfo.charsetServer)"
                  v-html="highlight(dbInfo.charsetServer)"
                />
              </li>
              <li v-if="dbInfo.charsetSystem">
                <span>System Charset</span>
                <span
                  v-tooltip.right="options(dbInfo.charsetSystem)"
                  v-html="highlight(dbInfo.charsetSystem)"
                />
              </li>
              <li v-if="dbInfo.pageSize">
                <span>Page Size</span>
                <span
                  v-tooltip.right="options(dbInfo.pageSize)"
                  v-html="highlight(dbInfo.pageSize)"
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
