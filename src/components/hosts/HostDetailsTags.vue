<template>
  <div class="is-inline-flex">
    <span class="add-tag-title">Host Tags:</span>
    <b-field class="add-tag-input">
      <b-input placeholder="Add tag" size="is-small" v-model="newTag"></b-input>
      <p class="control">
        <b-button @click="addTag" class="button is-primary" size="is-small">
          Add
        </b-button>
      </p>
    </b-field>
    <b-taglist>
      <b-tag
        type="is-primary"
        v-for="(tag, index) in tags"
        :key="index"
        @close="removeTag(index)"
        aria-close-label="Remove tag"
        closable
      >
        <span class="is-inline-flex">
          {{ tag }}
          <b-icon
            class="edit-tag-icon"
            pack="fas"
            icon="edit"
            size="is-small"
            @click.native="editTag(tag, index)"
          />
        </span>
      </b-tag>
    </b-taglist>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: ['Albino', 'Milano', 'Torino', 'Como'],
      newTag: ''
    }
  },
  methods: {
    addTag() {
      if (this.newTag) {
        this.tags.push(this.newTag)
        this.newTag = ''
      }
    },
    editTag(tag, index) {
      this.$buefy.dialog.prompt({
        message: `Do you want to edit this tag?`,
        inputAttrs: {
          value: tag,
          maxlength: 10
        },
        size: 'is-small',
        confirmText: 'Save',
        trapFocus: true,
        onConfirm: value => {
          this.tags[index] = value
          this.$forceUpdate()
        }
      })
    },
    removeTag(index) {
      this.tags.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-tag-title {
  font-size: 0.8em;
  height: 27px;
  line-height: 27px;
}

.add-tag-input {
  margin-bottom: 0;
  margin-left: 10px;
  margin-right: 10px;
}

.edit-tag-icon {
  margin: 0 1px 0 5px !important;
  cursor: pointer;
}
</style>
