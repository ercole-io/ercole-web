<template>
  <ul class="card-list">
    <template v-for="item in list">
      <li v-if="item.value" :key="item.name">
        <div class="columns">
          <span :class="`column is-${colSizes[0]}`">{{ item.name }}</span>
          <span
            v-tooltip.right="options(item.value)"
            v-html="highlight(toString(item.value))"
            :class="`column is-${colSizes[1]}`"
          />
          <!-- <span
            v-tooltip.right="options(bindIncon(item.value)[2])"
            :class="`column is-${colSizes[1]}`"
            v-if="item.hasIcon"
          >
            <b-icon
              size="is-small"
              :icon="bindIncon(item.value)[0]"
              :type="bindIncon(item.value)[1]"
              style="vertical-align: middle"
            />
          </span> -->
        </div>
      </li>
    </template>
  </ul>
</template>

<script>
import _ from 'lodash'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'

export default {
  mixins: [TooltipMixin, HighlightSearchMixin],
  props: {
    list: {
      type: Array,
      required: true,
    },
    colSizes: {
      type: Array,
      default: () => ['4', '8'],
    },
  },
  methods: {
    bindIncon(value) {
      return mapBooleanIcon(value)
    },
    toString(val) {
      return _.toString(val)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-list {
  li {
    font-size: 0.7rem;
    padding: 0.2em 1em;

    &:nth-child(odd) {
      background: #f1f1f1;
    }

    span:first-child {
      font-weight: 500;
    }

    span:last-child {
      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
      align-self: center;
    }
  }
}
</style>
