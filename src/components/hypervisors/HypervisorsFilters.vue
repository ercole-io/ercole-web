<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField label="VCenter">
          <CustomSelect
            v-model="filters.fetchEndpoint"
            :options="filteredfetchEndpoint"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.clusterName')">
          <CustomAutocomplete
            v-model="filters.name"
            :filterResult="filteredname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.type')">
          <CustomSelect v-model="filters.type" :options="filteredtype" />
        </CustomField>

        <CustomField :label="$t('common.fields.cores')">
          <CustomSlider
            v-model="filters.cpu"
            :ticks="[mincpu, maxcpu]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.socket')">
          <CustomSlider
            v-model="filters.sockets"
            :ticks="filteredsockets"
            marks
          />
        </CustomField>

        <CustomField :label="$t('common.fields.physicalHost')">
          <CustomAutocomplete
            v-model="filters.virtualizationNodes"
            :filterResult="filteredvirtualizationNodes"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$tc('common.fields.totalVM', 1)">
          <CustomSlider
            v-model="filters.vmsCount"
            :ticks="[minvmsCount, maxvmsCount]"
            :steps="1"
          />
        </CustomField>

        <CustomField :label="$tc('common.fields.totalVM', 2)">
          <CustomSlider
            v-model="filters.vmsErcoleAgentCount"
            :ticks="[minvmsErcoleAgentCount, maxvmsErcoleAgentCount]"
            :steps="1"
          />
        </CustomField>
      </template>
    </Collapse>

    <slot />
  </AdvancedFiltersBase>
</template>

<script>
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import Collapse from '@/components/common/Collapse.vue'

export default {
  mixins: [localFiltersMixin],
  components: {
    Collapse,
  },
  data() {
    return {
      collapses: ['General'],
      autocompletes: ['name', 'virtualizationNodes'],
      selects: ['fetchEndpoint', 'type'],
      sliders: ['cpu', 'sockets', 'vmsCount', 'vmsErcoleAgentCount'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
