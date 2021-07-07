<template>
  <TdContent
    :value="getHostname"
    :link="handleHostnameClick"
    :rightClick="handleHostnameRightClick"
  />
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
      type: [String, Array],
      required: true
    }
  },
  computed: {
    getHostname() {
      return typeof this.hostname === 'string'
        ? this.hostname
        : this.hostname[0]
    },
    getDbname() {
      return typeof this.hostname === 'string' ? '' : this.hostname[1]
    }
  }
}
</script>

<style lang="scss" scoped></style>
