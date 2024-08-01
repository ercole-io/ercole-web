<template>
  <div class="modal-card">
    <Card cardTitle="Memory Info" contentSize="1" contentPadding="1rem">
      <b-icon
        class="policy-audit-icon"
        pack="fas"
        icon="circle"
        size="is-small"
        :type="color"
      >
      </b-icon>
      <SimpleTable
        :theadData="[
          'Sum of DB Instances Memory on Host',
          'Percentage Against Host Memory',
        ]"
      >
        <template slot="tbodyContent">
          <tr>
            <TdContent :value="data.params.sum" />
            <TdContent :value="`${data.params.perc} %`" />
          </tr>
        </template>
      </SimpleTable>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
// import NoContent from '@/components/common/NoContent.vue'

export default {
  props: ['data', 'color'],
  components: {
    Card,
    SimpleTable,
    TdContent,
    // NoContent,
  },
}
</script>

<style lang="scss" scoped>
.policy-audit-icon {
  position: absolute;
  top: 10px;
  right: 18px;
}
</style>
