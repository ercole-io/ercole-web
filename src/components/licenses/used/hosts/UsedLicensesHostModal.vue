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
          Hostname:
          <span class="has-text-weight-medium">{{ licenseInfo.hostname }}</span>
        </span>
        <br />
        <span class="is-size-7">
          License ID:
          <span class="has-text-weight-medium"
            >{{ licenseInfo.licenseId }} - {{ licenseInfo.description }} -
            {{ licenseInfo.metric }}</span
          >
        </span>
      </p>
    </header>
    <section class="modal-card-body">
      <FullTable
        :placeholder="placeholder"
        :keys="keys"
        :tableData="databases"
        :clickedRow="() => []"
      >
        <template slot="headData">
          <v-th sortKey="dbName" style="width: 100%">Database Name</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.dbName" />
        </template>
      </FullTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import i18n from '@/i18n.js'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent
  },
  props: {
    databases: {
      type: [Array, Object],
      required: true
    },
    licenseInfo: {}
  },
  data() {
    return {
      keys: ['dbName'],
      isLoading: false
    }
  },
  computed: {
    modalTitle() {
      return i18n.t('views.licenses.dbList')
    },
    placeholder() {
      return i18n.t('menu.databases')
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
