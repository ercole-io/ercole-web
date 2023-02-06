<template>
  <BoxContent :title="$t('views.engSystems.memory')" border :mbottom="false">
    <GhostLoading :isLoading="loadingTableStatus" setHeight="18">
      <p class="is-size-7">
        {{ engineeredSystems.memory | formatNumber('0', 'GB') }}
      </p>
    </GhostLoading>
  </BoxContent>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'engineered-memory-component',
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
