<template>
  <b-tab-item label="Status Connection" class="databasesInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Status Connection Info</li>
              <li>
                <span>Active</span>
                <span
                  v-tooltip.right="options(statusconnection.active)"
                  v-html="highlight(toString(statusconnection.active))"
                />
              </li>
              <li>
                <span>Available</span>
                <span
                  v-tooltip.right="options(statusconnection.available)"
                  v-html="highlight(toString(statusconnection.available))"
                />
              </li>
              <li>
                <span>Awaiting Topology Changes</span>
                <span
                  v-tooltip.right="
                    options(statusconnection.awaitingTopologyChanges)
                  "
                  v-html="
                    highlight(
                      toString(statusconnection.awaitingTopologyChanges)
                    )
                  "
                />
              </li>
              <li>
                <span>Current</span>
                <span
                  v-tooltip.right="options(statusconnection.current)"
                  v-html="highlight(toString(statusconnection.current))"
                />
              </li>
              <li>
                <span>Exhaust Hello</span>
                <span
                  v-tooltip.right="options(statusconnection.exhaustHello)"
                  v-html="highlight(toString(statusconnection.exhaustHello))"
                />
              </li>
              <li>
                <span>Exhaust Is Master</span>
                <span
                  v-tooltip.right="options(statusconnection.exhaustIsMaster)"
                  v-html="highlight(toString(statusconnection.exhaustIsMaster))"
                />
              </li>
              <li>
                <span>Load Balanced</span>
                <span
                  v-tooltip.right="options(statusconnection.loadBalanced)"
                  v-html="highlight(toString(statusconnection.loadBalanced))"
                />
              </li>
              <li>
                <span>Threaded</span>
                <span
                  v-tooltip.right="options(statusconnection.threaded)"
                  v-html="highlight(toString(statusconnection.threaded))"
                />
              </li>
              <li>
                <span>Total Created</span>
                <span
                  v-tooltip.right="options(statusconnection.totalCreated)"
                  v-html="highlight(toString(statusconnection.totalCreated))"
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
  name: 'hosts-details-mongodb-databases-statusconnection-component',
  mixins: [infoMixin],
  props: {
    statusconnection: {
      type: Object,
      default: () => {},
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
