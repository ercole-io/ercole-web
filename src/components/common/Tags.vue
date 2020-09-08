<template>
  <div class="is-flex" :class="direction">
    <span class="add-tag-title is-size-7">{{ title }}</span>
    <b-field class="add-tag-input">
      <b-input
        placeholder="Add tag"
        size="is-small"
        v-model="newTag"
        :style="`width: ${inputWidth}px;`"
      ></b-input>
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
  props: {
    title: {
      type: String,
      default: null
    },
    tagsList: {
      type: Array,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal'
    },
    inputWidth: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      newTag: ''
    }
  },
  methods: {
    addTag() {
      if (this.newTag) {
        this.tags.push(this.newTag)
        this.$emit('addTag', this.newTag)
        this.$forceUpdate()
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
          this.$emit('editTag', value)
          this.$forceUpdate()
        }
      })
    },
    removeTag(index) {
      this.tags.splice(index, 1)
      this.$emit('removeTag', index)
      this.$forceUpdate()
    }
  },
  computed: {
    tags() {
      return this.tagsList
    }
  }
}
</script>

<style lang="scss" scoped>
.horizontal {
  flex-direction: row;
}

.add-tag-title {
  line-height: 27px;
}

.add-tag-input {
  margin: 0 10px;
}

.edit-tag-icon {
  margin: 0 1px 0 5px !important;
  cursor: pointer;
}

.vertical {
  flex-direction: column;

  .add-tag-title {
    font-weight: 500;
  }

  .add-tag-input {
    margin: 5px 0 10px;
  }
}
</style>
