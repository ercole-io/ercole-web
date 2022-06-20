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
              <li v-if="dbInfo.isinreplica">
                <span>Is In Replica</span>
                <span>{{ dbInfo.isinreplica }}</span>
                <!-- <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.isinreplica)[0]"
                  :type="bindIcon(dbInfo.isinreplica)[1]"
                /> -->
              </li>
              <li v-if="dbInfo.ismaster">
                <span>Is Master</span>
                <span>{{ dbInfo.ismaster }}</span>
                <!-- <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.ismaster)[0]"
                  :type="bindIcon(dbInfo.ismaster)[1]"
                /> -->
              </li>
              <li v-if="dbInfo.isslave">
                <span>Is Slave</span>
                <span>{{ dbInfo.isslave }}</span>
                <!-- <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.isslave)[0]"
                  :type="bindIcon(dbInfo.isslave)[1]"
                /> -->
              </li>
              <li v-if="dbInfo.archiverWorking">
                <span>Archiver Working</span>
                <span>{{ dbInfo.isslave }}</span>
                <!-- <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.archiverWorking)[0]"
                  :type="bindIcon(dbInfo.archiverWorking)[1]"
                /> -->
              </li>
              <li v-if="dbInfo.port">
                <span>Port</span>
                <span>{{ dbInfo.port }}</span>
              </li>
              <li v-if="dbInfo.charset">
                <span>Charset</span>
                <span>{{ dbInfo.charset }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.dbNum">
                <span>DB Num</span>
                <span>{{ dbInfo.dbNum }}</span>
              </li>
              <li v-if="dbInfo.instanceSize">
                <span>Instance Size</span>
                <span>{{ dbInfo.instanceSize | prettyBytes(1, true) }}</span>
              </li>
              <li v-if="dbInfo.maxConnections">
                <span>Max Connections</span>
                <span>{{ dbInfo.maxConnections }}</span>
              </li>
              <li v-if="dbInfo.slavesNum">
                <span>Slaves Num</span>
                <span>{{ dbInfo.slavesNum }}</span>
              </li>
              <li v-if="dbInfo.tblspNum">
                <span>Tblsp Num</span>
                <span>{{ dbInfo.tblspNum }}</span>
              </li>
              <li v-if="dbInfo.trustHbaEntries">
                <span>Trust Hba Entries</span>
                <span>{{ dbInfo.trustHbaEntries }}</span>
              </li>
              <li v-if="dbInfo.usersNum">
                <span>Users Num</span>
                <span>{{ dbInfo.usersNum }}</span>
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
import { filterOptionsPostgreSql } from '@/helpers/hostDetails/filterOptions/postgresql.js'

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
  computed: {
    ...mapState(['hostDetails']),
    hasInfo() {
      return (
        (this.hostDetails.selectedKeys.length === 1 &&
          this.hostDetails.selectedKeys.includes('name')) ||
        filterOptionsPostgreSql.filter(
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
