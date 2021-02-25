<template>
  <BoxContent title="CPU" border :mbottom="false">
    <p class="is-size-7">
      {{ engineeredSystems.cpu.running }} /
      {{ engineeredSystems.cpu.total }}
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
