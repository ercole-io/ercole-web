<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Hostname">
      <b-autocomplete
        v-model="filters.hostname"
        size="is-small"
        clearable
        :data="filteredhostname"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Env">
      <b-select
        v-model="filters.environment"
        size="is-small"
        placeholder="Select an Env"
        expanded
      >
        <option :value="null" v-if="filters.environment">
          Reset
        </option>
        <option
          v-for="(env, index) in filteredenvironment"
          :key="index"
          :value="env"
        >
          {{ env }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="DBs">
      <b-autocomplete
        v-model="filters.databases"
        size="is-small"
        clearable
        :data="filtereddatabases"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Tech">
      <b-select
        v-model="filters.techType"
        size="is-small"
        placeholder="Select a Tech"
        expanded
      >
        <option :value="null" v-if="filters.techType">
          Reset
        </option>
        <option
          v-for="(tec, index) in filteredtechType"
          :key="index"
          :value="tec"
        >
          {{ tec }}
        </option>
      </b-select>
    </CustomField>

    <CustomField label="OS">
      <b-autocomplete
        v-model="filters.os"
        size="is-small"
        clearable
        :data="filteredos"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Clust">
      <div class="is-flex" style="justify-content: space-around;">
        <b-radio
          size="is-small"
          v-model="filters.iconCluster"
          native-value="true"
        >
          Yes
        </b-radio>
        <b-radio
          size="is-small"
          v-model="filters.iconCluster"
          native-value="false"
        >
          No
        </b-radio>
        <b-radio size="is-small" v-model="filters.iconCluster" native-value="">
          All
        </b-radio>
      </div>
    </CustomField>

    <CustomField label="Kernel">
      <b-autocomplete
        v-model="filters.kernel"
        size="is-small"
        clearable
        :data="filteredkernel"
        @typing="setAutocompletes($event)"
      />
    </CustomField>

    <CustomField label="Memory">
      <b-slider
        v-model="filters.memorytotal"
        :min="minmemorytotal"
        :max="maxmemorytotal"
      >
        <b-slider-tick :value="minmemorytotal">
          {{ minmemorytotal }}
        </b-slider-tick>
        <b-slider-tick :value="maxmemorytotal">
          {{ maxmemorytotal }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Swap">
      <b-slider
        v-model="filters.swaptotal"
        :min="minswaptotal"
        :max="maxswaptotal"
      >
        <b-slider-tick :value="minswaptotal">
          {{ minswaptotal }}
        </b-slider-tick>
        <b-slider-tick :value="maxswaptotal">
          {{ maxswaptotal }}
        </b-slider-tick>
      </b-slider>
    </CustomField>

    <CustomField label="Updated">
      <b-datepicker
        v-model="startDate"
        size="is-small"
        placeholder="Start Date"
        position="is-bottom-right"
        icon="calendar-today"
        :max-date="new Date()"
        :date-formatter="formatDate"
        class="mr-1"
      />
    </CustomField>

    <Collapse title="Virtual" id="virtual" padding margin>
      <CustomField label="Platform">
        <b-select
          v-model="filters.platform"
          size="is-small"
          placeholder="Select a Platform"
          expanded
        >
          <option :value="null" v-if="filters.platform">
            Reset
          </option>
          <option
            v-for="(plat, index) in filteredplatform"
            :key="index"
            :value="plat"
          >
            {{ plat }}
          </option>
        </b-select>
      </CustomField>

      <CustomField label="Cluster">
        <b-autocomplete
          v-model="filters.cluster"
          size="is-small"
          clearable
          :data="filteredcluster"
          @typing="setAutocompletes($event)"
        >
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </CustomField>

      <CustomField label="Node">
        <b-autocomplete
          v-model="filters.virtNode"
          size="is-small"
          clearable
          :data="filteredvirtNode"
          @typing="setAutocompletes($event)"
        >
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </CustomField>
    </Collapse>

    <Collapse title="CPU" id="cpu" padding margin>
      <CustomField label="Processor Model">
        <b-autocomplete
          v-model="filters.model"
          size="is-small"
          clearable
          :data="filteredmodel"
          @typing="setAutocompletes($event)"
        >
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </CustomField>

      <CustomField label="threads">
        <b-slider v-model="filters.threads" :min="minthreads" :max="maxthreads">
          <b-slider-tick :value="minthreads">
            {{ minthreads }}
          </b-slider-tick>
          <b-slider-tick :value="maxthreads">
            {{ maxthreads }}
          </b-slider-tick>
          <!-- <template v-for="val in filteredthreads">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template> -->
        </b-slider>
      </CustomField>

      <CustomField label="Cores">
        <b-slider v-model="filters.cores" :min="mincores" :max="maxcores">
          <b-slider-tick :value="mincores">
            {{ mincores }}
          </b-slider-tick>
          <b-slider-tick :value="maxcores">
            {{ maxcores }}
          </b-slider-tick>
          <!-- <template v-for="val in filteredcores">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template> -->
        </b-slider>
      </CustomField>

      <CustomField label="Socket">
        <b-slider v-model="filters.socket" :min="minsocket" :max="maxsocket">
          <b-slider-tick :value="minsocket">
            {{ minsocket }}
          </b-slider-tick>
          <b-slider-tick :value="maxsocket">
            {{ maxsocket }}
          </b-slider-tick>
          <!-- <template v-for="val in filteredsocket">
                <b-slider-tick :value="val" :key="val">{{ val }}</b-slider-tick>
              </template> -->
        </b-slider>
      </CustomField>
    </Collapse>

    <Collapse title="Agent" id="agent" padding margin>
      <CustomField label="Version">
        <b-select
          v-model="filters.version"
          size="is-small"
          placeholder="Select a Version"
          expanded
        >
          <option :value="null" v-if="filters.version">
            Reset
          </option>
          <option
            v-for="(ver, index) in filteredversion"
            :key="index"
            :value="ver"
          >
            {{ ver }}
          </option>
        </b-select>
      </CustomField>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import { formatDatepickerDate } from '@/helpers/helpers.js'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import AdvancedFiltersBase from '@/components/common/AdvancedFiltersBase.vue'
import CustomField from '@/components/common/Form/CustomField.vue'
import Collapse from '@/components/common/Collapse.vue'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin],
  components: {
    CustomField,
    Collapse,
    AdvancedFiltersBase
  },
  data() {
    return {
      autocompletes: [
        'hostname',
        'databases',
        'model',
        'os',
        'kernel',
        'cluster',
        'virtNode'
      ],
      selects: ['environment', 'techType', 'platform', 'version'],
      sliders: ['threads', 'cores', 'socket', 'memorytotal', 'swaptotal'],
      startDate: null,
      filters: {
        iconCluster: ''
      }
    }
  },
  created() {
    this.fullData = this.getAllHosts

    bus.$on('onResetAction', () => this.reset(this.resetFilters))
  },
  methods: {
    ...mapActions(['getHosts']),
    resetFilters() {
      this.filters = {
        iconCluster: ''
      }
      this.startDate = null
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getAllHosts'])
  },
  watch: {
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getHosts(formatDatepickerDate(this.startDate))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.static-filters {
  padding: 10px 10px 0 10px;
  background-color: #f5f5f5;
  overflow: auto;
  max-height: 550px;
  position: relative;
}
</style>
