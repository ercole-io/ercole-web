<template>
  <div class="locale-switcher">
    <b-select v-model="$i18n.locale" size="is-small" expanded>
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">
        {{ $t(`lang.${locale.code}`) }}
      </option>
    </b-select>
  </div>
</template>

<script>
import { getSupportedLocales } from '@/util/supported-locales.js'

export default {
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
.locale-switcher {
  display: block;
  width: 100%;
}
</style>
