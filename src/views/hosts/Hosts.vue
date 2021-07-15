<template>
  <BaseLayoutColumns v-if="isMounted">
    <div slot="col1">
      <ButtonGroup :groupTitle="`${$t('common.general.moreInfo')}`">
        <b-button
          class="mr-1"
          size="is-small"
          :type="hideVirtual ? 'is-light' : 'is-light virtual'"
          @click="toggleMoreInfo('Virtual')"
        >
          {{ $t('common.fields.virtual') }}
        </b-button>
        <b-button
          class="mr-1"
          size="is-small"
          :type="hideCPU ? 'is-light' : 'is-light cpu'"
          @click="toggleMoreInfo('Cpu')"
        >
          {{ $t('common.fields.cpu') }}
        </b-button>
        <b-button
          class="mr-1"
          size="is-small"
          :type="hideAgent ? 'is-light' : 'is-light agent'"
          @click="toggleMoreInfo('Agent')"
        >
          {{ $t('common.fields.agent') }}
        </b-button>
      </ButtonGroup>
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
          :hideAgent="hideAgent"
          :hideCPU="hideCPU"
          :hideVirtual="hideVirtual"
        />

        <template slot="bodyData" slot-scope="rowData">
          <HostLink :hostname="rowData.scope.hostname" />
          <TdContent
            :value="rowData.scope.platform"
            :class="{ hide: hideVirtual }"
            class="border-left"
          />
          <TdContent
            :value="rowData.scope.cluster"
            :class="{ hide: hideVirtual }"
          />
          <TdContent
            :value="rowData.scope.virtNode"
            :class="{ hide: hideVirtual }"
            class="border-right"
          />
          <TdContent
            :value="rowData.scope.model"
            :class="{ hide: hideCPU }"
            class="border-left"
          />
          <TdContent
            :value="rowData.scope.threads"
            :class="{ hide: hideCPU }"
          />
          <TdContent :value="rowData.scope.cores" :class="{ hide: hideCPU }" />
          <TdContent
            :value="rowData.scope.socket"
            :class="{ hide: hideCPU }"
            class="border-right"
          />
          <TdContent
            :value="rowData.scope.version"
            :class="{ hide: hideAgent }"
            class="border-left"
          />
          <TdContent
            :value="rowData.scope.updated"
            dataType="date"
            :class="{ hide: hideAgent }"
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
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
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
import ButtonGroup from '@/components/common/ButtonGroup.vue'
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
    ButtonGroup
  },
  data() {
    return {
      toggle: true,
      isMounted: false,
      hostsHead: hostsHead
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
    ...mapMutations(['SET_VISIBLE_COLS']),
    toggleMoreInfo(name) {
      this.SET_VISIBLE_COLS({
        value: (this.toggle = !this.toggle),
        name: name
      })
    },
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
    },
    hideVirtual() {
      return this.moreInfoToggle.hiddenVirtual
    },
    hideCPU() {
      return this.moreInfoToggle.hiddenCpu
    },
    hideAgent() {
      return this.moreInfoToggle.hiddenAgent
    }
  }
}
</script>

<style lang="scss">
.no-margin-bottom {
  margin-bottom: 0 !important;
}

.hide {
  display: none;
}

.virtual {
  box-shadow: inset 0 -14px 0 -10px #f37021 !important;
}
.cpu {
  box-shadow: inset 0 -14px 0 -10px #fcd217 !important;
}
.agent {
  box-shadow: inset 0 -14px 0 -10px #9c4d1e !important;
}
</style>
