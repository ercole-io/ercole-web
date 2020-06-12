<template>
  <section class="filters">
    <b-button
      @click="expandFilters"
      size="is-small"
      type="is-light"
      pack="fas"
      :icon-right="filterIcon"
      class="bt-show-hide-filters"
      expanded
    >
      {{ isFilters ? 'Hide Filters' : 'Show Filters' }}
    </b-button>

    <b-collapse animation="slide" :open.sync="isFilters">
      <div class="filters-form">
        <b-field
          label="Location"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
        >
          <b-select
            v-model="location"
            size="is-small"
            placeholder="Select an location"
            expanded
          >
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
            <option>Item 4</option>
          </b-select>
        </b-field>

        <b-field
          label="Environment"
          class="filters-field"
          custom-class="is-size-7"
          horizontal
        >
          <b-select
            v-model="environment"
            size="is-small"
            placeholder="Select an environment"
            expanded
          >
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
            <option>Item 4</option>
          </b-select>
        </b-field>

        <b-field
          label="Taglist"
          class="filters-field"
          custom-class="is-size-7"
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
          class="filters-field"
          custom-class="is-size-7"
          horizontal
        >
          <b-datepicker
            v-model="date"
            size="is-small"
            placeholder="Select a date"
            icon="calendar-today"
            trap-focus
            expanded
          >
          </b-datepicker>
        </b-field>

        <b-button
          @click="resetAllFilters"
          class="filters-button"
          size="is-small is-primary"
        >
          Reset All Filters
        </b-button>
      </div>
    </b-collapse>
  </section>
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
      date: null,
      isFilters: false,
      filterIcon: 'chevron-down'
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
    expandFilters() {
      this.isFilters = !this.isFilters
      if (this.isFilters) {
        this.filterIcon = 'chevron-up'
      } else {
        this.filterIcon = 'chevron-down'
      }
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
.filters {
  position: fixed;
  width: 100%;

  .filters-form {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    padding: 10px 20px;
    background-color: #dbdbdb;
    min-height: 48px;
    margin-left: 40px;

    .filters-field {
      width: 100%;
    }
  }

  .bt-show-hide-filters {
    font-size: 11px;
    font-weight: 500;
  }

  @media screen and (max-width: 960px) {
    .filters-form {
      flex-direction: column;

      .filters-field {
        margin-bottom: 1rem;
      }
    }
  }

  @media screen and (min-width: 960px) {
    .filters-field {
      margin-bottom: 0;
      margin-left: 1rem;
    }

    .filters-button {
      margin-left: 20px;
    }
  }
}
</style>
