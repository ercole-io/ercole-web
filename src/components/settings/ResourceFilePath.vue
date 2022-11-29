<template>
  <article>
    <Loading :isLoading="dataServiceLoading" />

    <SettingsActions formName="resourceFilePath" />

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
import settings from '@/mixins/settings/settings.js'
import SettingsActions from '@/components/settings/SettingsActions.vue'

export default {
  mixins: [settings],
  components: {
    SettingsActions,
  },
}
</script>

<style lang="scss" scoped></style>
