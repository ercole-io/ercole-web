<template>
  <div class="modal-card" style="width: 900px">
    <header class="modal-card-head">
      <template v-if="modalHeader.resourceType === 'Compute Instance'">
        <p class="modal-card-title">
          Project:
          <span class="has-text-weight-bold">
            {{ modalHeader.projectName || '-' }}
          </span>
        </p>
        <p class="is-size-6">
          Resource Type:
          <span class="has-text-weight-semibold">
            {{ modalHeader.resourceType || '-' }}
          </span>
        </p>
        <p class="is-size-6 ml-5">
          Resource Name:
          <span class="has-text-weight-semibold">
            {{ modalHeader.resourceName || '-' }}
          </span>
        </p>
      </template>
      <template v-if="modalHeader.resourceType === 'Disk'">
        <p class="modal-card-title">
          Project:
          <span class="has-text-weight-bold">
            {{ modalHeader.projectName || '-' }}
          </span>
        </p>
        <p class="is-size-6">
          Storage type:
          <span class="has-text-weight-semibold">
            {{ modalHeader.storageType || '-' }}
          </span>
        </p>
        <p class="is-size-6 ml-5">
          Resource Name:
          <span class="has-text-weight-semibold">
            {{ modalHeader.resourceName || '-' }}
          </span>
        </p>
        <p class="is-size-6 ml-5">
          Size CB:
          <span class="has-text-weight-semibold">
            {{ modalHeader.sizeGB || '-' }}
          </span>
        </p>
      </template>
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
  name: 'cloud-google-details-modal-component',
  mixins: [TooltipMixin],
  components: {
    SimpleTable,
    TdContent,
    NoContent,
  },
  props: {
    modalHeader: {
      type: Object,
      required: true,
    },
    details: {
      type: [Array, Object],
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
