<template>
  <section class="licenses-section">
    <div class="wrap-table licenses">
      <v-table
        class="vTable-custom table-hover"
        :hideSortIcons="true"
        :data="filteredLicenses"
      >
        <!-- selectionMode="multiple"
        selectedClass="has-background-primary has-text-grey-lighter"
        @selectionChanged="selectedRows = $event" -->
        <thead slot="head">
          <tr class="has-background-grey-lighter">
            <v-th sortKey="name">Name</v-th>
            <v-th sortKey="count">Number</v-th>
            <v-th sortKey="tags">Tags</v-th>
          </tr>
        </thead>
        <tbody slot="body" slot-scope="{ displayData }">
          <v-tr v-for="row in displayData" :key="row.Name" :row="row">
            <td>{{ row.name }}</td>
            <td>{{ row.count }}</td>
            <td>{{ row.tags }}</td>
          </v-tr>
        </tbody>
      </v-table>
    </div>

    <!-- <ul class="selected-licenses" v-if="selectedRows.length > 0">
      <li>
        Selected Licenses:
      </li>
      <li v-for="selected in selectedRows" :key="selected.name">
        {{ selected.name }}
      </li>
    </ul>

    <b-button type="is-primary" size="is-small">
      Add ASFU Entreprise Edition License
    </b-button> -->
  </section>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    licenses: {
      type: Array,
      default: Array
    }
  },
  data() {
    return {
      selectedRows: [],
      filteredLicenses: []
    }
  },
  beforeMount() {
    _.filter(this.licenses, val => {
      if (val.count !== 0) {
        this.filteredLicenses.push(val)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.licenses-section {
  display: flex;
  flex-direction: column;
}

.wrap-table {
  &.licenses {
    max-height: 280px;
    margin-bottom: 20px;
  }
}

.selected-licenses {
  padding: 10px;

  li:first-child {
    font-weight: 600;
    font-size: 0.9em;
    box-shadow: 0 0.08em 0 lightslategrey;
  }

  li:not(:first-child) {
    font-size: 0.7em;
    list-style: inside square;
  }
}
</style>
