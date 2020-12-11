<template>
  <section>
    <div class="columns is-mobile is-multiline">
      <div class="column">
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>DB Details</li>
              <li>
                <span>status</span>
                <span>{{ details.status }}</span>
              </li>
              <li>
                <span>Role</span>
                <span>{{ details.role }}</span>
              </li>
              <li>
                <span>Db ID</span>
                <span>{{ details.dbID }}</span>
              </li>
              <li>
                <span>Db Name</span>
                <span>{{ details.dbName }}</span>
              </li>
              <li>
                <span>Unique Name</span>
                <span>{{ details.uniqueName }}</span>
              </li>
              <li>
                <span>Archive Log</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(details.archiveLog)[0]"
                  :type="bindIcon(details.archiveLog)[1]"
                />
              </li>
              <li>
                <span>Block Size</span>
                <span>{{ details.blockSize }}</span>
              </li>
              <li>
                <span>Charset</span>
                <span>{{ details.charset }}</span>
              </li>
              <li>
                <span>N Charset</span>
                <span>{{ details.nCharset }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Memory</li>
              <li>
                <span>Memory Target</span>
                <span>{{ memory.memoryTarget }}</span>
              </li>
              <li>
                <span>PGA Target (GB)</span>
                <span>{{ memory.pgaTarget }}</span>
              </li>
              <li>
                <span>SGA MaxSize (GB)</span>
                <span>{{ memory.sgaMaxSize }}</span>
              </li>
              <li>
                <span>SGA Target (GB)</span>
                <span>{{ memory.sgaTarget }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="columns">
          <div class="column">
            <div class="columns">
              <div class="column">
                <ul class="db-info">
                  <li>Resource Utilization</li>
                  <li>
                    <span>Db Time</span>
                    <span>{{ resource.dbTime }}</span>
                  </li>
                  <li>
                    <span>Elapsed</span>
                    <span>{{ resource.elapsed }}</span>
                  </li>
                  <li>
                    <span>Thread Used</span>
                    <span>{{ resource.threadUsed }}</span>
                  </li>
                  <li>
                    <span>CPU Count</span>
                    <span>{{ resource.cpuCount }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Space Utilization</li>
              <li>
                <span>Allocable (GB)</span>
                <span>{{ space.allocable }}</span>
              </li>
              <li>
                <span>DataFile Size (GB)</span>
                <span>{{ space.dataFileSize }}</span>
              </li>
              <li>
                <span>Segments Size (GB)</span>
                <span>{{ space.segmentSize }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Additional Info</li>
              <li>
                <span>ASM</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(infos.asm)[0]"
                  :type="bindIcon(infos.asm)[1]"
                />
              </li>
              <li>
                <span>Data Guard</span>
                <b-icon
                  size="is-small"
                  :icon="bindIcon(infos.dataGuard)[0]"
                  :type="bindIcon(infos.dataGuard)[1]"
                />
              </li>
              <li>
                <span>Platform</span>
                <span>{{ infos.plattform }}</span>
              </li>
              <li>
                <span>Version</span>
                <span>{{ infos.version }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapBooleanIcon } from '@/helpers/helpers.js'

export default {
  props: {
    details: {
      type: Object,
      default: null
    },
    memory: {
      type: Object,
      default: null
    },
    resource: {
      type: Object,
      default: null
    },
    space: {
      type: Object,
      default: null
    },
    infos: {
      type: Object,
      default: null
    }
  },
  methods: {
    bindIcon(value) {
      return mapBooleanIcon(value)
    }
  }
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
