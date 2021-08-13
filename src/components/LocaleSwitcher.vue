<template>
  <b-dropdown
    v-model="$i18n.locale"
    aria-role="list"
    :class="{ isAbsolute: 'isAbsolute' }"
    :position="dropitemPosition"
  >
    <template #trigger>
      <b-icon
        size="is-medium"
        icon="globe"
        pack="fa"
        type="is-light"
        style="cursor: pointer;"
      />
    </template>

    <b-dropdown-item
      :value="locale.code"
      aria-role="listitem"
      v-for="locale in locales"
      :key="locale.code"
    >
      <div class="media">
        <b-image
          :src="require(`@/assets/lang/${locale.code}.png`)"
          class="media-left"
          style="width: 15%;"
        />
        <div class="media-content">
          <h3>{{ $t(`lang.${locale.code}`) }}</h3>
        </div>
      </div>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { getSupportedLocales } from '@/util/supported-locales.js'

export default {
  props: {
    isAbsolute: {
      type: Boolean,
      default: false
    },
    dropitemPosition: {
      type: String,
      default: 'is-bottom-right'
    }
  },
  data() {
    return {
      locales: getSupportedLocales()
    }
  },
  beforeMount() {
    if (localStorage.getItem('lang')) {
      this.$i18n.locale = localStorage.getItem('lang')
    }
  },
  watch: {
    '$i18n.locale'(value) {
      localStorage.setItem('lang', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.isAbsolute {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
