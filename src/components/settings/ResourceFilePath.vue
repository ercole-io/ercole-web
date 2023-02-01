<template>
  <article>
    <Loading :isLoading="resourceFilePathLoading" />

    <SettingsActions
      :reset="resetResourceFilePath"
      :action="saveResourceFilePath"
    />

    <div class="columns is-multiline">
      <div class="column is-half">
        <div class="field">
          <label
            v-html="highlight(ResourceFilePathLabels[0])"
            class="label is-small"
          />
          <CustomInput v-model="ResourceFilePath" />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import Loading from '@/components/common/Loading.vue'

import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  mixins: [settings, HighlightSearchMixin],
  components: {
    SettingsActions,
    Loading,
  },
  data() {
    return {
      resourceFilePathLoading: false,
    }
  },
  methods: {
    saveResourceFilePath() {
      this.resourceFilePathLoading = true

      const data = {
        APIService: this.APIService,
        AlertService: this.AlertService,
        ChartService: this.ChartService,
        DataService: this.DataService,
        ResourceFilePath: this.ResourceFilePath,
        ThunderService: this.ThunderService,
      }

      this.saveSettings(data)
        .then(() => {
          setTimeout(() => {
            this.resourceFilePathLoading = false
          }, 1000)
        })
        .then(() => {
          this.successSaveSettings('resourceFilePath')
        })
    },
    resetResourceFilePath() {
      this.bindOriginalResourceFilePathData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
