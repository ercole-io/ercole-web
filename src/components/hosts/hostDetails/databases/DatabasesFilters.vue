<template>
  <BoxContent
    title="Databases Advanced Filters"
    class="database-filters"
    :mbottom="false"
  >
    <span v-for="(opt, i) in filterOptions" :key="i">
      <hr
        class="my-0 has-background-grey-light"
        style="height: 1px;"
        v-if="i > 0 && opt.level === 1"
      />
      <div class="is-block px-2" v-if="opt.level === 1">
        <b-checkbox
          size="is-small"
          v-model="selectedKeys"
          :native-value="opt.value"
          :disabled="opt.disabled"
          @change.native="getChecked($event, opt.value)"
        >
          {{ opt.name }}
        </b-checkbox>
      </div>

      <div class="is-inline" v-if="opt.level === 2">
        <b-checkbox
          size="is-small"
          v-model="selectedKeys"
          :native-value="opt.value"
          @change.native="getChecked($event, opt.value)"
          style="min-width: 50%"
          class="px-5"
        >
          {{ opt.name }}
        </b-checkbox>
      </div>
    </span>

    <b-button
      type="is-light"
      size="is-small"
      class="my-2"
      @click="resetFilters"
      expanded
    >
      Reset Databases Filters
    </b-button>
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  data() {
    return {
      info: [
        'status',
        'role',
        'dbID',
        'uniqueName',
        'archiveLog',
        'blockSize',
        'charset',
        'nCharset',
        'memoryTarget',
        'pgaTarget',
        'sgaMaxSize',
        'sgaTarget',
        'dbTime',
        'elapsed',
        'work',
        'cpuCount',
        'allocable',
        'datafileSize',
        'segmentsSize',
        'asm',
        'dataguard',
        'platform',
        'version'
      ],
      // pdbs: [
      //   'pdbName',
      //   'pdbSchemas',
      //   'pdbStatus',
      //   'pdbTablespaces'
      //   // 'pdbServices'
      // ],
      selectedKeys: []
    }
  },
  beforeMount() {
    this.selectedKeys = this.hostDetails.dbFiltersSelected
  },
  methods: {
    ...mapMutations(['SET_DATABASES_FILTERS']),
    resetFilters() {
      this.selectedKeys = ['name']
      this.SET_DATABASES_FILTERS(this.selectedKeys)
    },
    getChecked(e, value) {
      const checked = e.target.checked
      if (value === 'info' && checked) {
        _.map(this.info, item => {
          this.selectedKeys.push(item)
        })
      }
      // else if (value === 'pdbs' && checked) {
      //   _.map(this.pdbs, item => {
      //     this.selectedKeys.push(item)
      //   })
      // }
      else {
        if (value === 'info' && !checked) {
          this.selectedKeys = this.selectedKeys.filter(
            item => !this.info.includes(item)
          )
        }
        // else if (value === 'pdbs' && !checked) {
        //   this.selectedKeys = this.selectedKeys.filter(
        //     item => !this.pdbs.includes(item)
        //   )
        // }
      }

      if (this.selectedKeys.length === 0) {
        this.resetFilters()
      }

      this.selectedKeys = _.uniqBy(this.selectedKeys, el => {
        return el
      })

      this.SET_DATABASES_FILTERS(this.selectedKeys)
    }
  },
  computed: {
    ...mapState(['hostDetails']),
    filterOptions() {
      return [
        {
          name: 'Database Name',
          value: 'name',
          disabled: this.isDisabled,
          level: 1
        },
        {
          name: 'Info',
          value: 'info',
          level: 1
        },
        {
          name: 'Status',
          value: 'status',
          level: 2,
          group: 'info'
        },
        {
          name: 'Role',
          value: 'role',
          level: 2,
          group: 'info'
        },
        {
          name: 'Db ID',
          value: 'dbID',
          level: 2,
          group: 'info'
        },
        {
          name: 'Unique Name',
          value: 'uniqueName',
          level: 2,
          group: 'info'
        },
        {
          name: 'ArchiveLog',
          value: 'archiveLog',
          level: 2
        },
        {
          name: 'Block Size',
          value: 'blockSize',
          level: 2
        },
        {
          name: 'Charset',
          value: 'charset',
          level: 2
        },
        {
          name: 'N Charset',
          value: 'nCharset',
          level: 2
        },
        {
          name: 'Memory Target',
          value: 'memoryTarget',
          level: 2
        },
        {
          name: 'PGA Target',
          value: 'pgaTarget',
          level: 2
        },
        {
          name: 'SGA MaxSize',
          value: 'sgaMaxSize',
          level: 2
        },
        {
          name: 'SGA Target',
          value: 'sgaTarget',
          level: 2
        },
        {
          name: 'Db Time',
          value: 'dbTime',
          level: 2
        },
        {
          name: 'Elapsed',
          value: 'elapsed',
          level: 2
        },
        {
          name: 'Thread Used',
          value: 'work',
          level: 2
        },
        {
          name: 'CPU Count',
          value: 'cpuCount',
          level: 2
        },
        {
          name: 'Allocable',
          value: 'allocable',
          level: 2
        },
        {
          name: 'DataFile Size',
          value: 'datafileSize',
          level: 2
        },
        {
          name: 'Segments Size',
          value: 'segmentsSize',
          level: 2
        },
        {
          name: 'ASM',
          value: 'asm',
          level: 2
        },
        {
          name: 'Data Guard',
          value: 'dataguard',
          level: 2
        },
        {
          name: 'Platform',
          value: 'platform',
          level: 2
        },
        {
          name: 'Version',
          value: 'version',
          level: 2
        },
        {
          name: 'Pluggable DBs',
          value: 'pdbs',
          level: 1
        },
        {
          name: 'Licenses',
          value: 'licenses',
          level: 1
        },
        {
          name: 'Options',
          value: 'options',
          level: 1
        },
        {
          name: 'Tablespaces',
          value: 'tablespaces',
          level: 1
        },
        {
          name: 'Schemas',
          value: 'schemas',
          level: 1
        },
        {
          name: 'Patches',
          value: 'patches',
          level: 1
        },
        {
          name: 'PSU',
          value: 'psus',
          level: 1
        },
        {
          name: 'ADDM',
          value: 'addms',
          level: 1
        },
        {
          name: 'Segment Advisors',
          value: 'segmentAdvisors',
          level: 1
        },
        {
          name: 'Backups',
          value: 'backups',
          level: 1
        },
        {
          name: 'Services',
          value: 'services',
          level: 1
        }
      ]
    },
    isDisabled() {
      return this.selectedKeys.length === 1 && this.selectedKeys[0] === 'name'
        ? true
        : false
    }
  },
  watch: {
    selectedKeys(selection) {
      if (selection.length === 0) {
        this.selectedKeys = ['name']
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.database-filters {
  margin-top: 6px;
  padding-bottom: 0;
  border: 1px solid #679189;
  border-radius: 4px;
}
</style>
