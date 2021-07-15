<template>
  <BaseLayoutColumns v-if="isMounted">
    <div slot="col1">
      <MoreInfoButtons :buttonItems="moreInfoButtons" />
      <HostsFilters />
    </div>
    <BoxContent slot="col2" :mbottom="false">
      <FullTable
        :placeholder="$t('menu.hosts')"
        :keys="getKeys"
        :tableData="getAllHosts"
        @clickedRow="handleClickedRow"
        isClickable
      >
        <HostsHead
          slot="headData"
          v-for="head in hostsHead"
          :key="head.sort"
          :data="head"
          :hideAgent="moreInfoToggle.hiddenAgent"
          :hideCPU="moreInfoToggle.hiddenCpu"
          :hideVirtual="moreInfoToggle.hiddenVirtual"
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
          <exportButton url="hosts" expName="hosts-data" />
          <exportButton
            url="hosts"
            expName="hosts-lms-data"
            :text="`${$t('common.general.exportLms')}`"
            type="LMS"
          />
        </template>
      </FullTable>
    </BoxContent>
  </BaseLayoutColumns>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions, mapState } from 'vuex'
import localFiltersMixin from '@/mixins/localFiltersMixin.js'
import hostnameLinkRow from '@/mixins/hostnameLinkRow.js'
import BaseLayoutColumns from '@/components/common/BaseLayoutColumns.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import TdIcon from '@/components/common/Table/TDIcon.vue'
import TdArrayMore from '@/components/common/Table/TdArrayMore.vue'
import exportButton from '@/components/common/exportButton.vue'
import HostsFilters from '@/components/hosts/hosts/HostsFilters.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import HostsHead from '@/components/hosts/hosts/HostsHead.vue'
import MoreInfoButtons from '@/components/common/MoreInfoButtons.vue'
import formatDate from '@/filters/formatDate.js'
import hostsHead from '@/views/hosts/hosts-config.json'

export default {
  mixins: [localFiltersMixin, hostnameLinkRow],
  components: {
    BaseLayoutColumns,
    BoxContent,
    FullTable,
    TdContent,
    TdIcon,
    TdArrayMore,
    exportButton,
    HostsFilters,
    HostLink,
    HostsHead,
    MoreInfoButtons
  },
  data() {
    return {
      isMounted: false,
      hostsHead: hostsHead,
      moreInfoButtons: [
        {
          name: 'Virtual',
          text: this.$i18n.t('common.fields.virtual')
        },
        {
          name: 'Cpu',
          text: this.$i18n.t('common.fields.cpu')
        },
        {
          name: 'Agent',
          text: this.$i18n.t('common.fields.agent')
        }
      ]
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
    ...mapState(['moreInfoToggle']),
    getKeys() {
      const keys = []
      _.map(this.hostsHead, val => {
        keys.push(val.sort)
      })
      return keys
    }
  }
}
</script>

<style lang="scss"></style>
