<template>
  <td v-tooltip="options(formatArrayToShow(value), null, 'right')">
    <div class="dbsList">
      <div v-if="valueSize > defaultSize">
        <b-button
          size="is-small"
          type="is-success is-light"
          @click="show('plus')"
          icon-right="plus"
          icon-pack="fas"
          :disabled="limit > valueSize"
          outlined
        />
        <b-button
          size="is-small"
          type="is-danger is-light"
          @click="show()"
          icon-right="minus"
          icon-pack="fas"
          :disabled="limit < defaultSize"
          outlined
        />
      </div>
      <ul>
        <li
          v-for="(val, index) in value"
          :key="index"
          :class="index > limit ? 'hidden' : ''"
          class="wrap-list"
        >
          <span v-html="highlight(val) || '-'"></span>
        </li>
      </ul>
    </div>
  </td>
</template>

<script>
import _ from 'lodash'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'

export default {
  name: 'commom-table-tdarraymore-component',
  mixins: [HighlightSearchMixin, TooltipMixin],
  data() {
    return {
      limit: 4,
      defaultSize: 5,
      valueSize: null,
    }
  },
  methods: {
    formatArrayToShow(val) {
      this.valueSize = val.length
      let values = [...val]

      values = _.map(values, (val) => {
        val = ` ${val}`
        return val
      })

      return values
    },
    show(val = '') {
      if (val === 'plus') {
        this.limit += this.defaultSize
      } else {
        if (this.limit > this.defaultSize) {
          this.limit -= this.defaultSize
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.dbsList {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  div,
  ul {
    display: flex;
    flex-direction: column;
  }

  ul {
    align-self: flex-start;
  }

  div {
    padding: 3px 5px 0 0;
    align-self: flex-start;

    .button {
      &.is-small {
        font-size: 0.55rem;
      }
    }

    .button:first-child {
      margin-bottom: 8px;
    }
  }
}

.wrap-list {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  overflow-wrap: anywhere;
  max-width: 100px;
}

.hidden {
  display: none;
}
</style>
