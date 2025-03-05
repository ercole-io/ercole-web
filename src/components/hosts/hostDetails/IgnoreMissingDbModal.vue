<template>
  <div class="modal-card" style="width: auto">
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
      {{ data }}
      <!-- <FullTable
        placeholder="Search"
        :keys="[]"
        :tableData="data"
        :clickedRow="() => []"
        :isLoadingTable="false"
      >
        <template slot="headData">
          <v-th sortKey="hostname">{{ headData[0] }}</v-th>
          <v-th sortKey="consumedLicensesCount">{{ headData[1] }}</v-th>
        </template>

        <template slot="bodyData" slot-scope="rowData">
          <HostLink
            :hostname="rowData.scope.hostname"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <TdContent
            :value="rowData.scope.consumedLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <TdContent
            :value="rowData.scope.coveredLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <TdContent
            :value="rowData.scope.totalCoveredLicensesCount"
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          />
          <td
            :class="{
              'has-background-danger-light':
                rowData.scope.totalCoveredLicensesCount <
                rowData.scope.consumedLicensesCount,
            }"
          >
            <b-icon
              v-tooltip="options(delButton)"
              type="is-danger"
              class="delete-icon"
              pack="fas"
              icon="trash-alt"
              @click.native="deleteHostAssociated(rowData.scope.hostname)"
            />
          </td>
        </template>
      </FullTable> -->
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
export default {
  name: 'host-details-oracle-ignoe-missing-dbs-modal',
  props: {
    data: {
      type: Array,
      default: [],
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
