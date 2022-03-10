<template>
  <ButtonGroup :groupTitle="`${$t('common.general.moreInfo')}`">
    <template v-for="(button, i) in buttonItems">
      <GhostLoading
        :isLoading="loadingTableStatus"
        setWidth="60"
        setHeight="30"
        class="mr-1"
        :key="i"
      >
        <b-button
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
              (toggle['hidden' + button.toggle] =
                !toggle['hidden' + button.toggle])
            )
          "
        >
          {{ $t(`${button.langKey}`) }}
        </b-button>
      </GhostLoading>
    </template>
  </ButtonGroup>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import ButtonGroup from '@/components/common/ButtonGroup.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'

export default {
  props: {
    buttonItems: {
      type: Array,
      required: true,
    },
  },
  components: {
    ButtonGroup,
    GhostLoading,
  },
  methods: {
    ...mapMutations(['SET_VISIBLE_COLS']),
    toggleMoreInfo(name, value) {
      this.SET_VISIBLE_COLS({
        value: value,
        name: name,
      })
    },
  },
  computed: {
    ...mapState(['moreInfoToggle']),
    ...mapGetters(['loadingTableStatus']),
    toggle() {
      return this.moreInfoToggle
    },
  },
}
</script>

<style lang="scss" scoped></style>
