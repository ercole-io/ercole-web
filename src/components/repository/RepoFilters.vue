<template>
  <AdvancedFiltersBase :submitAction="apply">
    <Collapse :collapses="collapses">
      <template slot="General">
        <CustomField :label="$t('common.fields.repoName')">
          <CustomSelect v-model="filters.Name" :options="filteredName" />
        </CustomField>

        <CustomField :label="$t('common.fields.filename')">
          <CustomAutocomplete
            v-model="filters.Filename"
            :filterResult="filteredFilename"
            :filterMethod="setAutocompletes"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.arch')">
          <CustomSelect v-model="filters.Arch" :options="filteredArch" />
        </CustomField>

        <CustomField :label="$t('common.fields.opSys')">
          <CustomSelect
            v-model="filters.OperatingSystem"
            :options="filteredOperatingSystem"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.opSysFam')">
          <CustomSelect
            v-model="filters.OperatingSystemFamily"
            :options="filteredOperatingSystemFamily"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.repository')">
          <CustomSelect
            v-model="filters.Repository"
            :options="filteredRepository"
          />
        </CustomField>

        <CustomField :label="$t('common.fields.installed')">
          <CustomRadio v-model="filters.Installed" />
        </CustomField>

        <CustomField :label="$t('common.fields.releaseDate')">
          <CustomDatepicker v-model="startDate" />
        </CustomField>

        <CustomField :label="$t('common.fields.version')">
          <CustomSelect v-model="filters.Version" :options="filteredVersion" />
        </CustomField>
      </template>
    </Collapse>
  </AdvancedFiltersBase>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
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
      autocompletes: ['Filename'],
      selects: [
        'Name',
        'Arch',
        'OperatingSystem',
        'OperatingSystemFamily',
        'Repository',
        'Version',
      ],
      filters: {
        Installed: '',
      },
      startDate: null,
    }
  },
  created() {
    this.fullData = this.getRepository
  },
  methods: {
    resetFilters() {
      this.filters = {
        Installed: '',
        ReleaseDate: null,
      }
      this.startDate = null
    },
  },
  computed: {
    ...mapGetters(['getRepository']),
  },
  watch: {
    startDate(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.filters = {
          ReleaseDate: moment(this.startDate).format('DD/MM/YYYY'),
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
