<template>
  <article>
    <Loading :isLoading="dataServiceLoading" />

    <div class="is-flex is-flex-direction-row is-justify-content-flex-end mb-3">
      <b-button
        type="is-danger"
        size="is-small"
        @click="resetResourceFilePath"
        class="mr-2"
      >
        Restore
      </b-button>

      <b-button
        type="is-custom-primary"
        size="is-small"
        @click="saveResourceFilePathSettings"
      >
        Save
      </b-button>
    </div>

    <div class="columns is-multiline">
      <div class="column is-half">
        <CustomField label="Resource File Path">
          <CustomInput v-model="ResourceFilePath" />
        </CustomField>
      </div>
    </div>
  </article>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
  beforeMount() {
    this.bindOriginalResourceFilePathData()

    bus.$on('resetAllSettings', () => {
      this.bindOriginalResourceFilePathData()
    })
  },
  methods: {
    bindOriginalResourceFilePathData() {
      this.ResourceFilePath = this.getResourceFilePath
    },
    saveResourceFilePathSettings() {
      this.resourceFilePathLoading = true
      this.submitSettings()
    },
    resetResourceFilePath() {
      console.log('reset resource file path')
      this.bindOriginalResourceFilePathData()
    },
  },
  computed: {
    ...mapGetters(['getResourceFilePath']),
  },
}
</script>

<style lang="scss" scoped></style>
