<template>
  <BoxContent
    title="DB Growth Charts"
    border
    hasShadow
    :mbottom="false"
    class="pt-0"
    v-if="isMounted"
  >
    <RangeDates
      :setRange="SET_RANGE_DATES_ALT"
      totalRange="31"
      slot="customTitle"
    />

    <div class="is-flex">
      <SearchInput
        :searchPlaceholder="$t('views.hostDetails.search')"
        v-model="searchTherm"
      />
    </div>

    <b-tabs
      size="is-small"
      type="is-toggle"
      destroy-on-hide
      vertical
      animated
      expanded
    >
      <b-tab-item
        v-for="(host, index) in filteredOracleDbGrowth"
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

    <NoContent
      v-if="filteredOracleDbGrowth.length === 0"
      noContentText="There are no results for this search"
      style="min-height: 332px"
    />
  </BoxContent>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import DbGrowthMixin from '@/mixins/oracle/dbGrowth.js'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  mixins: [DbGrowthMixin],
  components: {
    BoxContent,
    SearchInput,
    NoContent,
  },
  data() {
    return {
      isMounted: false,
      searchTherm: '',
    }
  },
  async beforeMount() {
    await this.getDbgrowth().then(() => {
      this.isMounted = true
    })
  },
  methods: {
    ...mapActions(['getDbgrowth']),
    ...mapMutations(['SET_SEARCH']),
  },
  computed: {
    ...mapGetters(['filteredOracleDbGrowth', 'loadingTableStatus']),
  },
  watch: {
    searchTherm(value) {
      this.SET_SEARCH(value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
