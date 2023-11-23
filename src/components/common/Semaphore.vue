<template>
  <b-button
    icon-pack="fas"
    :icon-left="getIcon"
    :type="getColor"
    :size="setSize"
    class="is-clickable"
    @click="openMograbilityModal"
    v-tooltip="options('Postgre Migrability')"
  >
    Details
  </b-button>
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
    hostname: {
      type: String,
      default: '',
    },
    dbname: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    ...mapActions(['hostDatabaseSemaphoreData']),
    openMograbilityModal() {
      this.hostDatabaseSemaphoreData({
        hostname: this.hostname,
        dbname: this.dbname,
      }).then(() => {
        this.$buefy.modal.open({
          component: SemaphoreModal,
          hasModalCard: true,
          props: {
            metrics: this.hostDetails.semaphoreData.metrics,
            other: this.hostDetails.semaphoreData.other,
          },
        })
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
