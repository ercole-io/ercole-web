<template>
  <ToggleColumns
    getPage="hosts"
    :leftButton="$t('common.forms.advancedFilters')"
    :centerCol="9"
    v-if="isMounted"
  >
    <HostsFilters slot="left">
      <Loading :isLoading="loadingTableStatus" v-if="firstLoad" />
    </HostsFilters>

    <FullTable
      :placeholder="$t('menu.hosts')"
      :keys="getHeadKeys(hostsHead)"
      :tableData="getAllHosts"
      @clickedRow="handleClickedRow"
      isClickable
      :isLoadingTable="loadingTableStatus"
      slot="center"
    >
      <MoreInfoButtons :buttonItems="hostsMoreInfo" slot="customTopHeader" />

      <RefreshButton
        :clickAction="getHostData"
        tooltipMsg="Update Host Data"
        slot="customTopHeader"
      />

      <DynamicHeading
        slot="headData"
        v-for="head in hostsHead"
        :key="head.sort"
        :data="head"
      />

      <template slot="bodyData" slot-scope="rowData">
        <td class="first-col" style="min-width: 0; padding-right: 0">
          <b-icon
            v-if="rowData.scope.obsolete"
            size="is-medium"
            custom-size="mdi-18px"
            icon="alert"
            type="is-warning"
            @click.native="handleClickedRow([rowData.scope])"
            v-tooltip="options(rowData.scope.obsoleteDiff)"
          />
        </td>
        <HostLink
          :hostname="rowData.scope.hostname"
          class="first-col"
          style="text-align: left; padding-left: 0"
        />
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
        <td
          :class="{ 'is-hidden': moreInfoToggle.hiddenAgent }"
          style="min-width: 0; padding-right: 0"
        >
          <b-icon
            v-if="rowData.scope.obsolete"
            size="is-medium"
            custom-size="mdi-18px"
            icon="alert"
            type="is-warning"
            @click.native="handleClickedRow([rowData.scope])"
            v-tooltip="options(rowData.scope.obsoleteDiff)"
          />
        </td>
        <TdContent
          :value="rowData.scope.updated"
          dataType="date"
          :class="{ 'is-hidden': moreInfoToggle.hiddenAgent }"
          class="border-right"
          style="text-align: left; padding-left: 0"
        />
        <TdContent :value="rowData.scope.environment" />
        <TdArrayMore
          v-if="rowData.scope.databases.length > 5"
          :value="rowData.scope.databases"
        />
        <TdArrayMore
          v-else
          :value="rowData.scope.databases"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdArrayMore
          v-if="
            rowData.scope.isMissingDB && rowData.scope.isMissingDB.length > 5
          "
          :value="rowData.scope.isMissingDB || '-'"
        />
        <TdArrayMore
          v-else
          :value="rowData.scope.isMissingDB || '-'"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent :value="rowData.scope.techType" />
        <TdContent :value="rowData.scope.os" />
        <TdIcon
          :value="rowData.scope.iconCluster"
          @click.native="handleClickedRow([rowData.scope])"
        />
        <TdContent :value="rowData.scope.clusterwareVersion" />
        <TdContent :value="rowData.scope.kernel" />
        <TdContent :value="rowData.scope.memorytotal" />
        <TdContent :value="rowData.scope.swaptotal" />
      </template>

      <template slot="export">
        <ExportButton
          url="hosts"
          expName="hosts-data"
          text="Export All Hosts"
          type="ALL-HOSTS"
        />
        <ExportButton
          url="hosts"
          expName="hosts-lms-data"
          :text="`${$t('common.general.exportLms')}`"
          type="LMS"
          extension="xlsm"
        />
        <ExportButton
          url="hosts"
          expName="hosts-lms-mysql-data"
          :text="`${$t('common.general.exportLmsMysql')}`"
          type="LMS-MYSQL"
          extension="xlsm"
        />
      </template>
    </FullTable>
  </ToggleColumns>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import ToggleColumns from '@/components/common/ToggleColumns.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import HostsFilters from '@/components/hosts/hosts/HostsFilters.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import formatDate from '@/filters/formatDate.js'
import hostsHead from '@/views/hosts/hosts-head.json'
import hostsMoreInfo from '@/views/hosts/hosts-more-info.json'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import Loading from '@/components/common/Loading.vue'
import RefreshButton from '@/components/common/RefreshButton.vue'

export default {
  name: 'hosts-page',
  mixins: [localFiltersMixin, hostnameLinkRow, getHeadKeys, TooltipMixin],
  components: {
    ToggleColumns,
    FullTable,
    TdContent,
    TdIcon,
    TdArrayMore,
    ExportButton,
    HostsFilters,
    DynamicHeading,
    MoreInfoButtons,
    HostLink,
    Loading,
    RefreshButton,
  },
  data() {
    return {
      hostsHead: hostsHead,
      hostsMoreInfo: hostsMoreInfo,
      isMounted: false,
      firstLoad: true,
    }
  },
  async beforeMount() {
    await this.getHosts().then(() => {
      bus.$emit('data', this.getAllHosts)
      this.firstLoad = false
    })
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    ...mapActions(['getHosts']),
    getHostData() {
      this.getHosts()
    },
    formatDate(date) {
      return formatDate(date)
    },
  },
  computed: {
    ...mapGetters(['getAllHosts', 'loadingTableStatus']),
    ...mapState(['moreInfoToggle']),
  },
}
</script>

<style lang="scss"></style>
