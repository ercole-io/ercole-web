<template>
  <BoxContent
    :title="`${$t('views.hostDetails.databases')} (${countDatabases})`"
    border
    hasShadow
    :mbottom="false"
    customStyle="padding: 0"
  >
    <template slot="customTitle">
      <SearchInput
        :searchPlaceholder="$t('views.hostDetails.searchBy')"
        v-model="searchDb"
        @input="onSearch($event)"
        v-show="!hideMainSearch"
      />
    </template>

    <AdvancedFiltersButton slot="customTitle" />

    <div slot="customSubTitle" v-if="showMissingDbWarning" class="is-flex mb-3">
      <div class="is-flex is-flex-direction-column is-align-items-flex-start">
        <IsMissingDbs />
        <IgnoredMissingDbs />
      </div>
    </div>

    <HbuttonScroll height="30" elemScroll="tabs" />

    <div v-if="showDatabases">
      <Oracle v-if="isOracle" />
      <Mirosoft v-if="isMicrosoft" />
      <Mysql v-if="isMysql" />
      <Postgre v-if="isPostgresql" />
      <Mongodb v-if="isMongodb" />
    </div>

    <NoContent
      v-else
      :noContentText="$t('views.hostDetails.noDatabaseHost')"
      style="min-height: 200px"
    />
  </BoxContent>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapState } from 'vuex'

import databaseTypesMixin from '@/mixins/hostDetails/databaseTypes.js'
import databaseFiltersMixin from '@/mixins/hostDetails/databaseFilters.js'

import BoxContent from '@/components/common/BoxContent.vue'
import SearchInput from '@/components/common/SearchInput.vue'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import NoContent from '@/components/common/NoContent.vue'
import AdvancedFiltersButton from '@/components/hosts/hostDetails/DatabasesFiltersButton.vue'

import Oracle from '@/components/hosts/hostDetails/oracle/databases/Databases.vue'
import Mirosoft from '@/components/hosts/hostDetails/microsoft/databases/Databases.vue'
import Mysql from '@/components/hosts/hostDetails/mysql/databases/Databases.vue'
import Postgre from '@/components/hosts/hostDetails/postgresql/databases/Databases.vue'
import Mongodb from '@/components/hosts/hostDetails/mongodb/databases/Databases.vue'

import IsMissingDbs from '@/components/hosts/hostDetails/IsMissingDbs.vue'
import IgnoredMissingDbs from '@/components/hosts/hostDetails/IgnoredMissingDbs.vue'

export default {
  name: 'hosts-details-databases-data-component',
  mixins: [databaseFiltersMixin, databaseTypesMixin],
  components: {
    BoxContent,
    SearchInput,
    HbuttonScroll,
    NoContent,
    AdvancedFiltersButton,
    Oracle,
    Mirosoft,
    Mysql,
    Postgre,
    Mongodb,
    IsMissingDbs,
    IgnoredMissingDbs,
  },
  data() {
    return {
      hideMainSearch: false,
    }
  },
  beforeMount() {
    bus.$on('isDbFiltersOpen', (val) => {
      this.hideMainSearch = val
    })
  },
  computed: {
    ...mapGetters(['currentHostFiltered']),
    ...mapState(['hostDetails']),
    countDatabases() {
      return this.currentHostFiltered.length
    },
    showDatabases() {
      return this.currentHostFiltered.length > 0
    },
    showMissingDbWarning() {
      return (
        (this.hostDetails.isMissingDBs &&
          this.hostDetails.isMissingDBs.length > 0 &&
          this.hostDetails.hostType === 'oracle') ||
        (this.hostDetails.ignoredMissingDBs &&
          this.hostDetails.ignoredMissingDBs.length > 0)
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  &::-webkit-scrollbar {
    background: transparent;
  }
}
</style>
