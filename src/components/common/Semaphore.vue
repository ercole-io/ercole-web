<template>
  <b-button
    icon-pack="fas"
    :icon-left="getIcon"
    :type="getColor"
    :size="setSize"
    class="is-clickable"
    @click="openModal"
    v-tooltip="options(getTooltip)"
    v-if="getColor !== ''"
  >
    Details
  </b-button>
  <span v-else>-</span>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import tooltipMixin from '@/mixins/tooltipMixin.js'
import SemaphoreModal from '@/components/hosts/hostDetails/oracle/SemaphoreModal.vue'
import PolicyAuditModal from '@/components/hosts/hostDetails/oracle/PolicyAuditModal.vue'

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
    btType: {
      type: String,
      default: 'migrable',
    },
    policyAuditData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isModalActive: false,
    }
  },
  methods: {
    ...mapActions(['hostDatabaseSemaphoreData']),
    openModal() {
      if (this.btType === 'migrable') {
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
      } else {
        this.$buefy.modal.open({
          component: PolicyAuditModal,
          hasModalCard: true,
          props: {
            params: this.hostDetails.policyAuditData,
            color:
              this.hostDetails.policyAuditColor === 'red'
                ? 'is-danger'
                : 'is-primary',
          },
        })
      }
    },
  },
  computed: {
    ...mapState(['hostDetails']),
    getColor() {
      let color
      if (this.setColor === 'red') {
        color = 'is-danger'
      } else if (this.setColor === 'yellow') {
        color = 'is-warning'
      } else if (this.setColor === 'green') {
        color = 'is-primary'
      } else {
        color = ''
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
    getTooltip() {
      if (this.btType === 'migrable') {
        return 'Postgre Migrability'
      } else {
        return 'Policy Audit'
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
