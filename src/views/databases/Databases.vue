<template>
  <section>
    <div class="columns">
      <div class="column is-8">
        <DbList />
      </div>
      <div class="column is-4">
        <div class="columns">
          <div class="column is-6">
            <DbTotalMemorySize />
          </div>
          <div class="column is-6">
            <DbTotalSegmentSize />
          </div>
        </div>
        <div class="columns">
          <div class="column is-12">
            <DbCharts
              id="databasesChart"
              chartHeight="500px"
              :xAxesConfig="[true, 'top']"
            />
          </div>
        </div>
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
