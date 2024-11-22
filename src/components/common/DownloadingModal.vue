<template>
  <div class="modal-card" style="width: 450px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-5">{{ exportTitle }}</p>
    </header>
    <section class="modal-card-body">
      <b-button
        :label="exportParamsText"
        type="is-primary"
        size="is-small"
        :icon-right="isOpen ? 'menu-up' : 'menu-down'"
        @click="isOpen = !isOpen"
        aria-controls="openExportLmsParams"
        expanded
        v-if="isLms && !isLmsRequest"
      />

      <b-collapse
        aria-id="openExportLmsParams"
        animation="slide"
        v-model="isOpen"
      >
        <div style="height: 400px; align-items: flex-start; margin-top: 20px">
          <CustomField
            label="Date Older Then"
            v-if="exportType === 'ALL-HOSTS'"
          >
            <b-datepicker
              v-model="lmsFilters['older-than']"
              size="is-small"
              placeholder="Older Then"
              position="is-bottom-right"
              icon="calendar-today"
              :max-date="new Date()"
              :date-formatter="formatDate"
              class="mr-1"
              trap-focus
            />
          </CustomField>
          <CustomField
            label="Date"
            v-if="isLms && !isLmsRequest && exportType !== 'ALL-HOSTS'"
          >
            <b-datepicker
              v-model="lmsFilters.from"
              size="is-small"
              placeholder="From"
              position="is-bottom-right"
              icon="calendar-today"
              :max-date="lmsFilters.to ? lmsFilters.to : new Date()"
              :date-formatter="formatDate"
              class="mr-1"
              trap-focus
            />
            <b-datepicker
              v-model="lmsFilters.to"
              size="is-small"
              placeholder="To"
              position="is-bottom-left"
              icon="calendar-today"
              :min-date="lmsFilters.from"
              :max-date="new Date()"
              :date-formatter="formatDate"
              class="ml-1"
              trap-focus
            />
          </CustomField>
          <template
            v-if="(isLms && !isLmsRequest) || exportType === 'ALL-HOSTS'"
          >
            <CustomField label="Location">
              <b-select v-model="lmsFilters.location" size="is-small" expanded>
                <option :value="null" v-if="lmsFilters.location">
                  Reset Location
                </option>
                <option
                  v-for="(loc, index) in glFiltersState.locations"
                  :key="index"
                >
                  {{ loc }}
                </option>
              </b-select>
            </CustomField>
            <CustomField label="Environment">
              <b-select
                v-model="lmsFilters.environment"
                size="is-small"
                expanded
              >
                <option :value="null" v-if="lmsFilters.environment">
                  Reset Environment
                </option>
                <option
                  v-for="(env, index) in glFiltersState.environments"
                  :key="index"
                >
                  {{ env }}
                </option>
              </b-select>
            </CustomField>
          </template>
        </div>
      </b-collapse>

      <div v-if="!isLms || isLmsRequest" style="align-items: flex-start">
        <p class="mb-2">{{ msgTxt }}</p>
        <b-progress type="is-primary" v-if="exportType !== 'download'" />
        <b-progress
          type="is-primary"
          :value="setDownloadPercent"
          format="percent"
          show-value
          v-else
        />
      </div>
    </section>

    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button
        type="is-danger"
        size="is-small"
        :label="btText"
        @click="CancelRequest"
        v-if="!isLms || isLmsRequest"
      />
      <b-button
        type="is-danger"
        size="is-small"
        label="Close"
        @click="closeModal"
        v-if="isLms && isClose"
      />
      <b-button
        type="is-primary"
        size="is-small"
        label="Export LMS"
        @click="exportLms"
        v-if="isLms && !isLmsRequest && exportType !== 'ALL-HOSTS'"
      />
      <b-button
        type="is-primary"
        size="is-small"
        label="Export All Hosts"
        @click="exportLms"
        v-if="exportType === 'ALL-HOSTS'"
      />
    </footer>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import axios from 'axios'
