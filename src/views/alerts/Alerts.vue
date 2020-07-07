<template>
  <section>
    <PageTitle />

    <BoxContent>
      <div class="top-table">
        <b-button
          size="is-small"
          @click="showAllAlerts"
          v-if="this.type && this.flag"
        >
          Show All Alerts
        </b-button>
      </div>

      <div class="table-container">
        <v-table :data="allAlerts" class="vTable-custom table-alerts">
          <thead slot="head">
            <tr class="has-background-grey-light">
              <th>Type</th>
              <th>Date</th>
              <th>Severity</th>
              <th style="width: 200px">Hostname</th>
              <th>Code</th>
              <th style="width: 450px">Description</th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="{ displayData }">
            <v-tr v-for="row in displayData" :key="row._id" :row="row">
              <td>{{ row.AlertCategory }}</td>
              <td>{{ row.Date | formatDate }}</td>
              <td>{{ row.AlertSeverity }}</td>
              <td>{{ row.Hostname }}</td>
              <td>{{ row.AlertCode }}</td>
              <td>{{ row.Description }}</td>
            </v-tr>
          </tbody>
        </v-table>
      </div>
    </BoxContent>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    flag: {
      type: String,
      default: null
    }
  },
  components: {
    PageTitle,
    BoxContent
  },
  data() {
    return {
      allAlerts: null
    }
  },
  async beforeMount() {
    if (!this.type && !this.flag) {
      await this.showAllAlerts()
    } else if (this.flag === 'AGENT') {
      this.allAlerts = this.getFilteredAgents(this.type, this.flag)
    } else {
      this.allAlerts = this.getFilteredAlerts(this.type, this.flag)
    }
  },
  methods: {
    ...mapActions(['getAlertsData']),
    showAllAlerts() {
      this.getAlertsData()
      this.allAlerts = this.getAllAlerts
    }
  },
  computed: {
    ...mapGetters(['getAllAlerts', 'getFilteredAlerts', 'getFilteredAgents'])
  }
}
</script>

<style lang="scss">
.table-alerts {
  thead {
    tr {
      th {
        &:first-child {
          text-align: center !important;
        }
        &:last-child {
          text-align: left !important;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        &:first-child {
          text-align: center;
        }
        &:last-child {
          text-align: left;
        }
      }
    }
  }
}
</style>
