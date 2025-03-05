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

    <template slot="customSubTitle" v-if="showMissingDbWarning">
      <b-tag type="is-danger" class="custom-tag">
        This host has
        <span class="has-text-weight-bold">
          {{ hostDetails.isMissingDB.length }}
        </span>
        missing Databases:
        <span
          v-for="(db, i) in hostDetails.isMissingDB"
          :key="db"
          class="has-text-weight-bold"
        >
          {{ db }}<span v-if="i !== hostDetails.isMissingDB.length - 1">,</span>
        </span>
      </b-tag>

      <br />

      <b-tag type="is-info" class="mb-4 custom-tag" slot="customSubTitle">
        <b-icon
          type="is-white"
          class="is-clickable"
          pack="fas"
          icon="eye-slash"
          @click.native="openIgnoreDbsModal(hostDetails.isMissingDB)"
        />
        This host has <span class="has-text-weight-bold">0</span> ignored
        missing Databases
      </b-tag>
    </template>

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

import IgnoreMissingDbModal from '@/components/hosts/hostDetails/IgnoreMissingDbModal.vue'

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
  methods: {
    openIgnoreDbsModal(data) {
      this.$buefy.modal.open({
        component: IgnoreMissingDbModal,
        hasModalCard: true,
        props: {
          data: data,
        },
      })
    },
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
        this.hostDetails.isMissingDB &&
        this.hostDetails.isMissingDB.length > 0 &&
        this.hostDetails.hostType !== 'mysql' &&
        this.hostDetails.hostType !== 'microsoft' &&
        this.hostDetails.hostType !== 'postgresql' &&
        this.hostDetails.hostType !== 'mongodb'
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