import moment from 'moment'
import { saveAs } from 'file-saver'
import { axiosRequest } from '@/services/services.js'
import CustomField from '@/components/common/Form/CustomField.vue'
import formatDate from '@/filters/formatDate.js'
import i18n from '@/i18n.js'

const exportAll = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
const exportLms = {
  Accept: 'application/vnd.oracle.lms+vnd.ms-excel.sheet.macroEnabled.12',
}

const exportLmsMysql = {
  Accept: 'application/vnd.mysql.lms+vnd.ms-excel.sheet.macroEnabled.12',
}

export default {
  name: 'commom-downloadmodal-component',
  props: {
    exportType: {
      type: String,
    },
    exportTitle: {
      type: String,
    },
    exportUrl: {
      type: String,
    },
    exportApi: {
      type: String,
      default: 'baseApi',
    },
    exportName: {
      type: String,
    },
    exportExtension: {
      type: String,
      default: 'xlsx',
    },
    glFiltersState: {
      type: Object,
    },
    msgTxt: {
      type: String,
    },
    btText: {
      type: String,
    },
  },
  components: {
    CustomField,
  },
  data() {
    return {
      request: null,
      isLmsRequest: false,
      isClose: true,
      setDownloadPercent: 0,
      lmsFilters: {
        location: null,
        environment: null,
        from: null,
        to: null,
        'older-than': null,
      },
      isOpen: false,
    }
  },
  mounted() {
    if (!this.isLms && this.exportType !== 'download') {
      this.exportRequest()
    }
    if (this.exportType === 'download') {
      bus.$on('updateDownloadPerc', (val) => {
        this.setDownloadPercent = val
      })
      bus.$on('callCloseModal', () => {
        this.closeModal()
      })
    }
  },
  methods: {
    exportRequest() {
      let headers = this.isLms ? exportLms : exportAll
      if (this.isLms) {
        if (this.exportType === 'LMS') {
          headers = exportLms
        } else if (this.exportType === 'ALL-HOSTS') {
          headers = exportAll
        } else {
          headers = exportLmsMysql
        }
      } else {
        headers = exportAll
      }

      const date = moment().format('YYYYMMDD')

      this.request = axios.CancelToken.source()
      this.isClose = false

      if (this.isLms && this.lmsFilters.to) {
        const dateTo = this.lmsFilters.to
        dateTo.setDate(dateTo.getDate() + 1)
        this.lmsFilters.to = dateTo
      }

      const config = {
        method: 'get',
        url: `/${this.exportUrl}`,
        headers: headers,
        responseType: 'blob',
        cancelToken: this.request.token,
        params: this.lmsFilters,
        onDownloadProgress: (progressEvent) => {
          this.onDownloadProgress(progressEvent)
        },
      }
      axiosRequest(this.exportApi, config)
        .then((res) => {
          const filename =
            this.exportType === 'csv'
              ? `${this.exportName}.${this.exportExtension}`
              : `${this.exportName}-${date}.${this.exportExtension}`
          saveAs(res.data, filename)
        })
        .then(() => {
          this.closeModal()
        })
        .catch((err) => {
          if (err) {
            this.CancelRequest()
            this.closeModal()
          }
        })
    },
    exportLms() {
      this.isLmsRequest = true
      this.exportRequest()
    },
    CancelRequest() {
      if (this.isLms && this.exportType !== 'download') {
        this.isClose = true
        this.isLmsRequest = false
        this.request.cancel()
      } else if (!this.isLms && this.exportType !== 'download') {
        this.closeModal()
        this.request.cancel()
      } else {
        bus.$emit('callCancelExport')
      }
    },
    closeModal() {
      this.$emit('close')
    },
    onDownloadProgress(progressEvent) {
      let currentProgress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      this.setDownloadPercent = currentProgress
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  computed: {
    isLms() {
      if (
        this.exportType === 'LMS' ||
        this.exportType === 'LMS-MYSQL' ||
        this.exportType === 'ALL-HOSTS'
      ) {
        return true
      } else {
        return false
      }
    },
    exportParamsText() {
      return i18n.t('views.hosts.addExportParams')
    },
  },
}
</script>

<style lang="scss" scoped></style>
