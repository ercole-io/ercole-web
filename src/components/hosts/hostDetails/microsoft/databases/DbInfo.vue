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
                  v-html="highlight(toString(dbInfo.dbName))"
                />
              </li>
              <li v-if="dbInfo.databaseID">
                <span>Db ID</span>
                <span
                  v-tooltip.right="options(dbInfo.databaseID)"
                  v-html="highlight(toString(dbInfo.databaseID))"
                />
              </li>
              <li v-if="dbInfo.status">
                <span>Status</span>
                <span
                  v-tooltip.right="options(dbInfo.status)"
                  v-html="highlight(toString(dbInfo.status))"
                />
              </li>
              <li v-if="dbInfo.stateDesc">
                <span>State Description</span>
                <span
                  v-tooltip.right="options(dbInfo.stateDesc)"
                  v-html="highlight(toString(dbInfo.stateDesc))"
                />
              </li>
              <li v-if="dbInfo.platform">
                <span>Platform</span>
                <span
                  v-tooltip.right="options(dbInfo.platform)"
                  v-html="highlight(toString(dbInfo.platform))"
                />
              </li>
              <li v-if="dbInfo.collationName">
                <span>Collation Name</span>
                <span
                  v-tooltip.right="options(dbInfo.collationName)"
                  v-html="highlight(toString(dbInfo.collationName))"
                />
              </li>
              <li v-if="dbInfo.version">
                <span>Version</span>
                <span
                  v-tooltip.right="options(dbInfo.version)"
                  v-html="highlight(toString(dbInfo.version))"
                />
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.displayName">
                <span>Display Name</span>
                <span
                  v-tooltip.right="options(dbInfo.displayName)"
                  v-html="highlight(toString(dbInfo.displayName))"
                />
              </li>
              <li v-if="dbInfo.serverName">
                <span>Server Name</span>
                <span
                  v-tooltip.right="options(dbInfo.serverName)"
                  v-html="highlight(toString(dbInfo.serverName))"
                />
              </li>
              <li v-if="dbInfo.edition">
                <span>Edition</span>
                <span
                  v-tooltip.right="options(dbInfo.edition)"
                  v-html="highlight(toString(dbInfo.edition))"
                />
              </li>
              <li v-if="dbInfo.editionType">
                <span>Edition Type</span>
                <span
                  v-tooltip.right="options(dbInfo.editionType)"
                  v-html="highlight(toString(dbInfo.editionType))"
                />
              </li>
              <li v-if="dbInfo.productCode">
                <span>Product Code</span>
                <span
                  v-tooltip.right="options(dbInfo.productCode)"
                  v-html="highlight(toString(dbInfo.productCode))"
                />
              </li>
              <li v-if="dbInfo.licensingInfo">
                <span>Licensing Info</span>
                <span
                  v-tooltip.right="options(dbInfo.licensingInfo)"
                  v-html="highlight(toString(dbInfo.licensingInfo))"
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
  mixins: [infoMixin],
}
</script>

<style lang="scss" scoped></style>
