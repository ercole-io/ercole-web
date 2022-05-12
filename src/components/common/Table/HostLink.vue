<template>
  <TdContent :value="getHostname" :link="handleHostnameClick">
    <slot />
  </TdContent>
</template>

<script>
import _ from 'lodash'
import TdContent from '@/components/common/Table/TdContent.vue'
import hostnameLinkMixin from '@/mixins/hostnameLink.js'

export default {
  mixins: [hostnameLinkMixin],
  components: {
    TdContent,
  },
  props: {
    hostname: {
      type: [String, Array],
      required: true,
    },
    showDbName: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getHostname() {
      if (_.isString(this.hostname)) {
        return this.hostname
      } else if (_.isArray(this.hostname) && this.showDbName) {
        return this.hostname[1]
      } else {
        return this.hostname[0]
      }
    },
    getDbname() {
      return _.isString(this.hostname) ? '' : this.hostname[1]
    },
  },
}
</script>

<style lang="scss" scoped></style>
