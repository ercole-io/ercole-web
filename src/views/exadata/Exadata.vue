<template>
  <section>
    <div class="columns">
      <div class="column is-12">
        <ExadataTables />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import ExadataTables from '@/components/exadata/exadatas/ExadataTables.vue'

export default {
  name: 'engineered-page',
  components: {
    ExadataTables,
  },
  async beforeMount() {
    await this.getExadataData()
  },
  methods: {
    ...mapActions(['getExadataData']),
  },
}
</script>

<style lang="scss" scoped></style>
