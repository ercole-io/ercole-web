<template>
  <div>
    <span class="filesys mr-1">
      <b-button
        label="File Systems"
        @click="isFilesysModalActive = true"
        type="is-primary"
        icon-pack="fas"
        icon-left="receipt"
        size="is-small"
        class="ml-1"
      />
    </span>

    <b-modal :active.sync="isFilesysModalActive" :width="750" scroll="keep">
      <FileSysContent :fileSysData="hostDetails.filesys" />
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FileSysContent from '@/components/hosts/hostDetails/FileSysContent.vue'

export default {
  components: {
    FileSysContent
  },
  data() {
    return {
      isFilesysModalActive: false
    }
  },
  computed: {
    ...mapState(['hostDetails'])
  }
}
</script>

<style lang="scss" scoped>
.filesys {
  font-size: 0.8em;
  line-height: 27px;
}
</style>
