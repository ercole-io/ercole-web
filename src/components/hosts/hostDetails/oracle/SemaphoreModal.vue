<template>
  <b-modal
    :active.sync="activeModal"
    :width="750"
    scroll="keep"
    custom-class="isModal"
  >
    <Card cardTitle="Migrable to Postgre" contentSize="1" contentPadding="1rem">
      <b-tabs size="is-small" type="is-boxed" destroy-on-hide>
        <b-tab-item label="Migrability">
          <SimpleTable :theadData="['Metric', 'Count']">
            <template
              slot="tbodyContent"
              v-if="getSemaphoreData.metrics.length > 0"
            >
              <tr v-for="(v, i) in getSemaphoreData.metrics" :key="i">
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

        <b-tab-item
          v-for="(data, i) in getSemaphoreData.other"
          :label="data.schema"
          :key="i"
        >
          <SimpleTable :theadData="['Object Type', 'Count']">
            <template slot="tbodyContent">
              <tr>
                <TdContent :value="data.objectType" />
                <TdContent :value="data.Count" />
              </tr>
            </template>
            <!-- <template slot="tbodyContent" v-else>
              <tr>
                <td colspan="2"><NoContent style="min-height: 100px" /></td>
              </tr>
            </template> -->
          </SimpleTable>
        </b-tab-item>
      </b-tabs>
    </Card>
  </b-modal>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapState } from 'vuex'
import Card from '@/components/common/Card.vue'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  components: {
    Card,
    SimpleTable,
    TdContent,
    NoContent,
  },
  data() {
    return {
      activeModal: false,
    }
  },
  beforeMount() {
    bus.$on('semaphoreModal', (val) => {
      this.activeModal = val
    })
  },
  computed: {
    ...mapState(['hostDetails']),
    getSemaphoreData() {
      return this.hostDetails.semaphoreData
    },
  },
}
</script>

<style lang="scss" scoped></style>
