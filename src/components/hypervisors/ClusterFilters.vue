<template>
  <DrawerFilters title="Clusters Filters">
    <form @submit.prevent="apply">
      <CustomField label="Physical Host">
        <b-autocomplete
          v-model="filters.virtualizationNode"
          size="is-small"
          type="number"
          clearable
          :data="filteredData"
          @typing="
            setFilteredAutocomplete(
              $event,
              'virtualizationNode',
              getCurrentClusterVms
            )
          "
        />
      </CustomField>

      <CustomField label="Hostname">
        <b-autocomplete
          v-model="filters.hostname"
          size="is-small"
          type="number"
          clearable
          :data="filteredData"
          @typing="
            setFilteredAutocomplete($event, 'hostname', getCurrentClusterVms)
          "
        />
      </CustomField>

      <CustomField label="VM Name">
        <b-autocomplete
          v-model="filters.name"
          size="is-small"
          type="number"
          clearable
          :data="filteredData"
          @typing="
            setFilteredAutocomplete($event, 'name', getCurrentClusterVms)
          "
        />
      </CustomField>

      <CustomField label="Capped CPU">
        <div class="is-flex" style="justify-content: space-around;">
          <b-radio
            size="is-small"
            v-model="filters.cappedCPU"
            :native-value="true"
          >
            Yes
          </b-radio>
          <b-radio
            size="is-small"
            v-model="filters.cappedCPU"
            :native-value="false"
          >
            No
          </b-radio>
          <b-radio size="is-small" v-model="filters.cappedCPU" native-value="">
            All
          </b-radio>
        </div>
      </CustomField>

      <FiltersButtons />
    </form>
  </DrawerFilters>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import DrawerFilters from '@/components/common/DrawerFilters.vue'
import FiltersButtons from '@/components/common/Filters/FiltersButtons.vue'
import CustomField from '@/components/common/Filters/CustomField.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    DrawerFilters,
    FiltersButtons,
    CustomField
  },
  beforeMount() {
    this.setAutocompleteData('virtualizationNode', this.getCurrentClusterVms)
    this.setAutocompleteData('hostname', this.getCurrentClusterVms)
    this.setAutocompleteData('name', this.getCurrentClusterVms)

    bus.$on('resetFilters', () => this.reset())
  },
  computed: {
    ...mapGetters(['getCurrentClusterVms'])
  }
}
</script>

<style lang="scss" scoped></style>
