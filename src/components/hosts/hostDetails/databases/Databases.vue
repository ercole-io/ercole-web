<template>
  <BoxContent title="Databases">
    <SearchInput
      searchPlaceholder="Search by DB name"
      v-model="searchDb"
      slot="customTitle"
      @input="onSearchDb($event)"
      :onBlur="findActiveTab"
    />
    <!-- :onBlur="findActiveTab" -->
    <HbuttonScroll height="30" elemScroll="tabs" />

    <OracleDatabases
      :currentDBs="currentHostFiltered(searchDb)"
      :activatedTab="activeTab"
      v-if="currentHostType === 'oracle'"
    />

    <!-- <MysqlDatabases
      :activeTab="activeTab"
      :filteredHostDbs="filteredHostDbs"
      v-else-if="showDatabases && isMysql"
    /> -->

    <NoContent
      v-else
      NoContentText="There are no Databases for this Host"
      style="min-height: 200px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import OracleDatabases from '@/components/hosts/hostDetails/databases/oracle/OracleDatabases.vue'
// import MysqlDatabases from '@/components/hosts/hostDetails/databases/mysql/MysqlDatabases.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  components: {
    BoxContent,
    OracleDatabases,
    SearchInput,
    HbuttonScroll,
    // MysqlDatabases,
    NoContent
  },
  data() {
    return {
      activeTab: 0,
      searchDb: ''
    }
  },
  async beforeMount() {
    await this.getAgreementParts()
    this.findActiveTab()

    bus.$on('changeActiveTab', val => {
      this.activeTab = val
    })
  },
  methods: {
    ...mapActions(['getAgreementParts']),
    findActiveTab() {
      this.activeTab = _.findIndex(this.currentHostFiltered(this.searchDb), {
        name: this.currentHostActiveDB
      })
      // this.bindDbChart()
    },
    onSearchDb(e) {
      if (e !== '' && e.length > 0) {
        this.activeTab = 0
      }
      // this.bindDbChart()
    }
    //   bindDbChart() {
    //     if (this.activeTab === -1) {
    //       if (this.filteredHostDbs.length > 0) {
    //         bus.$emit('selectedData', [this.filteredHostDbs[0].name])
    //       }
    //     } else {
    //       if (this.filteredHostDbs.length > 0) {
    //         bus.$emit('selectedData', [this.filteredHostDbs[this.activeTab].name])
    //       }
    //     }
    //   }
  },
  computed: {
    ...mapGetters([
      'currentHostActiveDB',
      'currentHostType',
      'currentHostFiltered'
    ])
    // showDatabases() {
    //   console.log(this.filteredHostDbs.length > 0)
    //   return this.filteredHostDbs.length > 0
    // }
    //   isOracle() {
    //     return this.dbType === 'oracle'
    //   },
    //   isMysql() {
    //     return this.dbType === 'mysql'
    //   }
  }
}
</script>

<style lang="scss">
.tabs {
  &::-webkit-scrollbar {
    background: transparent;
  }
}
</style>
