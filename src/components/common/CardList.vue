<template>
  <ul class="card-list">
    <li v-for="item in list" :key="item.name">
      <div class="columns">
        <span :class="`column is-${colSizes[0]}`">{{ item.name }}</span>

        <span
          v-tooltip.right="options(item.value)"
          :class="`column is-${colSizes[1]}`"
          v-if="!item.hasIcon && !item.hasLink && !item.type"
        >
          {{ item.value | toString }}
        </span>

        <span
          v-tooltip.right="options(item.value)"
          :class="`column is-${colSizes[1]}`"
          v-if="item.hasLink && !item.hasIcon"
        >
          <a @click="item.link">
            {{ item.value | toString }}
          </a>
        </span>

        <span
          v-tooltip.right="options(bindIncon(item.value)[2])"
          :class="`column is-${colSizes[1]}`"
          v-if="item.hasIcon"
        >
          <b-icon
            size="is-small"
            :icon="bindIncon(item.value)[0]"
            :type="bindIncon(item.value)[1]"
            style="vertical-align: middle"
          >
          </b-icon>
        </span>

        <span v-if="item.type && item.type === 'button-modal'">
          <Semaphore
            :setColor="item.value"
            btType="memory"
            :memoryInfoData="{
              params: item.data,
              color: item.value,
            }"
          />
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapBooleanIcon } from '@/helpers/helpers.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import Semaphore from '@/components/common/Semaphore.vue'

export default {
  name: 'commom-cardlist-component',
  mixins: [TooltipMixin],
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
  components: {
    Semaphore,
  },
  methods: {
    bindIncon(value) {
      return mapBooleanIcon(value)
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
