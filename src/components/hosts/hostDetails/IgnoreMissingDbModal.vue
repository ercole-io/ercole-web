<template>
  <div class="modal-card" style="width: 400px">
    <!-- <b-loading
      :is-full-page="false"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading> -->
    <header class="modal-card-head">
      <p class="modal-card-title">
        Ignore Missing Databases <br />
        <!-- <span class="is-size-7">{{ agreeNumberText }} {{ agreeNumber }}</span> -->
      </p>
    </header>
    <section class="modal-card-body">
      <FullTable
        placeholder="Search"
        :keys="[]"
        :tableData="data"
        :clickedRow="() => []"
        :isLoadingTable="false"
      >
        <template slot="headData">
          <v-th sortKey="">Database Name</v-th>
          <v-th sortKey="">Actions</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <TdContent :value="rowData.scope" />
          <td>
            <b-icon type="is-info" class="delete-icon" pack="fas" icon="eye" />
          </td>
        </template>
      </FullTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import FullTable from '@/components/common/Table/FullTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'

export default {
  name: 'host-details-oracle-ignoe-missing-dbs-modal',
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
  components: {
    FullTable,
    TdContent,
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
