<template>
  <article>
    <div class="columns mt-3" style="margin-right: -28px">
      <b-tabs
        size="is-small"
        type="is-toggle"
        destroy-on-hide
        vertical
        :animated="false"
        expanded
        class="vertical-tabs-scroll"
        v-model="selectedExadata"
        @input="requestSelectedExadata"
      >
        <b-tab-item
          v-for="data in showExadataList"
          :value="data['rackID']"
          :label="data['hostname']"
          :key="data['rackID']"
          style="margin-top: -20px"
          class="column is-12"
        >
          <GhostLoading
            :isLoading="loadingTableStatus"
            setHeight="600"
            class="column"
            v-if="loadingTableStatus"
          />
          <ExadataContent
            v-if="!loadingTableStatus"
            :data="showSelectedExadata(exadataSearchTherm)"
          />
        </b-tab-item>
      </b-tabs>
    </div>

    <NoContent
      class="column is-12"
      style="height: 370px; background-color: #eeeeee"
      v-if="showExadataList.length === 0 && !loadingTableStatus"
    />
  </article>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
// import ExportButton from '@/components/common/ExportButton.vue'
import ExadataContent from '@/components/exadata/exadatas/ExadataContent.vue'

export default {
  name: 'exadata-list-component',
  props: {
    exadataSearchTherm: {
      type: String,
      default: '',
    },
    exadataSelected: {
      type: String,
      default: '',
    },
  },
  components: {
    GhostLoading,
    NoContent,
    // ExportButton
    ExadataContent,
  },
  data() {
    return {
      selectedExadata: this.exadataSelected,
    }
  },
  methods: {
    ...mapActions(['getSelectedExadata']),
    requestSelectedExadata(e) {
      this.getSelectedExadata(e)
    },
  },
  computed: {
    ...mapGetters([
      'showExadataList',
      'showSelectedExadata',
      'loadingTableStatus',
    ]),
  },
}
</script>

<style lang="scss" scoped></style>
