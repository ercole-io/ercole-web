<template>
  <BoxContent title="Databases" class="column is-8">
    <SearchInput
      searchPlaceholder="Search by DB name"
      v-model="searchDb"
      slot="customTitle"
      @input="onSearchDb($event)"
      :onBlur="findActiveTab"
    />
    <HbuttonScroll height="30" elemScroll="tabs" />

    <OracleDatabases
      :activeTab="activeTab"
      :filteredHostDbs="filteredHostDbs"
      :changeChart="bindDbChart"
      v-if="showDatabases && isOracle"
    />
    <MysqlDatabases
      :activeTab="activeTab"
      :filteredHostDbs="filteredHostDbs"
      v-else-if="showDatabases && isMysql"
    />

    <noContent
      v-else
      noContentText="There are no Databases for this Host"
      style="min-height: 200px"
    />
  </BoxContent>
</template>

<script>
import _ from 'lodash'
import { bus } from '@/helpers/eventBus.js'
import { mapState, mapActions, mapGetters } from 'vuex'
import OracleDatabases from '@/components/hosts/hostDetails/databases/oracle/OracleDatabases.vue'
import MysqlDatabases from '@/components/hosts/hostDetails/databases/mysql/MysqlDatabases.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import noContent from '@/components/common/NoContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'

export default {
  props: {
    activeDB: {
      type: String,
      required: false
    }
  },
  components: {
    OracleDatabases,
    MysqlDatabases,
    HbuttonScroll,
    BoxContent,
    noContent,
    SearchInput
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
      this.activeTab = _.findIndex(this.filteredHostDbs, {
        name: this.activeDB
      })
      this.bindDbChart()
    },
    onSearchDb(e) {
      if (e !== '' && e.length > 0) {
        this.activeTab = 0
      }
      this.bindDbChart()
    },
    bindDbChart() {
      if (this.activeTab === -1) {
        if (this.filteredHostDbs.length > 0) {
          bus.$emit('selectedData', [this.filteredHostDbs[0].name])
        }
      } else {
        if (this.filteredHostDbs.length > 0) {
          bus.$emit('selectedData', [this.filteredHostDbs[this.activeTab].name])
        }
      }
    }
  },
  computed: {
    ...mapState(['hostDetails']),
    ...mapGetters(['getCurrentHostDbs']),
    filteredHostDbs() {
      return _.filter(this.getCurrentHostDbs, db => {
        return (
          db.name
            .toString()
            .toLowerCase()
            .indexOf(this.searchDb.toLowerCase()) >= 0
        )
      })
    },
    showDatabases() {
      return this.filteredHostDbs.length > 0
    },
    isOracle() {
      return this.hostDetails.hostType === 'oracle'
    },
    isMysql() {
      return this.hostDetails.hostType === 'mysql'
    }
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
