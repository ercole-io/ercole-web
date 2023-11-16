<template>
  <b-button
    icon-pack="fas"
    :icon-right="getIcon"
    :type="getColor"
    :size="setSize"
    class="is-clickable"
    @click="openMograbilityModal"
    v-tooltip="options('Postgre Migrability')"
  />
</template>

<script>
import { mapState } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import SemaphoreModal from '@/components/hosts/hostDetails/oracle/SemaphoreModal.vue'

export default {
  name: 'commom-semaphore-component',
  mixins: [tooltipMixin],
  props: {
    setColor: {
      type: String,
      default: '',
    },
    setSize: {
      type: String,
      default: 'is-small',
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    openMograbilityModal() {
      this.$buefy.modal.open({
        component: SemaphoreModal,
        hasModalCard: true,
        props: {
          metrics: this.hostDetails.semaphoreData.metrics,
          other: this.hostDetails.semaphoreData.other,
        },
      })
    },
  },
  computed: {
    ...mapState(['hostDetails']),
    getColor() {
      let color
      if (this.setColor === 'red') {
        color = 'is-danger'
      }
      if (this.setColor === 'yellow') {
        color = 'is-warning'
      }
      if (this.setColor === 'green') {
        color = 'is-primary'
      }
      return color
    },
    getIcon() {
      let icon
      if (this.setColor === 'red') {
        icon = 'minus'
      }
      if (this.setColor === 'yellow') {
        icon = 'exclamation'
      }
      if (this.setColor === 'green') {
        icon = 'check'
      }
      return icon
    },
  },
}
</script>

<style lang="scss" scoped></style>
