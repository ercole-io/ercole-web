<template>
  <div>
    <div class="columns">
      <div
        class="column is-flex pt-2 pb-0"
        :class="
          !leftButton
            ? 'is-justify-content-flex-end'
            : 'is-justify-content-space-between'
        "
      >
        <b-button
          size="is-small"
          type="is-link is-light"
          pack="fas"
          @click="toggleLeft = !toggleLeft"
          :icon-right="toggleLeft ? 'chevron-left' : 'chevron-right'"
          v-if="leftButton"
        >
          {{
            toggleLeft
              ? $t('common.forms.hide', [leftButton])
              : $t('common.forms.show', [leftButton])
          }}
        </b-button>
        <b-button
          size="is-small"
          type="is-link is-light"
          pack="fas"
          @click="toggleRight = !toggleRight"
          :icon-left="toggleRight ? 'chevron-right' : 'chevron-left'"
          v-if="rightButton"
        >
          {{
            toggleRight
              ? $t('common.forms.hide', [rightButton])
              : $t('common.forms.show', [rightButton])
          }}
        </b-button>
      </div>
    </div>
    <div class="columns">
      <div class="column" :class="`is-${left}`" v-show="toggleLeft">
        <slot name="left" />
      </div>

      <div class="column" :class="`is-${center}`">
        <slot name="center" />
      </div>

      <div class="column" :class="`is-${right}`" v-show="toggleRight">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'

export default {
  props: {
    leftCol: {
      type: Number,
      default: 3
    },
    centerCol: {
      type: Number,
      default: 6
    },
    rightCol: {
      type: Number,
      default: 3
    },
    leftButton: {
      type: String
    },
    rightButton: {
      type: String
    }
  },
  data() {
    return {
      toggleLeft: true,
      toggleRight: true
    }
  },
  created() {
    bus.$on('onToggleEdit', val => {
      this.toggleRight = val
    })
  },
  computed: {
    left() {
      if (this.noLeftCol) {
        return 0
      } else {
        return this.leftCol
      }
    },
    center() {
      if (this.noLeftCol) {
        return this.centerCol + this.leftCol
      } else if (this.noRightCol) {
        return this.centerCol + this.rightCol
      } else if (this.onlyCenterCol) {
        return 12
      } else {
        return this.centerCol
      }
    },
    right() {
      if (this.noRightCol) {
        return 0
      } else {
        return this.rightCol
      }
    },
    noLeftCol() {
      return !this.toggleLeft && this.toggleRight
    },
    noRightCol() {
      return this.toggleLeft && !this.toggleRight
    },
    onlyCenterCol() {
      return !this.toggleLeft && !this.toggleRight
    }
  }
}
</script>

<style lang="scss" scoped></style>
