<template>
  <b-autocomplete
    v-model="inputVal"
    size="is-small"
    type="text"
    icon="magnify"
    :field="field"
    :data="filterResult"
    :append-to-body="appendToBody"
    @typing="filterMethod($event)"
    clearable
    open-on-focus
  >
    <template slot-scope="props">
      <div class="media media-custom">
        <div class="media-content">
          <b>{{ customFieldOptions(props.option)[0] }}</b>
          <br />
          <small>
            {{ customFieldOptions(props.option)[1] }}
            <br />
            {{ customFieldOptions(props.option)[2] }}
          </small>
        </div>
      </div>
    </template>
    <template #empty>{{ $i18n.t('common.validations.noResults') }}</template>
  </b-autocomplete>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    value: {},
    filterResult: {
      type: Array,
      required: true
    },
    field: {
      type: String,
      required: true
    },
    filterMethod: {
      type: Function,
      default: () => {}
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    customFieldOptions(props) {
      return _.split(props, '-', 3)
    }
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss">
.autocomplete {
  .dropdown-content {
    padding-top: 0.1rem;
    padding-bottom: 0;
  }

  .dropdown-menu {
    min-width: 100%;
  }
  .dropdown-item {
    font-size: 0.8em;
    padding: 0.15rem 0.7rem;
    border-bottom: 1px dotted #dbdbdb;
  }
}
</style>
