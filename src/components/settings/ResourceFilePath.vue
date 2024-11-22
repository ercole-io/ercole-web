<template>
  <article>
    <Loading :isLoading="resourceFilePathLoading" />

    <BoxContent
      title="Resource File Path"
      class="is-size-4 has-text-weight-semibold"
      customStyle="padding: 20px 40px"
      border
    >
      <SettingsActions
        :reset="resetResourceFilePath"
        :action="saveResourceFilePath"
        slot="customTitle"
      />

      <BoxContent
        title="Parameters"
        class="is-size-5 has-text-weight-semibold"
        customStyle="padding: 20px 40px"
        border
        hasShadow
      >
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
      </BoxContent>
    </BoxContent>
  </article>
</template>

<script>
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'
import Loading from '@/components/common/Loading.vue'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  name: 'settings-resourcefile-component',
  mixins: [settings, HighlightSearchMixin],
  components: {
    SettingsActions,
    Loading,
    BoxContent,
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
        .then(() => {
          this.settingsWarning()
        })
    },
    resetResourceFilePath() {
      this.bindOriginalResourceFilePathData()
    },
  },
}
</script>

<style lang="scss" scoped></style>
