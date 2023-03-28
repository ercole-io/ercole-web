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
              <li v-if="dbInfo.dbs">
                <span>Dbs</span>
                <span
                  v-tooltip.right="options(dbInfo.dbs)"
                  v-html="highlight(toString(dbInfo.dbs))"
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
        </div>
      </div>
    </div>
  </b-tab-item>
</template>

<script>
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'

export default {
  name: 'hosts-details-mongodb-databases-info-component',
  mixins: [infoMixin],
}
</script>

<style lang="scss" scoped></style>
