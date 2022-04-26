<template>
  <b-tab-item label="Tags">
    <Tags
      :title="`Tags for ${dbName}`"
      inputWidth="150"
      :tagsList="tags"
      direction="vertical"
      @addTag="handleAddTag"
      @removeTag="handleRemoveTag"
      @editTag="handleEditTag"
    />
  </b-tab-item>
</template>

<script>
import Tags from '@/components/common/Tags.vue'

export default {
  props: {
    dbName: {
      type: String
    },
    tags: {
      type: Array,
      default: null
    }
  },
  components: {
    Tags
  },
  methods: {
    handleAddTag(value) {
      console.log('make api call to add tag', value)
    },
    handleRemoveTag(value) {
      console.log('make api call to remove tag', value)
    },
    handleEditTag(value) {
      console.log('make api call to edit tag', value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
