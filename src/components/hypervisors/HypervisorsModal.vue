<template>
  <div class="modal-card" style="width: 400px">
    <b-loading
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <header class="modal-card-head">
      <p class="modal-card-title">
        {{ modalInfo.title }} List
        <br />
        <span class="is-size-7">
          Cluster Name:
          <span class="has-text-weight-medium">{{ modalInfo.name }}</span>
        </span>
      </p>
    </header>
    <section class="modal-card-body">
      <FullTable
        :keys="['item']"
        :tableData="returnData"
        :clickedRow="() => []"
        :isLoadingTable="false"
        hideSearch
      >
        <template slot="headData">
          <v-th sortKey="item" style="width: 100%">{{ modalInfo.title }}</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope.item" />
        </template>
      </FullTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import _ from 'lodash'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  mixins: [TooltipMixin],
  components: {
    FullTable,
    TdContent,
  },
  props: {
    modalData: {
      type: [Array, Object],
      required: true,
    },
    modalInfo: {},
  },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    returnData() {
      const data = []
      _.map(this.modalData, (val) => {
        data.push({
          item: val,
        })
      })
      return data
    },
  },
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
