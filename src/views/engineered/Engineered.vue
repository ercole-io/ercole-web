<template>
  <section>
    <div class="columns">
      <div class="column">
        <Cpu />
      </div>
      <div class="column">
        <Memory />
      </div>
      <div class="column">
        <Storage />
      </div>
      <div class="column is-7">
        <Patching />
      </div>
    </div>

    <div class="columns">
      <div class="column is-12">
        <ExadataTables />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import Cpu from '@/components/engineered/CPU.vue'
import Memory from '@/components/engineered/Memory.vue'
import Storage from '@/components/engineered/Storage.vue'
import Patching from '@/components/engineered/Patching.vue'
import ExadataTables from '@/components/engineered/ExadataTables.vue'

export default {
  name: 'engineered-page',
  components: {
    Cpu,
    Memory,
    Storage,
    Patching,
    ExadataTables,
  },
  async beforeMount() {
    await this.getEngineeredSystems()
  },
  methods: {
    ...mapActions(['getEngineeredSystems']),
  },
}
</script>

<style lang="scss" scoped></style>
