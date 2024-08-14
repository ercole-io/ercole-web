<template>
  <b-button
    icon-pack="fas"
    :icon-left="getIcon(setColor)"
    :type="getColor(setColor)"
    :size="setSize"
    class="is-clickable"
    @click="openModal"
    v-tooltip="options(getTooltip)"
    v-if="getColor(setColor) !== ''"
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
import MemoryInfoModal from '@/components/hosts/hostDetails/oracle/MemoryInfoModal.vue'

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
    memoryInfoData: {
      type: Object,
      default: () => {},
    },
    modaldata: {
      type: Object,
      default: () => {},
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
      if (this.modaldata) {
        this.$buefy.modal.open({
          component: SemaphoreModal,
          hasModalCard: true,
          props: {
            metrics: this.modaldata.metrics,
            other: this.modaldata.other,
          },
        })
      } else {
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
        } else if (this.btType === 'policy') {
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
        } else if (this.btType === 'memory') {
          this.$buefy.modal.open({
            component: MemoryInfoModal,
            hasModalCard: true,
            props: {
              data: this.memoryInfoData,
              color: this.getColor(this.memoryInfoData.color),
            },
          })
        }
      }
    },
    getColor(value) {
      let color
      if (value === 'red') {
        color = 'is-danger'
      } else if (value === 'yellow') {
        color = 'is-warning'
      } else if (value === 'green') {
        color = 'is-primary'
      } else {
        color = ''
      }
      return color
    },
    getIcon(value) {
      let icon
      if (value === 'red') {
        icon = 'minus'
      }
      if (value === 'yellow') {
        icon = 'exclamation'
      }
      if (value === 'green') {
        icon = 'check'
      }
      return icon
    },
    getTooltip() {
      if (this.btType === 'migrable') {
        return 'Postgre Migrability'
      } else if (this.btType === 'policy') {
        return 'Policy Audit'
      } else if (this.btType === 'memory') {
        return 'Memory Info'
      }
    },
  },
  computed: {
    ...mapState(['hostDetails']),
  },
}
</script>

<style lang="scss" scoped></style>
