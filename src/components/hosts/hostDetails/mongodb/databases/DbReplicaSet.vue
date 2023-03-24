<template>
  <b-tab-item label="Replica Set" class="databasesInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Replica Set Info</li>
              <li v-if="replicaset.setName">
                <span>Set Name</span>
                <span
                  v-tooltip.right="options(replicaset.setName)"
                  v-html="highlight(toString(replicaset.setName))"
                />
              </li>
              <li v-if="replicaset.primary">
                <span>Primary</span>
                <span
                  v-tooltip.right="options(replicaset.primary)"
                  v-html="highlight(toString(replicaset.primary))"
                />
              </li>
              <li v-if="replicaset.hosts">
                <span>Hosts</span>
                <span
                  v-tooltip.right="options(replicaset.hosts)"
                  v-html="highlight(toString(replicaset.hosts))"
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
  name: 'hosts-details-mongodb-databases-replicaset-component',
  mixins: [infoMixin],
  props: {
    replicaset: {
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
