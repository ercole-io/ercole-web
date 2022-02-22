<template>
  <div>
    <b-button
      :label="$t('views.hostDetails.fileSystems')"
      @click="isModalActive = true"
      type="is-custom-primary"
      icon-pack="fas"
      icon-left="receipt"
      size="is-small"
      class="ml-1 mr-0"
    />

    <b-modal :active.sync="isModalActive" :width="750" scroll="keep">
      <FileSystemsContent :fileSysData="currentHostFileSystems" />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FileSystemsContent from '@/components/hosts/hostDetails/FileSystemsContent.vue'

export default {
  components: {
    FileSystemsContent,
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  computed: {
    ...mapGetters(['currentHostFileSystems']),
  },
}
</script>

<style lang="scss" scoped></style>
