<template>
  <div class="modal-card" style="width: 500px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-5">
        Upload CSV {{ type | capitalize }} Contracts
      </p>
    </header>
    <section class="modal-card-body">
      <b-field class="file">
        <b-upload v-model="file" size="is-small" accept=".csv" expanded>
          <a class="button is-primary is-fullwidth">
            <b-icon icon="upload" />
            <span>{{ file.name || 'Click to upload' }}</span>
          </a>
        </b-upload>
      </b-field>

      <b-progress
        type="is-primary-ercole"
        :value="setUploadPercent"
        format="percent"
        show-value
        v-if="isUploadStarted"
      />

      <b-notification type="is-danger" has-icon v-if="hasNotification">
        <p>Something went wrong!</p>
        <b>{{ this.error }} - {{ this.message }}</b>
      </b-notification>
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <b-button
        type="is-danger"
        size="is-small"
        label="Close"
        @click="$parent.close()"
      />
      <b-button
        type="is-primary"
        size="is-small"
        label="Import"
        @click="importCSVfile"
        :disabled="!file.name"
      />
    </footer>
  </div>
</template>

<script>
import { axiosRequest } from '@/services/services.js'

export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    updateTable: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      file: {},
      error: '',
      message: '',
      hasNotification: false,
      setUploadPercent: 0,
      isUploadStarted: false,
    }
  },
  methods: {
    importCSVfile() {
      let formData = new FormData()
      formData.append('file', this.file)

      const config = {
        method: 'post',
        url: `contracts/${this.type}/upload`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formData,
        onUploadProgress: (event) => {
          let currentProgress = Math.round((event.loaded * 100) / event.total)
          this.setUploadPercent = currentProgress
        },
      }

      this.isUploadStarted = true

      axiosRequest('baseApi', config)
        .then(() => {
          this.$buefy.dialog.confirm({
            title: 'Import Success',
            message: `Your file ${this.file.name} has been uploaded successfully!`,
            confirmText: 'OK',
            type: 'is-success',
            size: 'is-small',
            onConfirm: () => this.$parent.close(),
          })
        })
        .then(() => {
          this.updateTable({ action: 'get', body: null })
        })
        .catch((err) => {
          this.hasNotification = true
          this.error = err.data.error
          this.message = err.data.message
          this.file = {}
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
