<template>
  <div class="modal-card" style="width: 900px">
    <header
      class="modal-card-head is-flex is-flex-direction-column is-align-items-flex-start"
    >
      <template v-if="modalHeader.resourceType === 'Compute Instance'">
        <div
          class="custom-modal-card-title is-flex is-flex-direction-column is-justify-content-space-between"
        >
          <p class="has-text-weight-bold">
            Project:
            <span class="has-text-weight-light">
              {{ modalHeader.projectName || '-' }}
            </span>
          </p>
          <p class="has-text-weight-bold">
            Resource Type:
            <span class="has-text-weight-light">
              {{ modalHeader.resourceType || '-' }}
            </span>
          </p>
          <p class="has-text-weight-bold">
            Resource Name:
            <span class="has-text-weight-light">
              {{ modalHeader.resourceName || '-' }}
            </span>
          </p>
        </div>
      </template>
      <template v-if="modalHeader.resourceType === 'Disk'">
        <div
          class="custom-modal-card-title is-flex is-flex-direction-column is-justify-content-space-between"
        >
          <p class="has-text-weight-bold">
            Project:
            <span class="has-text-weight-light">
              {{ modalHeader.projectName || '-' }}
            </span>
          </p>
          <p class="has-text-weight-bold">
            Resource Type:
            <span class="has-text-weight-light">
              {{ modalHeader.resourceType || '-' }}
            </span>
          </p>
          <p class="has-text-weight-bold">
            Storage type:
            <span class="has-text-weight-light">
              {{ modalHeader.storageType || '-' }}
            </span>
          </p>
          <p class="has-text-weight-bold">
            Resource Name:
            <span class="has-text-weight-light">
              {{ modalHeader.resourceName || '-' }}
            </span>
          </p>
          <p class="has-text-weight-bold">
            Size GB:
            <span class="has-text-weight-light">
              {{ modalHeader.sizeGB || '-' }}
            </span>
          </p>
        </div>
      </template>
    </header>
    <section class="modal-card-body">
      <SimpleTable :theadData="['Name', 'Value']">
        <template slot="tbodyContent" v-if="returnDetails.length > 0">
          <tr v-for="(detail, index) in returnDetails" :key="index">
            <template v-if="modalHeader.resourceType === 'Compute Instance'">
              <TdContent :value="detail.name" width="20" />
              <TdContent :value="detail.value" width="80" />
            </template>
            <template v-if="modalHeader.resourceType === 'Disk'">
              <TdContent :value="detail.name" width="80" />
              <!-- <TdContent :value="detail.value" width="20" /> -->
              <td width="20">
                <ProgressBar
                  progressFormat="raw"
                  :progressValue="detail.val"
                  :progressMaxValue="detail.max"
                  progressType="is-primary"
                  :progressTooltip="detail.value"
                >
                  {{ detail.value }}
                </ProgressBar>
              </td>
            </template>
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
import ProgressBar from '@/components/common/charts/ProgressBar.vue'

export default {
  name: 'cloud-google-details-modal-component',
  mixins: [TooltipMixin],
  components: {
    SimpleTable,
    TdContent,
    NoContent,
    ProgressBar,
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
      let details = []

      _.map(this.details, (dt) => {
        details.push({
          name: dt.name,
          value: dt.value,
        })
      })

      if (this.modalHeader.resourceType === 'Disk') {
        details = _.map(details, (dt) => {
          return {
            ...dt,
            val: Number(dt.value.split('/')[0]),
            max: Number(dt.value.split('/')[1]),
          }
        })
      }

      return details
    },
  },
}
</script>

<style lang="scss" scoped>
.custom-modal-card-title {
  font-size: 0.9rem;
  line-height: 22px;
}

.modal-card-body {
  font-size: 1rem;
  cursor: default;
}
</style>
, { template }, { template }import { template } from 'lodash' import { Template
} from 'ejs'
