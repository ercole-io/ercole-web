<template>
  <BoxContent title="Databases Advanced Filters" class="database-filters">
    <div class="block">
      <div v-for="(opt, i) in filterOptions" :key="i">
        <b-field class="mb-0">
          <b-checkbox
            size="is-small"
            v-model="selectedKeys"
            :native-value="opt.value"
            :disabled="opt.disabled"
          >
            {{ opt.name }}
          </b-checkbox>
        </b-field>
      </div>

      <b-button
        type="is-danger is-light"
        size="is-small"
        class="mt-2"
        @click="selectedKeys = ['name']"
        expanded
      >
        Reset Databases Filters
      </b-button>
    </div>
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
      ]
    }
  },
  methods: {
    ...mapMutations(['SET_DATABASES_FILTERS'])
  },
  computed: {
    ...mapState(['hostDetails']),
    filterOptions() {
      return [
        {
          name: 'Database Name',
          value: 'name',
          disabled: this.isDisabled
        },
        {
          name: 'Info',
          value: 'info'
        },
        {
          name: 'Pluggable DBs',
          value: 'pdbs'
        },
        {
          name: 'Licenses',
          value: 'licenses'
        },
        {
          name: 'Options',
          value: 'options'
        },
        {
          name: 'Tablespaces',
          value: 'tablespaces'
        },
        {
          name: 'Schemas',
          value: 'schemas'
        },
        {
          name: 'Patches',
          value: 'patches'
        },
        {
          name: 'PSU',
          value: 'psus'
        },
        {
          name: 'ADDM',
          value: 'addms'
        },
        {
          name: 'Segment Advisors',
          value: 'segmentAdvisors'
        },
        {
          name: 'Backups',
          value: 'backups'
        },
        {
          name: 'Services',
          value: 'services'
        }
      ]
    },
    selectedKeys: {
      get() {
        return this.hostDetails.dbFiltersSelected
      },
      set(val) {
        if (_.includes(val, 'info')) {
          _.map(this.info, item => {
            val.push(item)
          })
        } else {
          val = val.filter(item => !this.info.includes(item))
        }
        return this.SET_DATABASES_FILTERS(val)
      }
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
}
</style>
