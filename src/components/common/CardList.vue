<template>
  <ul class="card-list">
    <li v-for="item in list" :key="item.name">
      <div class="columns">
        <span :class="`column is-${colSizes[0]}`">{{ item.name }}</span>
        <span
          v-tooltip.right="options(item.value)"
          :class="`column is-${colSizes[1]}`"
          v-if="!item.hasIcon"
        >
          {{ item.value }}
        </span>
        <span
          v-tooltip.right="options(item.value)"
          :class="`column is-${colSizes[1]}`"
          v-if="item.hasIcon"
        >
          <b-icon
            size="is-small"
            :icon="bindIncon(item.value)[0]"
            :type="bindIncon(item.value)[1]"
            style="vertical-align: middle;"
          >
          </b-icon>
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapBooleanIcon } from '@/helpers/helpers.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  mixins: [TooltipMixin],
  props: {
    list: {
      type: Array,
      required: true
    },
    colSizes: {
      type: Array,
      default: () => ['4', '8']
    }
  },
  methods: {
    bindIncon(value) {
      return mapBooleanIcon(value)
    }
  }
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
