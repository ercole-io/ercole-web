<template>
  <div class="columns is-mobile is-multiline">
    <div class="column">
      <div class="columns">
        <div class="column">
          <ul class="db-info">
            <li>Details</li>
            <li>
              <span>Db Name</span>
              <span>{{ info.databaseName }}</span>
            </li>
            <li>
              <span>Db ID</span>
              <span>{{ info.databaseID }}</span>
            </li>
            <li>
              <span>Collation Name</span>
              <span>{{ info.collationName }}</span>
            </li>
            <li>
              <span>Status</span>
              <span>{{ info.status }}</span>
            </li>
            <li>
              <span>Recovery Model</span>
              <span>{{ info.recoveryModel }}</span>
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="db-info">
            <li>Memory</li>
            <li>
              <span>Max Server Memory</span>
              <span>{{ info.maxServerMemory | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>Min Server Memory</span>
              <span>{{ info.minServerMemory | prettyBytes(1, true) }}</span>
            </li>
          </ul>
        </div>
        <div class="column">
          <ul class="db-info">
            <li>Additional Info</li>
            <li>
              <span>Affinity Mask</span>
              <span>{{ info.affinityMask }}</span>
            </li>
            <li>
              <span>Allocation</span>
              <span>{{ info.alloc }}</span>
            </li>
            <li>
              <span>Block Size</span>
              <span>{{ info.blockSize | prettyBytes(1, true) }}</span>
            </li>
            <li>
              <span>CTP</span>
              <span>{{ info.ctp }}</span>
            </li>
            <li>
              <span>Max Dop</span>
              <span>{{ info.maxDop }}</span>
            </li>
            <li>
              <span>Schedulers Count</span>
              <span>{{ info.schedulersCount }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hosts-details-microsoft-databases-dbs-info-component',
  props: {
    info: {
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
