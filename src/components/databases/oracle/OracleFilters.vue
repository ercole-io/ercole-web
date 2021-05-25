<template>
  <AdvancedFiltersBase :submitAction="apply">
    <form @submit.prevent="apply">
      <CustomField label="Name">
        <b-autocomplete
          v-model="filters.name"
          size="is-small"
          clearable
          :data="filteredname"
          @typing="setAutocompletes($event)"
        />
      </CustomField>

      <CustomField label="Version">
        <b-autocomplete
          v-model="filters.version"
          size="is-small"
          clearable
          :data="filteredversion"
          @typing="setAutocompletes($event)"
        />
      </CustomField>

      <CustomField label="Hostname">
        <b-autocomplete
          v-model="filters.hostname"
          size="is-small"
          clearable
          :data="filteredhostname"
          @typing="setAutocompletes($event)"
        />
      </CustomField>

      <CustomField label="Environment">
        <b-select
          v-model="filters.environment"
          size="is-small"
          placeholder="Select an Environment"
          expanded
        >
          <option :value="null" v-if="filters.environment">
            Reset
          </option>
          <option v-for="(env, index) in filteredenvironment" :key="index">
            {{ env }}
          </option>
        </b-select>
      </CustomField>

      <CustomField label="Work">
        <b-slider v-model="filters.work" :min="minwork" :max="maxwork">
          <b-slider-tick :value="minwork">
            {{ minwork }}
          </b-slider-tick>
          <b-slider-tick :value="maxwork">
            {{ maxwork }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="CPU Count">
        <b-slider
          v-model="filters.cpuCount"
          :min="mincpuCount"
          :max="maxcpuCount"
        >
          <b-slider-tick :value="mincpuCount">
            {{ mincpuCount }}
          </b-slider-tick>
          <b-slider-tick :value="maxcpuCount">
            {{ maxcpuCount }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="Block Size">
        <b-slider
          v-model="filters.blockSize"
          :min="minblockSize"
          :max="maxblockSize"
        >
          <b-slider-tick :value="minblockSize">
            {{ minblockSize }}
          </b-slider-tick>
          <b-slider-tick :value="maxblockSize">
            {{ maxblockSize }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="Status">
        <b-select
          v-model="filters.status"
          size="is-small"
          placeholder="Select an Status"
          expanded
        >
          <option :value="null" v-if="filters.status">
            Reset
          </option>
          <option v-for="(env, index) in filteredstatus" :key="index">
            {{ env }}
          </option>
        </b-select>
      </CustomField>

      <CustomField label="Unique Name">
        <b-autocomplete
          v-model="filters.uniqueName"
          size="is-small"
          clearable
          :data="filtereduniqueName"
          @typing="setAutocompletes($event)"
        />
      </CustomField>

      <CustomField label="Memory">
        <b-slider
          v-model="filters.memory"
          :min="minmemory"
          :max="maxmemory"
          :step="0.001"
        >
          <b-slider-tick :value="minmemory">
            {{ minmemory }}
          </b-slider-tick>
          <b-slider-tick :value="maxmemory">
            {{ maxmemory }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="Archivelog Mode">
        <div class="is-flex" style="justify-content: space-around;">
          <b-radio
            size="is-small"
            v-model="filters.archivelog"
            native-value="true"
          >
            Yes
          </b-radio>
          <b-radio
            size="is-small"
            v-model="filters.archivelog"
            native-value="false"
          >
            No
          </b-radio>
          <b-radio size="is-small" v-model="filters.archivelog" native-value="">
            All
          </b-radio>
        </div>
      </CustomField>

      <CustomField label="Disaster Recovery">
        <div class="is-flex" style="justify-content: space-around;">
          <b-radio
            size="is-small"
            v-model="filters.dataguard"
            native-value="true"
          >
            Yes
          </b-radio>
          <b-radio
            size="is-small"
            v-model="filters.dataguard"
            native-value="false"
          >
            No
          </b-radio>
          <b-radio size="is-small" v-model="filters.dataguard" native-value="">
            All
          </b-radio>
        </div>
      </CustomField>

      <CustomField label="High Availability">
        <div class="is-flex" style="justify-content: space-around;">
          <b-radio size="is-small" v-model="filters.ha" native-value="true">
            Yes
          </b-radio>
          <b-radio size="is-small" v-model="filters.ha" native-value="false">
            No
          </b-radio>
          <b-radio size="is-small" v-model="filters.ha" native-value="">
            All
          </b-radio>
        </div>
      </CustomField>

      <CustomField label="DataFile">
        <b-slider
          v-model="filters.datafileSize"
          :min="mindatafileSize"
          :max="maxdatafileSize"
          :step="0.001"
        >
          <b-slider-tick :value="mindatafileSize">
            {{ mindatafileSize }}
          </b-slider-tick>
          <b-slider-tick :value="maxdatafileSize">
            {{ maxdatafileSize }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="Segmemnt">
        <b-slider
          v-model="filters.segmentsSize"
          :min="minsegmentsSize"
          :max="maxsegmentsSize"
          :step="0.001"
        >
          <b-slider-tick :value="minsegmentsSize">
            {{ minsegmentsSize }}
          </b-slider-tick>
          <b-slider-tick :value="maxsegmentsSize">
            {{ maxsegmentsSize }}
          </b-slider-tick>
        </b-slider>
      </CustomField>

      <CustomField label="Charset">
        <b-autocomplete
          v-model="filters.charset"
          size="is-small"
          clearable
          :data="filteredcharset"
          @typing="setAutocompletes($event)"
        />
      </CustomField>
    </form>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    AdvancedFiltersBase,
    CustomField
  },
  data() {
    return {
      autocompletes: ['name', 'version', 'hostname', 'uniqueName', 'charset'],
      selects: ['status', 'environment'],
      sliders: [
        'work',
        'cpuCount',
        'blockSize',
        'memory',
        'datafileSize',
        'segmentsSize'
      ],
      filters: {
        archivelog: '',
        dataguard: '',
        ha: ''
      }
    }
  },
  created() {
    this.fullData = this.getAllOracleDBs

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    resetFilters() {
      this.filters = {
        archivelog: '',
        dataguard: '',
        ha: ''
      }
    }
  },
  computed: {
    ...mapGetters(['getAllOracleDBs'])
  }
}
</script>

<style lang="scss" scoped></style>
