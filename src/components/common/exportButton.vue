<template>
  <b-button type="is-primary" size="is-small" @click="exportData()">
    {{ text }}
  </b-button>
</template>

<script>
import axiosNoLoading from '@/axios/axios-no-loading.js'
import { saveAs } from 'file-saver'
import moment from 'moment'

const exportAll = {
  Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}
const exportLms = {
  Accept: 'application/vnd.oracle.lms+vnd.ms-excel.sheet.macroEnabled.12'
}

export default {
  props: {
    text: {
      type: String,
      default: 'Export Data'
    },
    type: {
      type: String,
      default: 'Data'
    },
    url: {
      type: String,
      required: true
    },
    expName: {
      type: String,
      required: true
    }
  },
  methods: {
    exportData() {
      let headers = this.type && this.type === 'LMS' ? exportLms : exportAll
      let extension = this.type && this.type === 'LMS' ? 'xlsm' : 'xlsx'
      const date = moment().format('YYYYMMDD')

      axiosNoLoading
        .get(`/${this.url}`, {
          headers: headers,
          responseType: 'blob'
        })
        .then(res => {
          saveAs(res.data, `${this.expName}-${date}.${extension}`)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
