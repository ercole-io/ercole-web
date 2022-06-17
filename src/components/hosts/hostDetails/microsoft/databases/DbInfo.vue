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
              <li v-if="dbInfo.databaseID">
                <span>Db ID</span>
                <span>{{ dbInfo.databaseID }}</span>
              </li>
              <li v-if="dbInfo.status">
                <span>Status</span>
                <span>{{ dbInfo.status }}</span>
              </li>
              <li v-if="dbInfo.stateDesc">
                <span>State Description</span>
                <span>{{ dbInfo.stateDesc }}</span>
              </li>
              <li v-if="dbInfo.platform">
                <span>Platform</span>
                <span>{{ dbInfo.platform }}</span>
              </li>
              <li v-if="dbInfo.collationName">
                <span>Collation Name</span>
                <span>{{ dbInfo.collationName }}</span>
              </li>
              <li v-if="dbInfo.version">
                <span>Version</span>
                <span>{{ dbInfo.version }}</span>
              </li>
            </ul>
          </div>
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.displayName">
                <span>Display Name</span>
                <span>{{ dbInfo.displayName }}</span>
              </li>
              <li v-if="dbInfo.serverName">
                <span>Server Name</span>
                <span>{{ dbInfo.serverName }}</span>
              </li>
              <li v-if="dbInfo.edition">
                <span>Edition</span>
                <span>{{ dbInfo.edition }}</span>
              </li>
              <li v-if="dbInfo.editionType">
                <span>Edition Type</span>
                <span>{{ dbInfo.editionType }}</span>
              </li>
              <li v-if="dbInfo.productCode">
                <span>Product Code</span>
                <span>{{ dbInfo.productCode }}</span>
              </li>
              <li v-if="dbInfo.licensingInfo">
                <span>Licensing Info</span>
                <span>{{ dbInfo.licensingInfo }}</span>
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
import { filterOptionsMicrosft } from '@/helpers/hostDetails/filterOptions/microsoft.js'

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
        filterOptionsMicrosft.filter(
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
