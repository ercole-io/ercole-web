<template>
  <ToggleColumns
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <div slot="left">
      <MoreInfoButtons :buttonItems="hostsMoreInfo" />
      <HostsFilters />
    </div>
    <BoxContent slot="center" :mbottom="false">
      <FullTable
        :placeholder="$t('menu.hosts')"
        :keys="getHeadKeys(hostsHead)"
        :tableData="getAllHosts"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <DynamicHeading
          slot="headData"
          v-for="head in hostsHead"
          :key="head.sort"
          :data="head"
        />

        <template slot="bodyData" slot-scope="rowData">
          <HostLink :hostname="rowData.scope.hostname" />
          <TdContent
            :value="rowData.scope.platform"
            :class="{ 'is-hidden': moreInfoToggle.hiddenVirtual }"
            class="border-left"
          />
          <TdContent
            :value="rowData.scope.cluster"
            :class="{ 'is-hidden': moreInfoToggle.hiddenVirtual }"
          />
          <TdContent
            :value="rowData.scope.virtNode"
            :class="{ 'is-hidden': moreInfoToggle.hiddenVirtual }"
            class="border-right"
          />
          <TdContent
            :value="rowData.scope.model"
            :class="{ 'is-hidden': moreInfoToggle.hiddenCpu }"
            class="border-left"
          />
          <TdContent
            :value="rowData.scope.threads"
            :class="{ 'is-hidden': moreInfoToggle.hiddenCpu }"
          />
          <TdContent
            :value="rowData.scope.cores"
            :class="{ 'is-hidden': moreInfoToggle.hiddenCpu }"
          />
          <TdContent
            :value="rowData.scope.socket"
            :class="{ 'is-hidden': moreInfoToggle.hiddenCpu }"
            class="border-right"
          />
          <TdContent
            :value="rowData.scope.version"
            :class="{ 'is-hidden': moreInfoToggle.hiddenAgent }"
            class="border-left"
          />
          <TdContent
            :value="rowData.scope.updated"
            dataType="date"
            :class="{ 'is-hidden': moreInfoToggle.hiddenAgent }"
            class="border-right"
          />
          <TdContent :value="rowData.scope.environment" />
          <TdArrayMore :value="rowData.scope.databases" />
          <TdContent :value="rowData.scope.techType" />
          <TdContent :value="rowData.scope.os" />
          <TdIcon :value="rowData.scope.iconCluster" />
          <TdContent :value="rowData.scope.kernel" />
          <TdContent :value="rowData.scope.memorytotal" />
          <TdContent :value="rowData.scope.swaptotal" />
        </template>

        <template slot="export">
          <ExportButton url="hosts" expName="hosts-data" />
          <ExportButton
            url="hosts"
            expName="hosts-lms-data"
            :text="`${$t('common.general.exportLms')}`"
            type="LMS"
          />
        </template>
      </FullTable>
    </BoxContent>
  </ToggleColumns>
</template>

<script>
//
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import HostsFilters from '@/components/hosts/hosts/HostsFilters.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import formatDate from '@/filters/formatDate.js'
import hostsHead from '@/views/hosts/hosts-head.json'
import hostsMoreInfo from '@/views/hosts/hosts-more-info.json'

export default {
  mixins: [localFiltersMixin, hostnameLinkRow, getHeadKeys],
  components: {
    ToggleColumns,
    BoxContent,
    FullTable,
    TdContent,
    TdIcon,
    TdArrayMore,
    ExportButton,
    HostsFilters,
    HostLink,
    DynamicHeading,
    MoreInfoButtons
  },
  data() {
    return {
      isMounted: false,
      hostsHead: hostsHead,
      hostsMoreInfo: hostsMoreInfo
    }
  },
  async beforeMount() {
    if (this.getAllHosts.length > 0) {
      this.isMounted = true
    } else {
      await this.getHosts().then(() => (this.isMounted = true))
    }
  },
  methods: {
    ...mapActions(['getHosts']),
    formatDate(date) {
      return formatDate(date)
    }
  },
  computed: {
    ...mapGetters(['getAllHosts']),
    ...mapState(['moreInfoToggle'])
  }
}
</script>

<style lang="scss"></style>
