<template>
  <BoxContent title="Storage Used" border>
    <p class="is-size-7">
      {{ engineeredSystems.storage | formatNumber('0.00', '%') }}
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
