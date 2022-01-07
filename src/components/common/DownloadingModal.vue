<template>
  <div class="modal-card" style="width: 400px">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ exportTitle }}</p>
    </header>
    <section class="modal-card-body">
      <b-button
        :label="exportParamsText"
        type="is-primary"
        size="is-small"
        :icon-right="isOpen ? 'menu-up' : 'menu-down'"
        @click="isOpen = !isOpen"
        aria-controls="openExportLmsParams"
        v-if="isLms && !isLmsRequest"
      />

      <b-collapse
        aria-id="openExportLmsParams"
        animation="slide"
        v-model="isOpen"
        v-if="isLms && !isLmsRequest"
      >
        <div style="height: 400px; align-items: flex-start; margin-top: 20px">
          <CustomField label="Date">
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
            <b-select v-model="lmsFilters.environment" size="is-small" expanded>
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
        </div>
      </b-collapse>

      <div v-if="!isLms || isLmsRequest" style="align-items: flex-start">
        <p class="mb-2">{{ msgTxt }}</p>
        <b-progress type="is-primary"></b-progress>
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
        v-if="isLms && !isLmsRequest"
      />
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { saveAs } from 'file-saver'
import axiosNoLoading from '@/axios/axios-no-loading.js'
import CustomField from '@/components/common/Form/CustomField.vue'
import formatDate from '@/filters/formatDate.js'
import i18n from '@/i18n.js'

const exportAll = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
const exportLms = {
  Accept: 'application/vnd.oracle.lms+vnd.ms-excel.sheet.macroEnabled.12',
}

export default {
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
    exportName: {
      type: String,
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
      },
      isOpen: false,
    }
  },
  mounted() {
    if (!this.isLms) {
      this.exportRequest()
    }
  },
  methods: {
    exportRequest() {
      const headers = this.isLms ? exportLms : exportAll
      const extension = this.isLms ? 'xlsm' : 'xlsx'
      const date = moment().format('YYYYMMDD')

      this.request = axios.CancelToken.source()
      this.isClose = false

      axiosNoLoading
        .get(`/${this.exportUrl}`, {
          headers: headers,
          responseType: 'blob',
          cancelToken: this.request.token,
          params: this.lmsFilters,
          onDownloadProgress: (progressEvent) => {
            this.onDownloadProgress(progressEvent)
          },
        })
        .then((res) => {
          saveAs(res.data, `${this.exportName}-${date}.${extension}`)
        })
        .then(() => {
          this.$emit('close')
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
      if (this.isLms) {
        this.isClose = true
        this.isLmsRequest = false
      } else {
        this.closeModal()
      }
      this.request.cancel()
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
      return this.exportType === 'LMS' ? true : false
    },
    exportParamsText() {
      return i18n.t('views.hosts.addExportParams')
    },
  },
}
</script>

<style lang="scss" scoped></style>
