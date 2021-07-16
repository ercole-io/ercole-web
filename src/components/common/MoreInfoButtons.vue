<template>
  <ButtonGroup :groupTitle="`${$t('common.general.moreInfo')}`">
    <b-button
      v-for="(button, i) in buttonItems"
      :key="i"
      class="mr-1"
      size="is-small"
      :type="
        toggle['hidden' + button.toggle]
          ? 'is-light'
          : `is-light color-${i + 1}`
      "
      @click="
        toggleMoreInfo(
          button.toggle,
          (toggle['hidden' + button.toggle] = !toggle['hidden' + button.toggle])
        )
      "
    >
      {{ $t(`${button.langKey}`) }}
    </b-button>
  </ButtonGroup>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ButtonGroup from '@/components/common/ButtonGroup.vue'

export default {
  props: {
    buttonItems: {
      type: Array,
      required: true
    }
  },
  components: {
    ButtonGroup
  },
  methods: {
    ...mapMutations(['SET_VISIBLE_COLS']),
    toggleMoreInfo(name, value) {
      this.SET_VISIBLE_COLS({
        value: value,
        name: name
      })
    }
  },
  computed: {
    ...mapState(['moreInfoToggle']),
    toggle() {
      return this.moreInfoToggle
    }
  }
}
</script>

<style lang="scss" scoped></style>
