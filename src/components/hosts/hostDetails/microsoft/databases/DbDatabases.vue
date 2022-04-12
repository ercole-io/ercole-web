<template>
  <b-tab-item label="Databases" v-if="databases.length > 0">
    <b-tabs size="is-small" type="is-boxed" animated destroy-on-hide>
      <template v-for="(db, i) in databases">
        <b-tab-item :key="i" :label="db.name">
          <b-tabs
            size="is-small"
            type="is-toggle"
            position="is-centered"
            vertical
            animated
            destroy-on-hide
            class="mt-3"
          >
            <b-tab-item label="Info">
              <Info :info="db" />
            </b-tab-item>
            <b-tab-item label="File Groups">
              <FileGroups :fileGroups="db.tablespaces" />
            </b-tab-item>
            <b-tab-item label="Objects Size">
              <ObjectsSize :objectsSize="db.schemas" />
            </b-tab-item>
          </b-tabs>
        </b-tab-item>
      </template>
    </b-tabs>
  </b-tab-item>
</template>

<script>
import Info from '@/components/hosts/hostDetails/microsoft/databases/dbs/Info.vue'
import FileGroups from '@/components/hosts/hostDetails/microsoft/databases/dbs/FileGroups.vue'
import ObjectsSize from '@/components/hosts/hostDetails/microsoft/databases/dbs/ObjectsSize.vue'

export default {
  components: {
    Info,
    FileGroups,
    ObjectsSize,
  },
  props: {
    databases: {
      type: Array,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped></style>
