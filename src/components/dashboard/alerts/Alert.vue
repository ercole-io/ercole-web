<template>
  <div class="card alert-card">
    <header class="card-header">
      <p class="card-header-title alert-title">
        <b-icon type="is-dark" pack="fas" size="is-small" :icon="title[1]" />
        <span>{{ title[0] }}</span>
      </p>
    </header>
    <transition name="fade" mode="out-in">
      <main class="alert-body" v-if="alertTotals.total > 0 && !isAnimated">
        <div class="columns is-vcentered is-gapless bottom-space">
          <div class="column">
            <b-icon
              :type="setIcon.iconType"
              pack="fas"
              :icon="setIcon.icon"
              size="is-medium"
            />
          </div>
          <div class="column">
            <b-button
              @click="
                handleMarkAsRead(alertInfo.alertId, hasFlag, alertInfo.severity)
              "
              type="is-primary"
              size="is-small"
              icon-pack="fas"
              icon-left="check-circle"
              class="has-text-weight-semibold"
              style="float: right"
            >
              Mark as Read
            </b-button>
          </div>
        </div>
        <div class="columns is-vcentered is-gapless bottom-space">
          <div class="column">
            <p v-if="hasFlag === 'LICENSE'">
              <span class="has-text-weight-semibold">From:</span>
              {{ alertInfo.host }}
            </p>
          </div>
        </div>
        <div class="columns is-vcentered is-gapless bottom-space">
          <div class="column">
            <p>
              <span class="has-text-weight-semibold">Date:</span>
              {{ alertInfo.date }}
            </p>
          </div>
        </div>
        <div class="columns is-vcentered is-gapless bottom-space">
          <div class="column">
            <p>{{ alertInfo.msg }}</p>
          </div>
        </div>
      </main>
      <main class="alert-body" v-else>
        <NoContent :noContentText="`There are no alerts for ${title[0]}`" />
      </main>
    </transition>
    <footer class="card-footer card-buttons has-background-grey">
      <b-button
        @click="handleAlertClick(hasFlag, 'INFO')"
        :disabled="alertTotals.info === 0"
        type="is-info"
        size="is-small"
        icon-pack="fas"
        icon-left="info-circle"
        class="has-text-weight-semibold alert-button"
        expanded
      >
        {{ alertTotals.info }}
      </b-button>
      <b-button
        @click="handleAlertClick(hasFlag, 'WARNING')"
        :disabled="alertTotals.warn === 0"
        type="is-warning"
        size="is-small"
        icon-pack="fas"
        icon-left="exclamation-triangle"
        class="has-text-weight-semibold alert-button"
        expanded
      >
        {{ alertTotals.warn }}
      </b-button>
      <b-button
        @click="handleAlertClick(hasFlag, 'CRITICAL')"
        :disabled="alertTotals.crit === 0"
        type="is-danger"
        size="is-small"
        icon-pack="fas"
        icon-left="exclamation-circle"
        class="has-text-weight-semibold alert-button"
        expanded
      >
        {{ alertTotals.crit }}
      </b-button>
    </footer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: {
    title: {
      type: Array,
      default: () => []
    },
    alertInfo: {
      type: Object,
      default: () => {}
    },
    alertTotals: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    NoContent
  },
  data() {
    return {
      isAnimated: false
    }
  },
  methods: {
    ...mapActions(['markAsRead']),
    handleMarkAsRead(id, flag, type) {
      this.isAnimated = !this.isAnimated
      this.markAsRead({ id, flag, type })
    },
    handleAlertClick(flag, type) {
      this.$router.push(`/alerts/${type}/${flag}`)
    }
  },
  computed: {
    hasFlag() {
      return this.alertInfo && this.alertInfo.flag ? this.alertInfo.flag : null
    },
    setIcon() {
      return checkAlertIcon(this.alertInfo.severity)
    }
  },
  watch: {
    isAnimated(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.isAnimated = oldValue
        }, 0)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.alert-card {
  padding: 0;
  margin-bottom: 1.5em;
  width: 100%;

  .alert-title {
    font-size: 0.9em !important;

    span:not(:first-child) {
      padding-left: 5px;
    }
  }

  .alert-body {
    font-size: 0.75rem;
    padding: 1rem;
    width: 100%;

    .bottom-space {
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  }

  .card-buttons {
    border: 2px solid hsl(0, 0%, 48%);
    display: flex;

    .alert-button {
      &:disabled {
        opacity: 1;
      }
    }
  }
}

// .flip-enter-active {
//   transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
// }

// .flip-leave-active {
//   transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
// }

// .flip-enter,
// .flip-leave-to {
//   transform: scaleY(0) translateZ(0);
//   opacity: 0;
// }

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
