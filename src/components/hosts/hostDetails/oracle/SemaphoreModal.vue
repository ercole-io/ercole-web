<template>
  <div class="modal-card" style="min-width: 750px">
    <Card cardTitle="Migrable to Postgre" contentSize="1" contentPadding="1rem">
      <b-tabs size="is-small" type="is-boxed" destroy-on-hide>
        <b-tab-item label="General">
          <SimpleTable :theadData="['Metric', 'Count']">
            <template slot="tbodyContent" v-if="metrics && metrics.length > 0">
              <tr v-for="(v, i) in metrics" :key="i">
                <TdContent :value="v.metric" />
                <TdContent :value="v.Count" />
              </tr>
            </template>
            <template slot="tbodyContent" v-else>
              <tr>
                <td colspan="2"><NoContent style="min-height: 100px" /></td>
              </tr>
            </template>
          </SimpleTable>
        </b-tab-item>

        <template v-if="Object.entries(other).length > 0">
          <b-tab-item
            v-for="(data, i) in Object.entries(other)"
            :label="data[0]"
            :key="i"
          >
            <SimpleTable :theadData="['Object Type', 'Count']">
              <template slot="tbodyContent">
                <tr v-for="(val, index) in data[1]" :key="index">
                  <TdContent :value="val.objectType" />
                  <TdContent :value="val.Count" />
                </tr>
              </template>
              <!-- <template slot="tbodyContent" v-else>
              <tr>
                <td colspan="2"><NoContent style="min-height: 100px" /></td>
              </tr>
            </template> -->
            </SimpleTable>
          </b-tab-item>
        </template>
      </b-tabs>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: ['metrics', 'other'],
  components: {
    Card,
    SimpleTable,
    TdContent,
    NoContent,
  },
}
</script>

<style lang="scss" scoped></style>
