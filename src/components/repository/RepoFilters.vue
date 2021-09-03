<template>
  <AdvancedFiltersBase :submitAction="applyFilters">
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

    <CustomField label="Release Date">
      <CustomDatepicker v-model="startDate" />
    </CustomField>

    <CustomField label="Version">
      <CustomSelect v-model="filters.Version" :options="filteredVersion" />
    </CustomField>
  </AdvancedFiltersBase>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'

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
      startDate: null
    }
  },
  created() {
    this.fullData = this.getRepository
  },
  methods: {
    applyFilters() {
      this.filters = {
        Installed: '',
        ReleaseDate: moment(this.startDate).format('DD/MM/YYYY')
      }
      this.apply()
    },
    resetFilters() {
      this.filters = {
        Installed: ''
      }
      this.startDate = null
    }
  },
  computed: {
    ...mapGetters(['getRepository'])
  }
}
</script>

<style lang="scss" scoped></style>
