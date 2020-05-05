<template>
  <header>
    <headerTop />
    <headerBottom />
  </header>
</template>

<script>
import Top from './Top'
import Bottom from './Bottom'

export default {
  components: {
    headerTop: Top,
    headerBottom: Bottom
  }
}
</script>

<style lang="scss" scoped></style>
