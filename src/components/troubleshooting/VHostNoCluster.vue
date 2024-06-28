<template>
  <div style="min-height: 630px">
    <SimpleTable
      :theadData="['Hostname', 'Hardware Abstraction Technology']"
      v-if="data.length > 0"
    >
      <tr v-for="item in data" :key="item._id" slot="tbodyContent">
        <HostLink :hostname="item.hostname" class="first-col" />
        <TdContent :value="item.hardwareAbstractionTechnology" />
      </tr>
    </SimpleTable>

    <NoContent
      noContentText="There are no Virtual Hosts with No CLuster to show"
      noContentHeight="630px"
      v-if="!data.length > 0"
    />
  </div>
</template>

<script>
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import HostLink from '@/components/common/Table/HostLink.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SimpleTable,
    TdContent,
    HostLink,
    NoContent,
  },
}
</script>

<style lang="scss">
.nocluster {
  line-height: 1.25;
  background-color: #ededed;
  font-weight: 700;
  padding: 12px 16px;
  border-radius: 0.25rem;
  box-shadow: 0 0.125em 0.25em rgba(10, 10, 10, 0.3);
  font-size: 1rem;
}
.collapsible-nocluster-header {
  color: #db1e1e;
}
</style>
