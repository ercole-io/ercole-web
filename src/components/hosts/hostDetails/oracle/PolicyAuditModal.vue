<template>
  <div class="modal-card">
    <Card cardTitle="Policy Audit" contentSize="1" contentPadding="1rem">
      <b-icon
        class="policy-audit-icon"
        pack="fas"
        icon="circle"
        size="is-small"
        :type="color"
        v-if="params && params.length > 0"
      >
      </b-icon>
      <SimpleTable :theadData="['Params']">
        <template slot="tbodyContent" v-if="params && params.length > 0">
          <tr v-for="(p, i) in params" :key="i">
            <TdContent :value="p" />
          </tr>
        </template>
        <template slot="tbodyContent" v-else>
          <tr>
            <td colspan="2">
              <NoContent
                noContentText="Policy Audit N/A"
                style="min-height: 100px"
              />
            </td>
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
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: ['params', 'color'],
  components: {
    Card,
    SimpleTable,
    TdContent,
    NoContent,
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
