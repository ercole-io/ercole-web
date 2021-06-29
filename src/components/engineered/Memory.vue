<template>
  <BoxContent :title="$t('views.engSystems.memory')" border :mbottom="false">
    <p class="is-size-7">
      {{ engineeredSystems.memory | formatNumber('0', 'GB') }}
    </p>
  </BoxContent>
</template>

<script>
import { mapState } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
  computed: {
    ...mapState(['engineeredSystems'])
  }
}
</script>

<style lang="scss" scoped></style>
