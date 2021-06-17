<template>
  <BoxContent :title="`Databases (${currentHostFiltered(searchDb).length})`">
    <SearchInput
      searchPlaceholder="Search by DB name"
      v-model="searchDb"
      slot="customTitle"
      @input="onSearch($event)"
      :onBlur="onSearchBlur"
      v-if="currentHostDBs.length > 1"
    />

    <HbuttonScroll height="30" elemScroll="tabs" />

    <OracleDatabases
      :currentDBs="currentHostFiltered(searchDb)"
      v-if="showDatabases && isOracle"
    />

    <MysqlDatabases
      :currentDBs="currentHostFiltered(searchDb)"
      v-else-if="showDatabases && isMysql"
    />

    <NoContent
      v-else
      noContentText="There are no Databases for this Host"
      style="min-height: 200px"
    />
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import OracleDatabases from '@/components/hosts/hostDetails/databases/oracle/OracleDatabases.vue'
import MysqlDatabases from '@/components/hosts/hostDetails/databases/mysql/MysqlDatabases.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  components: {
    BoxContent,
    OracleDatabases,
    SearchInput,
    HbuttonScroll,
    MysqlDatabases,
    NoContent
  },
  data() {
    return {
      searchDb: ''
    }
  },
  async beforeMount() {
    await this.getAgreementParts()
  },
  methods: {
    ...mapActions(['getAgreementParts']),
    onSearch(e) {
      if (e !== '' && e.length > 0) {
        bus.$emit('isSearching', true)
      }
    },
    onSearchBlur() {
      if (this.searchDb.length === 0) {
        bus.$emit('isSearching', false)
      }
    }
  },
  computed: {
    ...mapGetters(['currentHostType', 'currentHostFiltered', 'currentHostDBs']),
    showDatabases() {
      return this.currentHostFiltered(this.searchDb).length > 0
    },
    isOracle() {
      return this.currentHostType === 'oracle'
    },
    isMysql() {
      return this.currentHostType === 'mysql'
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
