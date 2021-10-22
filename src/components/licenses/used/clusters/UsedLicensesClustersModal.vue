<template>
  <div class="modal-card" style="width: 500px;">
    <b-loading
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ modalTitle }}
        <br />
        <span class="is-size-7">
          Cluster:
          <span class="has-text-weight-medium">{{ licenseInfo.cluster }}</span>
        </span>
        <br />
        <span class="is-size-7">
          License ID:
          <span class="has-text-weight-medium">
            {{ licenseInfo.fullPartNumber }}
          </span>
        </span>
      </p>
    </header>
    <section class="modal-card-body">
      <FullTable
        :placeholder="placeholder"
        :keys="['hostname']"
        :tableData="returnHosts"
        :clickedRow="() => []"
      >
        <template slot="headData">
          <v-th sortKey="hostname" style="width: 100%">Hostname</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.hostname" />
        </template>
      </FullTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import _ from 'lodash'
import i18n from '@/i18n.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent
  },
  props: {
    hosts: {
      type: [Array, Object],
      required: true
    },
    licenseInfo: {}
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    returnHosts() {
      const hostnames = []
      _.map(this.hosts, host => {
        hostnames.push({
          hostname: host
        })
      })
      return hostnames
    },
    modalTitle() {
      return i18n.t('views.licenses.hostsList')
    },
    placeholder() {
      return i18n.t('menu.hosts')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card-title {
  font-size: 1.2rem;
}

.modal-card-body {
  font-size: 1rem;
  cursor: default;
}
</style>
