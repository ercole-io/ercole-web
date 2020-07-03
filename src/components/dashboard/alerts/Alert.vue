<template>
  <div class="card alert-card">
    <header class="card-header">
      <p class="card-header-title alert-title">
        <b-icon type="is-dark" pack="fas" size="is-small" :icon="title[1]" />
        <span>{{ title[0] }}</span>
      </p>
    </header>
    <main class="card-content alert-body">
      <transition name="fade" mode="out-in">
        <div class="alert-main" v-if="alertTotals.total > 0 && !isAnimated">
          <b-icon
            :type="alertInfo.type"
            pack="fas"
            :icon="alertInfo.icon"
            size="is-medium"
          />
          <div class="alert-content">
            <p>
              <span class="has-text-weight-semibold">From:</span>
              {{ alertInfo.host }}
            </p>
            <p>
              <span class="has-text-weight-semibold">Date:</span>
              {{ alertInfo.date | formatDate }}
            </p>

            <p>{{ alertInfo.msg }}</p>
            <b-button
              @click="markAsRead(alertInfo.alertId, alertInfo.flag)"
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

        <NoContent noContentText="There are no alerts" v-else />
      </transition>
    </main>
    <footer class="card-footer card-buttons has-background-grey">
      <b-button
        @click="infoClick(alertTotals.info, alertInfo.flag)"
        type="is-info"
        size="is-small"
        icon-pack="fas"
        icon-left="info-circle"
        class="has-text-weight-semibold"
        expanded
      >
        {{ alertTotals.info }}
      </b-button>
      <b-button
        @click="warningClick(alertTotals.warn, alertInfo.flag)"
        type="is-warning"
        size="is-small"
        icon-pack="fas"
        icon-left="exclamation-triangle"
        class="has-text-weight-semibold"
        expanded
      >
        {{ alertTotals.warn }}
      </b-button>
      <b-button
        @click="criticalClick(alertTotals.crit, alertInfo.flag)"
        type="is-danger"
        size="is-small"
        icon-pack="fas"
        icon-left="exclamation-circle"
        class="has-text-weight-semibold"
        expanded
      >
        {{ alertTotals.crit }}
      </b-button>
    </footer>
  </div>
</template>

<script>
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
    markAsRead(id, flag) {
      this.isAnimated = !this.isAnimated
      this.$store.dispatch('markAsRead', { id, flag })
    },
    infoClick(qtd, flag) {
      console.log(qtd, `${flag} info alerts`)
    },
    warningClick(qtd, flag) {
      console.log(qtd, `${flag} warning alerts`)
    },
    criticalClick(qtd, flag) {
      console.log(qtd, `${flag} critical alerts`)
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
    padding: 1em;
    width: 100%;

    .alert-main {
      display: flex;
      flex-direction: row;
      width: 100%;
      overflow-wrap: anywhere;
    }

    .alert-content {
      width: 100%;
      padding-left: 10px;
    }
  }

  .card-buttons {
    border: 2px solid hsl(0, 0%, 48%);
    display: flex;
  }
}

.flip-enter-active {
  transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
}

.flip-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>
