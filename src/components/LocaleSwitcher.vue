<template>
  <div class="locale-switcher">
    <select v-model="$i18n.locale">
      <option :value="locale.code" v-for="locale in locales" :key="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { getSupportedLocales } from '@/util/supported-locales.js'

export default {
  data() {
    return {
      locales: getSupportedLocales()
    }
  }
}
</script>

<style lang="scss" scoped>
.locale-switcher {
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}
</style>
