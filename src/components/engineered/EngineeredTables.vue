<template>
  <article>
    <div
      class="is-flex is-justify-content-flex-end"
      v-if="getEngSys.length > 0"
    >
      <ExportButton
        url="hosts/technologies/oracle/exadata"
        expName="engSystems"
      />
    </div>
    <div class="columns" style="flex-flow: wrap">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="395"
        class="column is-6"
        v-if="loadingTableStatus"
      />
      <GhostLoading
        :isLoading="loadingTableStatus"
        setHeight="395"
        v-if="loadingTableStatus"
        class="column is-6"
      />
      <BoxContent
        :title="data.hostname"
        border
        v-for="data in getEngSys"
        :key="data.hostname"
        class="column is-6"
      >
        <ExadataTable :data="data" />
      </BoxContent>

      <NoContent
        class="column is-12"
        style="height: 370px; background-color: #eeeeee"
        v-if="getEngSys.length === 0 && !loadingTableStatus"
      />
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import ExadataTable from '@/components/engineered/ExadataTable.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import NoContent from '@/components/common/NoContent.vue'
import ExportButton from '@/components/common/ExportButton.vue'

export default {
  name: 'engineered-tables-component',
  components: {
    BoxContent,
    ExadataTable,
    GhostLoading,
    NoContent,
    ExportButton,
  },
  computed: {
    ...mapGetters(['getEngSys', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped></style>
