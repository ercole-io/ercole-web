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
        @click="submitSettings('resourceFilePath')"
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
import settings from '@/mixins/settings/settings.js'

export default {
  mixins: [settings],
}
</script>

<style lang="scss" scoped></style>
