<template>
  <GhostLoading
    :isLoading="loadingTableStatus"
    setHeight="30"
    setWidth="107"
    class="mr-2"
  >
    <b-button
      :label="$t('views.hostDetails.fileSystems')"
      @click="isModalActive = true"
      type="is-ercole-blue"
      icon-pack="fas"
      icon-left="receipt"
      size="is-small"
    />

    <b-modal :active.sync="isModalActive" :width="750" scroll="keep">
      <FileSystemsContent :fileSysData="hostFileSystems" />
    </b-modal>
  </GhostLoading>
</template>

<script>
import { mapGetters } from 'vuex'
import FileSystemsContent from '@/components/hosts/hostDetails/FileSystemsContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'hosts-details-filesystems-main-component',
  components: {
    FileSystemsContent,
    GhostLoading,
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  computed: {
    ...mapGetters(['hostFileSystems', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
