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
                <span>DBname</span>
                <span>{{ details.dbName }}</span>
              </li>
              <li>
                <span>UniqueName</span>
                <span>{{ details.uniqueName }}</span>
              </li>
              <li>
                <span>Archivelog</span>
                <span>{{ details.archiveLog }}</span>
              </li>
              <li>
                <span>BlockSize</span>
                <span>{{ details.blockSize }}</span>
              </li>
              <li>
                <span>Charset</span>
                <span>{{ details.charset }}</span>
              </li>
              <li>
                <span>NCharset</span>
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
                <span>PGATarget (GB)</span>
                <span>{{ memory.pgaTarget }}</span>
              </li>
              <li>
                <span>SGAMaxSize (BG)</span>
                <span>{{ memory.sgaMaxSize }}</span>
              </li>
              <li>
                <span>SGATarget (BG)</span>
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
                    <span>DBTime</span>
                    <span>{{ resource.dbTime }}</span>
                  </li>
                  <li>
                    <span>Elapsed</span>
                    <span>{{ resource.elapsed }}</span>
                  </li>
                  <li>
                    <span>Thread used</span>
                    <span>{{ resource.threadUsed }}</span>
                  </li>
                  <li>
                    <span>CPUCount</span>
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
                <span>DataFileSize (GB)</span>
                <span>{{ space.dataFileSize }}</span>
              </li>
              <li>
                <span>SegmentsSize (GB)</span>
                <span>{{ space.segmentSize }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <ul class="db-info">
              <li>Additionally Infos</li>
              <li>
                <span>ASM</span>
                <span>{{ infos.asm }}</span>
              </li>
              <li>
                <span>DataGuard</span>
                <span>{{ infos.dataGuard }}</span>
              </li>
              <li>
                <span>Plattform</span>
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
  }
}
</script>

<style lang="scss" scoped>
.db-info {
  padding-top: 0;

  li {
    box-shadow: 0 0.05em 0 lightslategrey;
    padding: 0 5px;
    font-size: 0.7em;
  }

  li:not(:first-child) {
    display: flex;
    justify-content: space-between;
  }

  li:first-child {
    box-shadow: 0 0.08em 0 lightslategrey;
    font-weight: 600;
    text-transform: uppercase;
    padding-left: 0;
  }
}
</style>
