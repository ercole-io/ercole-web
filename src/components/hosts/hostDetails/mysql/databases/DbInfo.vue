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
                <span>Version</span>
                <span>{{ dbInfo.version }}</span>
              </li>
              <li>
                <span>Platform</span>
                <span>{{ dbInfo.platform }}</span>
              </li>
              <li>
                <span>Architecture</span>
                <span>{{ dbInfo.architecture }}</span>
              </li>
              <li>
                <span>Edition</span>
                <span>{{ dbInfo.edition }}</span>
              </li>
              <li>
                <span>Engine</span>
                <span>{{ dbInfo.engine }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Memory</li>
              <li>
                <span>Sort Buffer Size</span>
                <span>{{ dbInfo.sortBufferSize }}</span>
              </li>
              <li>
                <span>Log Buffer Size</span>
                <span>{{ dbInfo.logBufferSize }}</span>
              </li>
              <li>
                <span>Pool Buffer Size</span>
                <span>{{ dbInfo.bufferPoolSize }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li>
                <span>Read Only</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.readOnly)[0]"
                  :type="bindIcon(dbInfo.readOnly)[1]"
                />
              </li>
              <li>
                <span>Read Only Log Enabled</span>
                <span>{{ dbInfo.redoLogEnabled }}</span>
              </li>
              <li>
                <span>Threads Concurrency</span>
                <span>{{ dbInfo.threadsConcurrency }}</span>
              </li>
              <li>
                <span>Server Charset</span>
                <span>{{ dbInfo.charsetServer }}</span>
              </li>
              <li>
                <span>System Charset</span>
                <span>{{ dbInfo.charsetSystem }}</span>
              </li>
              <li>
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
