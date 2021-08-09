<template>
  <div>
    <div class="columns">
      <div class="column is-flex pt-1 pb-0" :class="dynamicFlexClass">
        <b-button
          size="is-small"
          type="is-link is-light"
          pack="fas"
          @click="toggle('Left')"
          :icon-right="leftBtIcon"
          v-if="leftButton"
        >
          {{ leftBtText }}
        </b-button>
        <b-button
          size="is-small"
          type="is-link is-light"
          pack="fas"
          @click="toggle('Right')"
          :icon-left="rightBtIcon"
          v-if="rightButton"
        >
          {{ rightBtText }}
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
  methods: {
    toggle(side) {
      this[`toggle${side}`] = !this[`toggle${side}`]
    }
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
    },
    dynamicFlexClass() {
      return !this.leftButton
        ? 'is-justify-content-flex-end'
        : 'is-justify-content-space-between'
    },
    leftBtIcon() {
      return this.toggleLeft ? 'chevron-left' : 'chevron-right'
    },
    rightBtIcon() {
      return this.toggleRight ? 'chevron-right' : 'chevron-left'
    },
    leftBtText() {
      return this.toggleLeft
        ? this.$i18n.t('common.forms.hide', [this.leftButton])
        : this.$i18n.t('common.forms.show', [this.leftButton])
    },
    rightBtText() {
      return this.toggleRight
        ? this.$i18n.t('common.forms.hide', [this.rightButton])
        : this.$i18n.t('common.forms.show', [this.rightButton])
    }
  }
}
</script>

<style lang="scss" scoped></style>
