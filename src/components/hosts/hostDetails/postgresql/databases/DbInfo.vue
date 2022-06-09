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
                <span>Is In Replica</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.isinreplica)[0]"
                  :type="bindIcon(dbInfo.isinreplica)[1]"
                />
              </li>
              <li>
                <span>Is Master</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.ismaster)[0]"
                  :type="bindIcon(dbInfo.ismaster)[1]"
                />
              </li>
              <li>
                <span>Is Slave</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.isslave)[0]"
                  :type="bindIcon(dbInfo.isslave)[1]"
                />
              </li>
              <li>
                <span>Archiver Working</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(dbInfo.archiverWorking)[0]"
                  :type="bindIcon(dbInfo.archiverWorking)[1]"
                />
              </li>
              <li>
                <span>Port</span>
                <span>{{ dbInfo.port }}</span>
              </li>
              <li>
                <span>Charset</span>
                <span>{{ dbInfo.charset }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li>
                <span>DB Num</span>
                <span>{{ dbInfo.dbNum }}</span>
              </li>
              <li>
                <span>Instance Size</span>
                <span>{{ dbInfo.instanceSize | prettyBytes(1, true) }}</span>
              </li>
              <li>
                <span>Max Connections</span>
                <span>{{ dbInfo.maxConnections }}</span>
              </li>
              <li>
                <span>Slaves Num</span>
                <span>{{ dbInfo.slavesNum }}</span>
              </li>
              <li>
                <span>Tblsp Num</span>
                <span>{{ dbInfo.tblspNum }}</span>
              </li>
              <li>
                <span>Trust Hba Entries</span>
                <span>{{ dbInfo.trustHbaEntries }}</span>
              </li>
              <li>
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
