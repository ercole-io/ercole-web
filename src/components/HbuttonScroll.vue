<template>
  <div class="wrapper">
    <b-button
      @click="scroll('left')"
      class="previous"
      icon-pack="fas"
      icon-left="angle-left"
      size="is-small"
      :style="{ height: height + 'px' }"
      v-if="isVisible"
    />
    <b-button
      @click="scroll('right')"
      class="next"
      icon-pack="fas"
      icon-left="angle-right"
      size="is-small"
      :style="{ height: height + 'px' }"
      v-if="isVisible"
    />
    <div class="wrapper-box" :id="scrollID">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    elemScroll: {
      type: String,
      default: null,
    },
    height: {
      type: String,
      default: null,
    },
    speed: {
      type: Number,
      default: 50,
    },
    scrollID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isVisible: null,
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.checkScroll)
  },
  mounted() {
    this.checkScroll()
  },
  beforeUpdate() {
    setTimeout(() => {
      this.checkScroll()
    }, 2000)
  },
  methods: {
    scroll(side) {
      const element = document.querySelector(
        this.elemScroll ? `.${this.elemScroll}` : `#${this.scrollID}`
      )

      if (element.childNodes[0].id === this.scrollID) {
        if (side === 'left') {
          element.scrollLeft -= this.speed
        } else {
          element.scrollLeft += this.speed
        }
      }
    },
    checkScroll() {
      const element = document.querySelector(
        this.elemScroll ? `.${this.elemScroll}` : `#${this.scrollID}`
      )

      if (element.childNodes[0].id === this.scrollID) {
        this.isVisible = element.scrollWidth > element.clientWidth
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}

.wrapper-box {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;

  &::-webkit-scrollbar {
    background: transparent;
    height: 0;
  }
}

@mixin arrows($position) {
  position: absolute;
  #{$position}: -25px;
  top: 0;
  height: 100%;
  padding: 0 8px;
  border: none;

  &:hover {
    background-color: #679189;
    color: #ffffff;
  }

  &:focus {
    box-shadow: none;
  }
}

.previous {
  @include arrows(left);
}

.next {
  @include arrows(right);
}
</style>
