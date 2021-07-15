<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ exportTitle }}</p>
    </header>
    <section class="modal-card-body">
      <div v-if="isLms && !isLmsRequest">
        <b-field label="Location" custom-class="is-size-7" horizontal>
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
        </b-field>
        <b-field label="Environment" custom-class="is-size-7" horizontal>
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
        </b-field>
      </div>

      <div v-if="!isLms || isLmsRequest">
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
        v-if="isLms"
      />
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { saveAs } from 'file-saver'
import axiosNoLoading from '@/axios/axios-no-loading.js'

const exportAll = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}
const exportLms = {
  Accept: 'application/vnd.oracle.lms+vnd.ms-excel.sheet.macroEnabled.12'
}

export default {
  props: {
    exportType: {
      type: String
    },
    exportTitle: {
      type: String
    },
    exportUrl: {
      type: String
    },
    exportName: {
      type: String
    },
    glFiltersState: {
      type: Object
    },
    msgTxt: {
      type: String
    },
    btText: {
      type: String
    }
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
        date: null
      }
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
          params: this.lmsFilters
          // params: params
          // onDownloadProgress: progressEvent => {
          //   this.onDownloadProgress(progressEvent)
          // }
        })
        .then(res => {
          saveAs(res.data, `${this.exportName}-${date}.${extension}`)
        })
        .then(() => {
          this.$emit('close')
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
        this.$emit('close')
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
    }
  },
  computed: {
    isLms() {
      return this.exportType === 'LMS' ? true : false
    }
  }
}
</script>

<style lang="scss" scoped></style>
