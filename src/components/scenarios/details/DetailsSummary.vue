<template>
  <section class="pl-3 pr-3 pt-0 pb-5">
    <p class="has-text-weight-medium">Created Scenario Summary</p>
    <div v-if="isLoading">
      <GhostLoading :isLoading="isLoading" setHeight="166" />
    </div>
    <div v-if="!isLoading">
      <SimpleTable
        :theadData="['Hostnames', 'Original Core', 'Simulated Core']"
        customStyle="width: 30%"
      >
        <template slot="tbodyContent">
          <tr v-for="item in summaryData" :key="item.id">
            <TdContent :value="item.hostname" />
            <TdContent :value="item.originalCore" class="original-col" />
            <TdContent :value="item.simulatedCore" class="simulated-col" />
          </tr>
        </template>
      </SimpleTable>
    </div>
  </section>
</template>

<script>
import TdContent from '@/components/common/Table/TdContent.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  name: 'ScenarioDetailsSummary',
  props: {
    summaryData: {
      type: Array,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    TdContent,
    SimpleTable,
    GhostLoading,
  },
}
</script>

<style lang="scss" scoped></style>
