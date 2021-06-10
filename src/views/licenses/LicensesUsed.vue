<template>
  <section>
    <b-tabs size="is-small" type="is-boxed" class="block" @input="onTabChange">
      <b-tab-item label="Databases">
        <UsedLicensesDbs />
      </b-tab-item>
      <b-tab-item label="Hosts"> </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import UsedLicensesDbs from '@/components/licenses/used/databases/UsedLicensesDbs.vue'

export default {
  components: {
    UsedLicensesDbs
  },
  methods: {
    onTabChange() {
      bus.$emit('onTabChange')
    }
  }
}
</script>

<style lang="scss" scoped></style>
