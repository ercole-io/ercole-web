<template>
  <BoxContent
    title="DB Growth Charts"
    border
    hasShadow
    :mbottom="false"
    v-if="isMounted"
  >
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
      totalRange="31"
      slot="customTitle"
    />
    <b-tabs
      size="is-small"
      type="is-toggle"
      destroy-on-hide
      vertical
      animated
      expanded
    >
      <b-tab-item
        v-for="(host, index) in getOracleDbgrowth"
        :label="host.hostname"
        :key="index"
      >
        <b-tabs
          size="is-small"
          type="is-boxed"
          destroy-on-hide
          animated
          expanded
          multiline
        >
          <b-tab-item
            v-for="(db, i) in host.oracleChangesDBs"
            :label="db.databasename"
            :key="i"
          >
            <LineChart
              :chartId="db.databasename"
              :lineChartData="mountDbGrowthChart(db.oracleChanges)"
              class="mt-5"
              discrete
            />
          </b-tab-item>
        </b-tabs>
      </b-tab-item>
    </b-tabs>
  </BoxContent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DbGrowthMixin from '@/mixins/oracle/dbGrowth.js'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  mixins: [DbGrowthMixin],
  components: {
    BoxContent,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  async beforeMount() {
    await this.getDbgrowth().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['getDbgrowth']),
  },
  computed: {
    ...mapGetters(['getOracleDbgrowth', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
