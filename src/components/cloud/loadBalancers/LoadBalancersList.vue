<template>
  <FullTable
    placeholder="Cloud Recommendations"
    :keys="getHeadKeys(loadBalancersHead)"
    :tableData="getLoadBalancers"
  >
    <template slot="customTopHeader">
      <b-notification
        v-if="getLoadBalancers.length <= 0"
        type="is-warning is-light"
        aria-close-label="Close notification"
        role="alert"
      >
        {{ $t('views.cloud.noActiveProfile') }}
      </b-notification>

      <b-notification
        v-if="getOciActiveProfileError"
        type="is-warning is-light"
        aria-close-label="Close notification"
        role="alert"
        style="margin: 0 auto"
      >
        {{ getErrActiveProfile }}
      </b-notification>
    </template>

    <DynamicHeading
      slot="headData"
      v-for="head in loadBalancersHead"
      :key="head.sort"
      :data="head"
    />

    <template slot="bodyData" slot-scope="rowData">
      <TdContent :value="rowData.scope.name" />
      <TdContent :value="rowData.scope.type" />
      <TdContent :value="rowData.scope.compartmentID" />
      <TdContent :value="rowData.scope.resourceID" />
    </template>

    <ExportButton slot="export" url="" expName="cloudRecommendations" />
  </FullTable>
</template>

<script>
import { mapGetters } from 'vuex'
import getHeadKeys from '@/mixins/dynamicHeadingMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'
import DynamicHeading from '@/components/common/Table/DynamicHeading.vue'
import loadBalancersHead from '@/components/cloud/loadBalancers/loadBalancersHead.json'

export default {
  mixins: [getHeadKeys],
  components: {
    FullTable,
    TdContent,
    ExportButton,
    DynamicHeading,
  },
  data() {
    return {
      loadBalancersHead: loadBalancersHead,
    }
  },
  computed: {
    ...mapGetters(['getLoadBalancers', 'getOciActiveProfileError']),
    getErrActiveProfile() {
      const number = Number(this.getOciActiveProfileError) > 1 ? 2 : 1

      if (number > 1) {
        return this.$i18n.t('views.cloud.moreErrActiveProfile', {
          n: this.getOciActiveProfileError,
        })
      } else {
        return this.$i18n.t('views.cloud.oneErrActiveProfile', {
          n: this.getOciActiveProfileError,
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
