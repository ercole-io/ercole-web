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
    <slot name="bottom" />
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapMutations, mapGetters } from 'vuex'

export default {
  props: {
    leftCol: {
      type: Number,
      default: 3,
    },
    centerCol: {
      type: Number,
      default: 6,
    },
    rightCol: {
      type: Number,
      default: 3,
    },
    leftButton: {
      type: String,
    },
    rightButton: {
      type: String,
    },
    getPage: {
      type: String,
    },
  },
  data() {
    return {
      toggleLeft: true,
      toggleRight: true,
    }
  },
  created() {
    bus.$on('onToggleEdit', (val) => {
      this.toggleRight = val
    })

    this.toggleLeft = this.getColumnsStatus(this.getPage)[0]
    this.toggleRight = this.getColumnsStatus(this.getPage)[1]
  },
  methods: {
    ...mapMutations(['SET_HIDDEN_COLS']),
    toggle(side) {
      this[`toggle${side}`] = !this[`toggle${side}`]
      this.SET_HIDDEN_COLS({
        name: this.getPage,
        values: [this.toggleLeft, this.toggleRight],
      })
    },
  },
  computed: {
    ...mapGetters(['getColumnsStatus']),
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
        ? 'is-justify-content-flex-end is-align-items-center'
        : 'is-justify-content-space-between is-align-items-center'
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
    },
  },
}
</script>

<style lang="scss" scoped></style>
