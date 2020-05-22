<template>
  <b-field grouped>
    <b-field
      label="Location"
      custom-class="is-size-7 has-text-grey-lighter"
      horizontal
    >
      <b-select v-model="location" size="is-small" expanded>
        <option>Item 1</option>
        <option>Item 2</option>
      </b-select>
    </b-field>

    <b-field
      label="Environment"
      custom-class="is-size-7 has-text-grey-lighter"
      horizontal
    >
      <b-select v-model="environment" size="is-small" expanded>
        <option>Item 1</option>
        <option>Item 2</option>
      </b-select>
    </b-field>

    <b-field
      label="Taglist"
      custom-class="is-size-7 has-text-grey-lighter"
      horizontal
    >
      <b-taginput
        size="is-small"
        v-model="tags"
        :data="filteredTags"
        autocomplete
        ref="taginput"
        icon="label"
        placeholder="Add a tag"
        @typing="getFilteredTags"
        expanded
      >
        <template slot-scope="props">
          <strong>{{ props.option.id }}</strong
          >: {{ props.option.name }}
        </template>
        <template slot="empty">
          There are no items
        </template>
        <template slot="selected" slot-scope="props">
          <b-tag
            v-for="(tag, index) in props.tags"
            :key="index"
            type="is-primary"
            :tabstop="false"
            closable
            @close="$refs.taginput.removeTag(index, $event)"
          >
            {{ tag.name }}
          </b-tag>
        </template>
      </b-taginput>
    </b-field>

    <b-field
      label="Date"
      custom-class="is-size-7 has-text-grey-lighter"
      horizontal
    >
      <b-datepicker
        v-model="date"
        size="is-small"
        placeholder="Click to select..."
        icon="calendar-today"
        trap-focus
        expanded
      >
      </b-datepicker>
    </b-field>

    <b-field custom-class="is-size-7" horizontal>
      <b-button @click="resetAllFilters" size="is-small is-primary">
        Reset All Filters
      </b-button>
    </b-field>
  </b-field>
</template>

<script>
export default {
  data() {
    return {
      tagList: [
        { id: 'a', name: 'Tag 1' },
        { id: 'b', name: 'Tag 2' },
        { id: 'c', name: 'Tag 3' },
        { id: 'd', name: 'Tag 4' },
        { id: 'e', name: 'Tag 5' }
      ],
      filteredTags: this.tagList,
      isSelectOnly: false,
      tags: [],
      location: null,
      environment: null,
      date: null
    }
  },
  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.tagList.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        )
      })
    },
    resetAllFilters() {
      this.location = null
      this.environment = null
      this.tags = []
      this.date = null
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 0;

  .field-label {
    .label {
      width: 45px;
    }
  }

  .is-expanded {
    max-width: 200px;
    min-width: 150px;
  }
}
</style>
