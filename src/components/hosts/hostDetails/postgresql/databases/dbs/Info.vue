<template>
  <b-tab-item label="Info" class="databasesInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Details</li>
              <li>
                <span>Db Name</span>
                <span
                  v-tooltip.right="options(info.dbName)"
                  v-html="highlight(toString(info.dbName))"
                />
              </li>
              <li>
                <span>Db Owner</span>
                <span
                  v-tooltip.right="options(info.dbOwner)"
                  v-html="highlight(toString(info.dbOwner))"
                />
              </li>
              <li>
                <span>Db Size</span>
                <span
                  v-tooltip.right="options(mapBytes(info.dbSize))"
                  v-html="highlight(mapBytes(info.dbSize))"
                />
              </li>
              <li>
                <span>Datconn limit</span>
                <span
                  v-tooltip.right="options(info.datconnlimit)"
                  v-html="highlight(toString(info.datconnlimit))"
                />
              </li>
              <li>
                <span>Extensions Count</span>
                <span
                  v-tooltip.right="options(info.extensionsCount)"
                  v-html="highlight(toString(info.extensionsCount))"
                />
              </li>
              <li>
                <span>Logic Repl Setup</span>
                <SimpleBooleanIcon
                  :value="setBoolean(info.logicReplSetup)"
                  v-tooltip.right="options(setBoolean(info.logicReplSetup))"
                />
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li>
                <span>Indexes Count</span>
                <span
                  v-tooltip.right="options(info.indexesCount)"
                  v-html="highlight(toString(info.indexesCount))"
                />
              </li>
              <li>
                <span>Indexes Size</span>
                <span
                  v-tooltip.right="options(mapBytes(info.indexesSize))"
                  v-html="highlight(mapBytes(info.indexesSize))"
                />
              </li>
              <li>
                <span>Lobs Count</span>
                <span
                  v-tooltip.right="options(info.lobsCount)"
                  v-html="highlight(toString(info.lobsCount))"
                />
              </li>
              <li>
                <span>Lobs Size</span>
                <span
                  v-tooltip.right="options(mapBytes(info.lobsSize))"
                  v-html="highlight(mapBytes(info.lobsSize))"
                />
              </li>
              <li>
                <span>Matviews Count</span>
                <span
                  v-tooltip.right="options(info.matviewsCount)"
                  v-html="highlight(toString(info.matviewsCount))"
                />
              </li>
              <li>
                <span>Matviews Size</span>
                <span
                  v-tooltip.right="options(mapBytes(info.matviewsSize))"
                  v-html="highlight(mapBytes(info.matviewsSize))"
                />
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li>
                <span>Publications Count</span>
                <span
                  v-tooltip.right="options(info.publicationsCount)"
                  v-html="highlight(toString(info.publicationsCount))"
                />
              </li>
              <li>
                <span>Schemas Count</span>
                <span
                  v-tooltip.right="options(info.schemasCount)"
                  v-html="highlight(toString(info.schemasCount))"
                />
              </li>
              <li>
                <span>Subscriptions Count</span>
                <span
                  v-tooltip.right="options(info.subscriptionsCount)"
                  v-html="highlight(toString(info.subscriptionsCount))"
                />
              </li>
              <li>
                <span>Tables Count</span>
                <span
                  v-tooltip.right="options(info.tablesCount)"
                  v-html="highlight(toString(info.tablesCount))"
                />
              </li>
              <li>
                <span>Tables Size</span>
                <span
                  v-tooltip.right="options(mapBytes(info.tablesSize))"
                  v-html="highlight(mapBytes(info.tablesSize))"
                />
              </li>
              <li>
                <span>Views Count</span>
                <span
                  v-tooltip.right="options(info.viewsCount)"
                  v-html="highlight(toString(info.viewsCount))"
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
  name: 'hosts-details-postgre-databases-dbs-info-component',
  mixins: [infoMixin],
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    setBoolean(value) {
      return value ? 'yes' : 'no'
    },
    mapBytes(value) {
      return this.$options.filters.prettyBytes(value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
