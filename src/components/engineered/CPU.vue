<template>
  <BoxContent title="CPU" border :mbottom="false">
    <GhostLoading :isLoading="loadingTableStatus" setHeight="18">
      <p class="is-size-7">
        {{ engineeredSystems.cpu.running }} /
        {{ engineeredSystems.cpu.total }}
      </p>
    </GhostLoading>
  </BoxContent>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'engineered-cpu-component',
  components: {
    BoxContent,
    GhostLoading,
  },
  computed: {
    ...mapState(['engineeredSystems']),
    ...mapGetters(['loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
