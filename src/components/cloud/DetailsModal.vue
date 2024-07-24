<template>
  <div class="modal-card" style="width: 900px">
    <header class="modal-card-head">
      <p class="modal-card-title">Details: {{ modalTitle }}</p>
    </header>
    <section class="modal-card-body">
      <SimpleTable :theadData="['Name', 'Value']">
        <template slot="tbodyContent" v-if="returnDetails.length > 0">
          <tr v-for="(detail, index) in returnDetails" :key="index">
            <TdContent :value="detail.name" />
            <TdContent :value="detail.value" />
          </tr>
        </template>
        <template slot="tbodyContent" v-else>
          <tr>
            <td colspan="2"><NoContent style="min-height: 100px" /></td>
          </tr>
        </template>
      </SimpleTable>
    </section>
    <footer class="modal-card-foot"></footer>
  </div>
</template>

<script>
import _ from 'lodash'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import SimpleTable from '@/components/common/Table/SimpleTable.vue'
import TdContent from '@/components/common/Table/TdContent.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  name: 'cloud-detailsmodal-component',
  mixins: [TooltipMixin],
  components: {
    SimpleTable,
    TdContent,
    NoContent,
  },
  props: {
    modalTitle: {
      type: String,
      required: true,
    },
    details: {
      required: true,
    },
  },
  computed: {
    returnDetails() {
      const details = []
      _.map(this.details, (dt) => {
        details.push({
          name: dt.name,
          value: dt.value,
        })
      })
      return details
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
