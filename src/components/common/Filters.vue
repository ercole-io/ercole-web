<template>
  <BoxContent :title="$t('dashboard.pageTitle.filters')">
    <form class="columns">
      <b-field class="column" label="Location">
        <b-select v-model="location" size="is-small" expanded>
          <option>Item 1</option>
          <option>Item 2</option>
        </b-select>
      </b-field>

      <b-field class="column" label="Environment">
        <b-select v-model="environment" size="is-small" expanded>
          <option>Item 1</option>
          <option>Item 2</option>
        </b-select>
      </b-field>

      <b-field class="column is-4" label="Tag List">
        <b-taginput
          size="is-small"
          expanded
          v-model="tags"
          :data="filteredTags"
          autocomplete
          ref="taginput"
          icon="label"
          placeholder="Add a tag"
          @typing="getFilteredTags"
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

      <b-field class="column is-2" label="Date">
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

      <b-field class="column is-2" custom-class="label-button" label="&nbsp;">
        <b-button @click="resetAllFilters" size="is-small is-primary" expanded>
          Reset All Filters
        </b-button>
      </b-field>
    </form>
  </BoxContent>
</template>

<script>
import BoxContent from '@/components/common/BoxContent.vue'

export default {
  components: {
    BoxContent
  },
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

<style lang="scss" scoped></style>
