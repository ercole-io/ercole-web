<template>
  <b-tab-item label="DB Growth">
    <RangeDates :setRange="SET_RANGE_DATES_ALT" class="mt-0 mr-0" />
    <CollapseSimple
      :isOpen="true"
      collapseID="all"
      collapseTitle="Sum All Pdbs"
    >
      <DbGrowth :data="growth" dataID="dbGrowth-all" />
    </CollapseSimple>

    <CollapseSimple
      v-for="(pdb, i) in pdbs"
      :key="i"
      :id="i"
      :isOpen="false"
      :collapseID="pdb.pdbName"
      :collapseTitle="pdb.pdbName"
    >
      <DbGrowth
        :data="getOraclePdbsDbGrowth(dbname, pdb.pdbName)"
        :dataID="`dbGrowth-${pdb.pdbName}`"
        class="mt-3"
      />
    </CollapseSimple>
  </b-tab-item>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import DbGrowth from '@/components/common/DbGrowth.vue'
import CollapseSimple from '@/components/common/CollapseSimple.vue'
import RangeDates from '@/components/common/RangeDates.vue'

export default {
  name: 'hosts-details-oracle-databases-growth-component',
  props: {
    growth: {
      type: Array,
      default: () => [],
    },
    pdbs: {
      type: Array,
      default: () => [],
    },
    dbname: {
      type: String,
      required: true,
    },
  },
  components: {
    DbGrowth,
    CollapseSimple,
    RangeDates,
  },
  methods: {
    ...mapMutations(['SET_RANGE_DATES_ALT']),
  },
  computed: {
    ...mapGetters(['getOraclePdbsDbGrowth']),
  },
}
</script>

<style lang="scss" scoped></style>
