<template>
  <BoxContent
    title="Capacity Average and Daily Average Usage"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding: 20px"
    v-if="isMounted"
  >
    <div class="is-flex">
      <SearchInput
        :searchPlaceholder="$t('views.hostDetails.search')"
        v-model="searchTherm"
      />
    </div>

    <b-tabs
      v-model="activeTab"
      @input="getHostDatabasesData"
      size="is-small"
      type="is-toggle"
      destroy-on-hide
      vertical
      animated
      expanded
      class="vertical-tabs-scroll"
    >
      <b-tab-item
        v-for="(host, index) in oracleHostNamesList"
        :value="host"
        :label="host"
        :key="index"
      >
        <b-tabs size="is-small" type="is-boxed" destroy-on-hide animated>
          <b-tab-item
            v-for="db in oracleDatabasesCapacity"
            :value="db.dbName"
            :label="db.dbName"
            :key="db.dbName"
          >
            {{ db.dbCapacity }}

            <div class="pdb-box" v-if="db.pdbs.length > 0">
              <p class="has-text-centered has-text-weight-medium">
                {{ db.dbName }} - Pluggable Databases
              </p>

              <CollapseSimple
                :isOpen="false"
                :collapseID="`collapse-${pdb.pdbName}`"
                :collapseTitle="pdb.pdbName"
                v-for="pdb in db.pdbs"
                :key="pdb.pdbName"
              >
                {{ pdb.pdbCapacity }}
              </CollapseSimple>
            </div>
          </b-tab-item>
        </b-tabs>
      </b-tab-item>
    </b-tabs>

    <NoContent
      v-if="oracleHostNamesList.length === 0"
      noContentText="There are no results for this search"
      style="min-height: 332px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import NoContent from '@/components/common/NoContent.vue'
import CollapseSimple from '@/components/common/CollapseSimple.vue'

export default {
  name: 'oracle-databases-capacity-page',
  components: { BoxContent, SearchInput, NoContent, CollapseSimple },
  data() {
    return {
      isMounted: false,
      activeTab: '',
      searchTherm: '',
    }
  },
  async beforeMount() {
    await this.getOracleHostNames()
      .then(() => {
        this.activeTab = this.oracleHostNamesList[0]
      })
      .then(() => {
        this.getHostDatabasesData(this.activeTab)
      })
      .then(() => {
        this.isMounted = true
      })
  },
  methods: {
    ...mapActions(['getOracleHostNames', 'getOracleCapacityData']),
    ...mapMutations(['SET_SEARCH_HOSTNAME']),
    getHostDatabasesData(hostname) {
      _.filter(this.oracleHostNamesList, (val) => {
        if (val === hostname) {
          this.getOracleCapacityData(val)
        }
      })
    },
  },
  computed: {
    ...mapGetters(['oracleHostNamesList', 'oracleDatabasesCapacity']),
  },
  watch: {
    searchTherm(value) {
      this.SET_SEARCH_HOSTNAME(value)
      this.activeTab = this.oracleHostNamesList[0]

      if (!value) {
        this.getOracleHostNames().then(() => {
          this.activeTab = this.oracleHostNamesList[0]
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.pdb-box {
  margin-top: 20px;
  padding: 10px 10px 0 10px;
  border: 1px solid #dbdbdb;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.5),
    0 0.5em 1em -0.125em rgba(10, 10, 10, 0.5);
}
</style>
