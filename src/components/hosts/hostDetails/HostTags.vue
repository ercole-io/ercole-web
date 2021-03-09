<template>
  <boxContent>
    <Tags
      title="Host Tags:"
      inputWidth="150"
      :tagsList="['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4']"
      @addTag="handleAddTag"
      @removeTag="handleRemoveTag"
      @editTag="handleEditTag"
    />
  </boxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'
import Tags from '@/components/common/Tags.vue'

export default {
  components: {
    BoxContent,
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
