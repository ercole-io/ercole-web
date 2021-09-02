<template>
  <AdvancedFiltersBase :submitAction="apply">
    <CustomField label="Name">
      <CustomSelect v-model="filters.Name" :options="filteredName" />
    </CustomField>

    <CustomField label="Filename">
      <CustomAutocomplete
        v-model="filters.Filename"
        :filterResult="filteredFilename"
        :filterMethod="setAutocompletes"
      />
    </CustomField>

    <CustomField label="Arch">
      <CustomSelect v-model="filters.Arch" :options="filteredArch" />
    </CustomField>

    <CustomField label="OS">
      <CustomSelect
        v-model="filters.OperatingSystem"
        :options="filteredOperatingSystem"
      />
    </CustomField>

    <CustomField label="OS Family">
      <CustomSelect
        v-model="filters.OperatingSystemFamily"
        :options="filteredOperatingSystemFamily"
      />
    </CustomField>

    <CustomField label="Repository">
      <CustomSelect
        v-model="filters.Repository"
        :options="filteredRepository"
      />
    </CustomField>

    <CustomField label="Installed">
      <CustomRadio v-model="filters.Installed" />
    </CustomField>

    <!-- <CustomField label="Release Date">
      <b-datepicker
        v-model="startDate"
        size="is-small"
        placeholder="Start Date"
        position="is-top-right"
        icon="calendar-today"
        :max-date="endDate ? endDate : new Date()"
        :date-formatter="formatDate"
        class="mr-1"
        trap-focus
        append-to-body
      />
      <b-datepicker
        v-model="endDate"
        size="is-small"
        placeholder="End Date"
        position="is-top-right"
        icon="calendar-today"
        :min-date="startDate"
        :max-date="new Date()"
        :date-formatter="formatDate"
        class="ml-1"
        trap-focus
        append-to-body
      />
    </CustomField> -->

    <CustomField label="Version">
      <CustomSelect v-model="filters.Version" :options="filteredVersion" />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import formatDate from '@/filters/formatDate.js'

export default {
  mixins: [localFiltersMixin],
  data() {
    return {
      autocompletes: ['Filename'],
      selects: [
        'Name',
        'Arch',
        'OperatingSystem',
        'OperatingSystemFamily',
        'Repository',
        'Version'
      ],
      filters: {
        Installed: ''
      },
      startDate: null,
      endDate: null
    }
  },
  created() {
    this.fullData = this.getRepository
  },
  methods: {
    resetFilters() {
      this.filters = {
        Installed: ''
      }
    },
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getRepository'])
  }
}
</script>

<style lang="scss" scoped></style>
