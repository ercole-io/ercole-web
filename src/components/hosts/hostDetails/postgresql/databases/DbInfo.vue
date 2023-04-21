<template>
  <b-tab-item label="Info" class="databasesInfo">
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
              <li v-if="dbInfo.isinreplica">
                <span>Is In Replica</span>
                <SimpleBooleanIcon
                  :value="dbInfo.isinreplica"
                  v-tooltip.right="options(dbInfo.isinreplica)"
                />
              </li>
              <li v-if="dbInfo.ismaster">
                <span>Is Master</span>
                <SimpleBooleanIcon
                  :value="dbInfo.ismaster"
                  v-tooltip.right="options(dbInfo.ismaster)"
                />
              </li>
              <li v-if="dbInfo.isslave">
                <span>Is Slave</span>
                <SimpleBooleanIcon
                  :value="dbInfo.isslave"
                  v-tooltip.right="options(dbInfo.isslave)"
                />
              </li>
              <li v-if="dbInfo.archiverWorking">
                <span>Archiver Working</span>
                <SimpleBooleanIcon
                  :value="dbInfo.archiverWorking"
                  v-tooltip.right="options(dbInfo.archiverWorking)"
                />
              </li>
              <li v-if="dbInfo.port">
                <span>Port</span>
                <span
                  v-tooltip.right="options(dbInfo.port)"
                  v-html="highlight(toString(dbInfo.port))"
                />
              </li>
              <li v-if="dbInfo.charset">
                <span>Charset</span>
                <span
                  v-tooltip.right="options(dbInfo.charset)"
                  v-html="highlight(toString(dbInfo.charset))"
                />
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.dbNum">
                <span>DB Num</span>
                <span
                  v-tooltip.right="options(dbInfo.dbNum)"
                  v-html="highlight(toString(dbInfo.dbNum))"
                />
              </li>
              <li v-if="dbInfo.instanceSize">
                <span>Instance Size</span>
                <span
                  v-tooltip.right="options(mapBytes(dbInfo.instanceSize))"
                  v-html="highlight(mapBytes(dbInfo.instanceSize))"
                />
              </li>
              <li v-if="dbInfo.maxConnections">
                <span>Max Connections</span>
                <span
                  v-tooltip.right="options(dbInfo.maxConnections)"
                  v-html="highlight(toString(dbInfo.maxConnections))"
                />
              </li>
              <li v-if="dbInfo.slavesNum">
                <span>Slaves Num</span>
                <span
                  v-tooltip.right="options(dbInfo.slavesNum)"
                  v-html="highlight(toString(dbInfo.slavesNum))"
                />
              </li>
              <li v-if="dbInfo.tblspNum">
                <span>Tblsp Num</span>
                <span
                  v-tooltip.right="options(dbInfo.tblspNum)"
                  v-html="highlight(toString(dbInfo.tblspNum))"
                />
              </li>
              <li v-if="dbInfo.trustHbaEntries">
                <span>Trust Hba Entries</span>
                <span
                  v-tooltip.right="options(dbInfo.trustHbaEntries)"
                  v-html="highlight(toString(dbInfo.trustHbaEntries))"
                />
              </li>
              <li v-if="dbInfo.usersNum">
                <span>Users Num</span>
                <span
                  v-tooltip.right="options(dbInfo.usersNum)"
                  v-html="highlight(toString(dbInfo.usersNum))"
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
  name: 'hosts-details-postgre-databases-info-component',
  mixins: [infoMixin],
  methods: {
    mapBytes(value) {
      return this.$options.filters.prettyBytes(value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
