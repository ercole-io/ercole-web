<template>
  <TdContent :value="hostname" :link="handleHostnameClick" />
</template>

<script>
import TdContent from '@/components/common/Table/TdContent.vue'
import hostnameLinkMixin from '@/mixins/hostnameLink.js'

export default {
  mixins: [hostnameLinkMixin],
  components: {
    TdContent
  },
  props: {
    hostname: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped></style>
