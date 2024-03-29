<template>
  <b-tab-item label="Info" value="Info" class="databasesInfo">
    <div class="columns is-mobile is-multiline">
      <div class="column is-4">
        <ul class="db-info">
          <li>Database Details</li>
          <li v-if="dbInfo.dbName">
            <span>Db Name</span>
            <span
              v-tooltip.right="options(dbInfo.dbName)"
              v-html="highlight(dbInfo.dbName)"
            />
          </li>
          <li v-if="dbInfo.status">
            <span>Status</span>
            <span
              v-tooltip.right="options(dbInfo.status)"
              v-html="highlight(dbInfo.status)"
            />
          </li>
          <li v-if="dbInfo.role">
            <span>Role</span>
            <span
              v-tooltip.right="options(dbInfo.role)"
              v-html="highlight(dbInfo.role)"
            />
          </li>
          <li v-if="dbInfo.dbID">
            <span>Db ID</span>
            <span
              v-tooltip.right="options(dbInfo.dbID)"
              v-html="highlight(dbInfo.dbID)"
            />
          </li>
          <li v-if="dbInfo.uniqueName">
            <span>Unique Name</span>
            <span
              v-tooltip.right="options(dbInfo.uniqueName)"
              v-html="highlight(dbInfo.uniqueName)"
            />
          </li>
          <li v-if="dbInfo.archivelog">
            <span>Archive Log</span>
            <SimpleBooleanIcon
              :value="dbInfo.archivelog"
              v-tooltip.right="options(dbInfo.archivelog)"
            />
          </li>
          <li v-if="dbInfo.blockSize">
            <span>Block Size</span>
            <span
              v-tooltip.right="options(dbInfo.blockSize)"
              v-html="highlight(dbInfo.blockSize)"
            />
          </li>
          <li v-if="dbInfo.charset">
            <span>Charset</span>
            <span
              v-tooltip.right="options(dbInfo.charset)"
              v-html="highlight(dbInfo.charset)"
            />
          </li>
          <li v-if="dbInfo.nCharset">
            <span>N Charset</span>
            <span
              v-tooltip.right="options(dbInfo.nCharset)"
              v-html="highlight(dbInfo.nCharset)"
            />
          </li>
        </ul>
      </div>

      <div class="column is-4">
        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Memory</li>
              <li v-if="dbInfo.memoryTarget">
                <span>Memory Target</span>
                <span
                  v-tooltip.right="options(dbInfo.memoryTarget)"
                  v-html="highlight(dbInfo.memoryTarget)"
                />
              </li>
              <li v-if="dbInfo.memorySizeLowerGb !== ''">
                <span>Memory Size Lower (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.memorySizeLowerGb)"
                  v-html="highlight(dbInfo.memorySizeLowerGb)"
                />
              </li>
              <li v-if="dbInfo.pgaTarget">
                <span>PGA Target (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.pgaTarget)"
                  v-html="highlight(dbInfo.pgaTarget)"
                />
              </li>
              <li v-if="dbInfo.pgaTargetAggregateLowerGb !== ''">
                <span>Pga Target Aggregate Lower (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.pgaTargetAggregateLowerGb)"
                  v-html="highlight(dbInfo.pgaTargetAggregateLowerGb)"
                />
              </li>
              <li v-if="dbInfo.sgaMaxSize">
                <span>SGA MaxSize (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.sgaMaxSize)"
                  v-html="highlight(dbInfo.sgaMaxSize)"
                />
              </li>
              <li v-if="dbInfo.sgaTarget">
                <span>SGA Target (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.sgaTarget)"
                  v-html="highlight(dbInfo.sgaTarget)"
                />
              </li>
              <li v-if="dbInfo.sgaSizeLowerGb !== ''">
                <span>Sga Size Lower (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.sgaSizeLowerGb)"
                  v-html="highlight(dbInfo.sgaSizeLowerGb)"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Resource Utilization</li>
              <li v-if="dbInfo.dbTime">
                <span>Db Time</span>
                <span
                  v-tooltip.right="options(dbInfo.dbTime)"
                  v-html="highlight(dbInfo.dbTime)"
                />
              </li>
              <li v-if="dbInfo.elapsed">
                <span>Elapsed</span>
                <span
                  v-tooltip.right="options(dbInfo.elapsed)"
                  v-html="highlight(dbInfo.elapsed)"
                />
              </li>
              <li v-if="dbInfo.work">
                <span>DB time / Elapsed (min. 1)</span>
                <span
                  v-tooltip.right="options(dbInfo.work)"
                  v-html="highlight(dbInfo.work)"
                />
              </li>
              <li v-if="dbInfo.cpuCount">
                <span>CPU Count</span>
                <span
                  v-tooltip.right="options(dbInfo.cpuCount)"
                  v-html="highlight(dbInfo.cpuCount)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="column is-4">
        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Space Utilization</li>
              <li v-if="dbInfo.allocable">
                <span>Allocable (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.allocable)"
                  v-html="highlight(dbInfo.allocable)"
                />
              </li>
              <li v-if="dbInfo.datafileSize">
                <span>DataFile Size (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.datafileSize)"
                  v-html="highlight(dbInfo.datafileSize)"
                />
              </li>
              <li v-if="dbInfo.segmentsSize">
                <span>Segments Size (GB)</span>
                <span
                  v-tooltip.right="options(dbInfo.segmentsSize)"
                  v-html="highlight(dbInfo.segmentsSize)"
                />
              </li>
            </ul>
          </div>
        </div>

        <div class="columns">
          <div class="column is-12">
            <ul class="db-info">
              <li>Additional Info</li>
              <li v-if="dbInfo.asm">
                <span>ASM</span>
                <SimpleBooleanIcon
                  :value="dbInfo.asm"
                  v-tooltip.right="options(dbInfo.asm)"
                />
              </li>
              <li v-if="dbInfo.dataguard">
                <span>Data Guard</span>
                <SimpleBooleanIcon
                  :value="dbInfo.dataguard"
                  v-tooltip.right="options(dbInfo.dataguard)"
                />
              </li>
              <li v-if="dbInfo.platform">
                <span>Platform</span>
                <span
                  v-tooltip.right="options(dbInfo.platform)"
                  v-html="highlight(dbInfo.platform)"
                />
              </li>
              <li v-if="dbInfo.version">
                <span>Version</span>
                <span
                  v-tooltip.right="options(dbInfo.version)"
                  v-html="highlight(dbInfo.version)"
                />
              </li>
              <li v-if="getMigrate">
                <span>Migrable to Standard</span>
                <SimpleBooleanIcon
                  :value="getMigrate"
                  v-tooltip.right="options(getMigrate)"
                />
              </li>
              <li>
                <span>Migrable to Postgre</span>
                <Semaphore
                  :hostname="null"
                  :dbname="dbInfo.dbName"
                  :setColor="getSemaphore"
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
import { mapState } from 'vuex'
import infoMixin from '@/mixins/hostDetails/databaseInfo.js'
import Semaphore from '@/components/common/Semaphore.vue'

