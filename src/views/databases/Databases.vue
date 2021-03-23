<template>
  <section>
    <div class="columns">
      <div class="column is-3">
        <div class="columns">
          <div class="column is-12">
            <DbTotalMemorySize />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbTotalSegmentSize />
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
import DbList from '@/components/databases/databases/DbList.vue'
import DbCharts from '@/components/databases/databases/DbCharts.vue'
import DbTotalMemorySize from '@/components/databases/databases/DbTotalMemorySize.vue'
import DbTotalSegmentSize from '@/components/databases/databases/DbTotalSegmentSize.vue'

export default {
  components: {
    DbList,
    DbCharts,
    DbTotalMemorySize,
    DbTotalSegmentSize
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
