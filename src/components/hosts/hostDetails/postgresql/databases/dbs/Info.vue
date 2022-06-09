<template>
  <div class="columns is-mobile is-multiline">
    <div class="column">
      <div class="columns">
        <div class="column">
          <ul class="db-info">
            <li>Details</li>
            <li>
              <span>Db Name</span>
              <span>{{ info.dbName }}</span>
            </li>
            <li>
              <span>Db Owner</span>
              <span>{{ info.dbOwner }}</span>
            </li>
            <li>
              <span>Db Size</span>
              <span>{{ info.dbSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Datconn limit</span>
              <span>{{ info.datconnlimit }}</span>
            </li>
            <li>
              <span>Extensions Count</span>
              <span>{{ info.extensionsCount }}</span>
            </li>
            <li>
              <span>Logic Repl Setup</span>
              <b-icon
                size="is-small"
                :icon="bindIcon(info.logicReplSetup)[0]"
                :type="bindIcon(info.logicReplSetup)[1]"
              />
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="db-info">
            <li>Additional Info</li>
            <li>
              <span>Indexes Count</span>
              <span>{{ info.indexesCount }}</span>
            </li>
            <li>
              <span>Indexes Size</span>
              <span>{{ info.indexesSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Lobs Count</span>
              <span>{{ info.lobsCount }}</span>
            </li>
            <li>
              <span>Lobs Size</span>
              <span>{{ info.lobsSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Matviews Count</span>
              <span>{{ info.matviewsCount }}</span>
            </li>
            <li>
              <span>Matviews Size</span>
              <span>{{ info.matviewsSize | prettyBytes(1, true) }}</span>
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="db-info">
            <li>Additional Info</li>
            <li>
              <span>Publications Count</span>
              <span>{{ info.publicationsCount }}</span>
            </li>
            <li>
              <span>Schemas Count</span>
              <span>{{ info.schemasCount }}</span>
            </li>
            <li>
              <span>Subscriptions Count</span>
              <span>{{ info.subscriptionsCount }}</span>
            </li>
            <li>
              <span>Tables Count</span>
              <span>{{ info.tablesCount }}</span>
            </li>
            <li>
              <span>Tables Size</span>
              <span>{{ info.tablesSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Views Count</span>
              <span>{{ info.viewsCount }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  props: {
    info: {
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
