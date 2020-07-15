<template>
  <section>
    <PageTitle />

    <BoxContent>
      <TopTable>
        <b-field
          class="search"
          custom-class="is-small"
          label="Search on Alerts"
          horizontal
        >
          <b-input size="is-small" v-model="filters.search.value" />
        </b-field>

        <SelectPerPage :totalItem="totalItems" />
      </TopTable>

      <div class="table-container">
        <v-table
          :data="total"
          :filters="filters"
          :hideSortIcons="true"
          :currentPage.sync="currentPage"
          :pageSize="perPage"
          @totalPagesChanged="totalPages = $event"
          class="vTable-custom table-alerts"
        >
          <thead slot="head">
            <tr class="has-background-grey-light">
              <th style="width: 5%"></th>
              <v-th style="width: 10%" sortKey="AlertCategory">Type</v-th>
              <v-th style="width: 10%" sortKey="Date">Date</v-th>
              <v-th style="width: 5%" sortKey="AlertSeverity">Severity</v-th>
              <v-th style="width: 20%" sortKey="OtherInfo.Hostname"
                >Hostname</v-th
              >
              <v-th style="width: 10%" sortKey="AlertCode">Code</v-th>
              <v-th style="width: 40%" sortKey="Description">Description</v-th>
            </tr>
          </thead>
          <tbody slot="body" slot-scope="{ displayData }">
            <v-tr v-for="row in displayData" :key="row._id" :row="row">
              <td>
                <b-icon
                  @click.native="
                    handleMarkAsRead(
                      row._id,
                      row.alertCategory,
                      row.alertSeverity
                    )
                  "
                  pack="fas"
                  type="is-danger"
                  icon="trash-alt"
                  style="cursor: pointer"
                />
              </td>
              <td>{{ row.alertCategory }}</td>
              <td>{{ row.date }}</td>
              <td>
                <b-icon
                  pack="fas"
                  :type="setIcon(row.alertSeverity).iconType"
                  :icon="setIcon(row.alertSeverity).icon"
                />
              </td>
              <td>{{ row.otherInfo.hostname }}</td>
              <td>{{ row.alertCode }}</td>
              <td>{{ row.description }}</td>
            </v-tr>
          </tbody>
        </v-table>
      </div>

      <BottomTable>
        <template slot="info">
          Showing {{ perPage }} hosts from {{ totalItems }}
        </template>
        <template>
          <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
            :maxPageLinks="maxPageLinks"
          />

          <div class="buttons">
            <b-button type="is-primary" size="is-small">
              Alerts List File
            </b-button>
          </div>
        </template>
      </BottomTable>
    </BoxContent>
  </section>
</template>

<script>
import paginationMixin from '@/mixins/paginationMixin.js'
import { mapGetters, mapActions } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import PageTitle from '@/components/common/PageTitle.vue'
import BoxContent from '@/components/common/BoxContent.vue'
import SelectPerPage from '@/components/common/SelectPerPage.vue'
import TopTable from '@/components/common/TopTable.vue'
import BottomTable from '@/components/common/BottomTable.vue'

export default {
  mixins: [paginationMixin],
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
    BoxContent,
    SelectPerPage,
    TopTable,
    BottomTable
  },
  data() {
    return {
      filters: {
        search: {
          value: '',
          keys: [
            'AlertCategory',
            'AlertSeverity',
            'Date',
            'OtherInfo.Hostname',
            'AlertCode',
            'Description'
          ]
        }
      }
    }
  },
  async beforeMount() {
    if (!this.type && !this.flag) {
      await this.showAllAlerts()
    } else if (this.flag === 'AGENT') {
      this.total = this.getFilteredAgents(this.type, this.flag)
    } else {
      this.total = this.getFilteredAlerts(this.type, this.flag)
    }
  },
  methods: {
    ...mapActions(['getAlertsData', 'markAsRead']),
    showAllAlerts() {
      this.getAlertsData()
      this.total = this.getAllAlerts
    },
    setIcon(severity) {
      return checkAlertIcon(severity)
    },
    handleMarkAsRead(id, flag, type) {
      this.markAsRead({ id, flag, type })
      this.total = this.getAllAlerts
    }
  },
  computed: {
    ...mapGetters(['getAllAlerts', 'getFilteredAlerts', 'getFilteredAgents'])
  }
}
</script>

<style lang="scss">
.search {
  margin-bottom: 0;

  .field-label {
    .label {
      min-width: 100px;
    }
  }
}

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
      cursor: default !important;

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
