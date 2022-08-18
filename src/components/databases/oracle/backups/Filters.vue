<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.hostname')">
          <CustomAutocomplete
            v-model="filters.hostname"
            :filterResult="filteredhostname"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.name')">
          <CustomAutocomplete
            v-model="filters.dbName"
            :filterResult="filtereddbName"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Days of the Week">
          <CustomAutocomplete
            v-model="filters.weekDays"
            :filterResult="filteredweekDays"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField label="Hour">
          <CustomSelect v-model="filters.hour" :options="filteredhour" />
        </CustomField>

        <CustomField label="Type">
          <CustomSelect
            v-model="filters.backupType"
            :options="filteredbackupType"
          />
        </CustomField>

        <CustomField label="Average">
          <CustomSlider
            v-model="filters.avgBckSize"
            :ticks="[minavgBckSize, maxavgBckSize]"
            :steps="1"
          />
        </CustomField>

        <CustomField label="Retention">
          <CustomSelect
            v-model="filters.retention"
            :options="filteredretention"
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
      autocompletes: ['hostname', 'dbName', 'weekDays'],
      selects: ['hour', 'backupType', 'retention'],
      sliders: ['avgBckSize'],
    }
  },
}
</script>

<style lang="scss" scoped></style>
