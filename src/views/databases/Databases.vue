<template>
  <section>
    <div class="columns">
      <div class="column is-3">
        <div class="columns">
          <div class="column is-12">
            <DbCpuMemory />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbStorage />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbCharts id="TypeOfDatabases" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbCharts id="TypeOfEnvironment" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbCharts id="ArchivelogMode" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbCharts id="DisasterRecovery" />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbCharts id="HighAvailability" />
          </div>
        </div>
      </div>
      <div class="column is-9">
        <DbList />
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
import DbCpuMemory from '@/components/databases/databases/DbCpuMemory.vue'
import DbStorage from '@/components/databases/databases/DbStorage.vue'
import DbList from '@/components/databases/databases/DbList.vue'
import DbCharts from '@/components/databases/databases/DbCharts.vue'

export default {
  components: {
    DbCpuMemory,
    DbStorage,
    DbList,
    DbCharts
  },
  async beforeMount() {
    await this.getDatabases()
  },
  methods: {
    ...mapActions(['getDatabases'])
  }
}
</script>

<style lang="scss" scoped></style>
