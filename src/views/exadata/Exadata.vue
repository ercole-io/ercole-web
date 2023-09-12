<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <div class="contentChange">
          <b-button
            :type="changeLayout ? 'is-white' : 'is-primary'"
            icon-pack="fas"
            icon-left="list"
            @click="updateLayout(changeLayout !== changeLayout)"
          />
          <b-button
            :type="!changeLayout ? 'is-white' : 'is-primary'"
            icon-pack="fas"
            icon-left="table-cells-large"
            @click="updateLayout(!changeLayout !== changeLayout)"
          />
        </div>
        <ExadataList v-if="!changeLayout" />
        <ExadataTables v-else />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ExadataList from '@/components/exadata/exadatas/ExadataList.vue'
import ExadataTables from '@/components/exadata/exadatas/ExadataTables.vue'

export default {
  name: 'engineered-page',
  components: {
    ExadataTables,
    ExadataList,
  },
  data() {
    return {
      changeLayout: false,
    }
  },
  async beforeMount() {
    await this.getExadataData()
  },
  methods: {
    ...mapActions(['getExadataData']),
    updateLayout(val) {
      this.changeLayout = val
    },
  },
}
</script>

<style lang="scss" scoped></style>