export default {
  name: 'hosts-details-oracle-databases-info-component',
  mixins: [infoMixin],
  components: {
    Semaphore,
  },
  data() {
    return {
      semaphoreData: [
        {
          metric: 'PLSQL LINES',
          Count: 6212,
        },
        {
          metric: 'PARTITIONED TABLES',
          Count: 0,
        },
        {
          metric: 'PARTITIONED INDEXES',
          Count: 0,
        },
        {
          metric: 'PROCEDURES',
          Count: 1,
        },
        {
          metric: 'SEQUENCES',
          Count: 1,
        },
        {
          metric: 'TRIGGERS',
          Count: 0,
        },
        {
          metric: 'FUNCTIONS',
          Count: 0,
        },
        {
          metric: 'HCC COMPRESSED TABLES',
          Count: 0,
        },
        {
          metric: 'MVIEWS REWRITE ENABLED',
          Count: 0,
        },
        {
          metric: 'VDP POLICIES',
          Count: 0,
        },
        {
          Count: 348,
          schema: 'PERFSTAT',
          objectType: 'PACKAGE',
        },
        {
          Count: 5817,
          schema: 'PERFSTAT',
          objectType: 'PACKAGE BODY',
        },
        {
          Count: 47,
          schema: 'PERFSTAT',
          objectType: 'PROCEDURE',
        },
      ],
    }
  },
  computed: {
    ...mapState(['hostDetails']),
    getMigrate() {
      return this.hostDetails.canBeMigrate
    },
    getSemaphore() {
      return this.hostDetails.semaphore
    },
  },
}
</script>

<style lang="scss" scoped></style>
