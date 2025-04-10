<template>
  <div class="modal-card animation-content">
    <header
      class="modal-card-head is-flex is-flex-direction-column is-align-items-flex-start"
      style="font-weight: 600"
    >
      <p class="modal-card-title">Clone Host for DR</p>
      <small>
        Select the Veritas Cluster Nodes you want to clone for Disaster
        Recovery.
      </small>
      <span class="is-size-6 has-text-weight-medium">
        Selected Veritas Cluster Nodes:
        <span class="has-text-weight-bold">
          {{ selectedClusters.length }}
        </span>
      </span>
    </header>
    <section class="modal-card-body">
      <b-table
        :data="clusterData"
        :columns="columns"
        :checked-rows.sync="selectedClusters"
        checkable
        :checkbox-position="checkboxPosition"
        :checkbox-type="checkboxType"
        paginated
        pagination-size="is-small"
        pagination-order="is-centered"
        per-page="5"
      />
    </section>
    <footer class="modal-card-foot" style="justify-content: flex-end">
      <b-button label="Close" @click="$emit('close')" />
      <b-button
        label="Next"
        type="is-info"
        @click="saveChosenClusterVeritasNodes"
      />
    </footer>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapMutations } from 'vuex'

export default {
  props: {
    action: {
      type: Function,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkboxPosition: 'left',
      checkboxType: 'is-primary',
      selectedClusters: [],
      columns: [
        {
          field: 'name',
          label: 'Cluster Veritas Name',
          centered: true,
        },
      ],
    }
  },
  methods: {
    ...mapMutations(['SET_SELECTED_VERITAS_CLUSTERS']),
    saveChosenClusterVeritasNodes() {
      this.$store.commit('SET_SELECTED_VERITAS_CLUSTERS', this.selectedClusters)
      this.$emit('close')
      this.action()
    },
  },
  computed: {
    clusterData() {
      return _.map(this.data, (name) => ({ name }))
    },
  },
}
</script>

<style lang="scss" scoped>
.modal-card-head small {
  color: #7a7a7a;
  margin-top: 4px;
  font-size: 0.85rem;
}
</style>
