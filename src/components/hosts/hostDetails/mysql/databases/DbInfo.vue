<template>
  <b-tab-item label="Info" v-if="hasInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Database Details</li>
              <li v-if="dbInfo.dbName">
                <span>Db Name</span>
                <span>{{ dbInfo.dbName }}</span>
              </li>
              <li v-if="dbInfo.version">
                <span>Version</span>
                <span>{{ dbInfo.version }}</span>
              </li>
              <li v-if="dbInfo.platform">
                <span>Platform</span>
                <span>{{ dbInfo.platform }}</span>
              </li>
              <li v-if="dbInfo.architecture">
                <span>Architecture</span>
                <span>{{ dbInfo.architecture }}</span>
              </li>
              <li v-if="dbInfo.edition">
                <span>Edition</span>
                <span>{{ dbInfo.edition }}</span>
              </li>
              <li v-if="dbInfo.engine">
                <span>Engine</span>
                <span>{{ dbInfo.engine }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Memory</li>
              <li v-if="dbInfo.sortBufferSize">
                <span>Sort Buffer Size</span>
                <span>{{ dbInfo.sortBufferSize }}</span>
              </li>
              <li v-if="dbInfo.logBufferSize">
                <span>Log Buffer Size</span>
                <span>{{ dbInfo.logBufferSize }}</span>
              </li>
              <li v-if="dbInfo.bufferPoolSize">
                <span>Pool Buffer Size</span>
                <span>{{ dbInfo.bufferPoolSize }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.readOnly">
                <span>Read Only</span>
                <SimpleBooleanIcon :value="dbInfo.readOnly" />
              </li>
              <li v-if="dbInfo.redoLogEnabled">
                <span>Redo Log Enabled</span>
                <span>{{ dbInfo.redoLogEnabled }}</span>
              </li>
              <li v-if="dbInfo.threadsConcurrency">
                <span>Threads Concurrency</span>
                <span>{{ dbInfo.threadsConcurrency }}</span>
              </li>
              <li v-if="dbInfo.charsetServer">
                <span>Server Charset</span>
                <span>{{ dbInfo.charsetServer }}</span>
              </li>
              <li v-if="dbInfo.charsetSystem">
                <span>System Charset</span>
                <span>{{ dbInfo.charsetSystem }}</span>
              </li>
              <li v-if="dbInfo.pageSize">
                <span>Page Size</span>
                <span>{{ dbInfo.pageSize }}</span>
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
import { filterOptionsMysql } from '@/helpers/hostDetails/filterOptions/mysql.js'
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
        filterOptionsMysql.filter(
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
