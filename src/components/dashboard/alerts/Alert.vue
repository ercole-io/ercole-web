<template>
  <div class="card alert-card">
    <header class="card-header">
      <p class="card-header-title alert-title">
        <b-icon type="is-dark" pack="fas" size="is-small" :icon="title[1]" />
        <span>{{ title[0] }}</span>
      </p>
    </header>

    <main class="alert-body" v-if="loading || getTotals.total">
      <transition name="flip" :duration="5000">
        <div v-if="!isAnimated" class="wrap-msg">
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <template v-if="!loading && getTotals.total">
                <b-icon
                  :type="setIcon.iconType"
                  :icon="setIcon.icon"
                  custom-size="mdi-24px"
                />
              </template>
              <b-skeleton height="24" width="24" circle :active="loading" />
            </div>

            <div class="column">
              <template v-if="!loading && getTotals.total">
                <b-button
                  @click="
                    handleMarkAsRead(
                      getFirst.alertId,
                      hasFlag,
                      getFirst.severity
                    )
                  "
                  type="is-primary"
                  size="is-small"
                  icon-pack="fas"
                  icon-left="check-circle"
                  class="has-text-weight-semibold"
                  style="float: right"
                >
                  {{ $t('views.dashboard.markAsRead') }}
                </b-button>
              </template>
              <b-skeleton height="30" width="116" :active="loading" />
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <template v-if="!loading && getTotals.total">
                <p v-if="hasFlag === 'LICENSE'">
                  <span class="has-text-weight-semibold">
                    {{ $t('views.dashboard.from') }}
                  </span>

                  {{ getFirst.host }}
                </p>
              </template>
              <b-skeleton size="is-small" :active="loading" />
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <p>
                <template v-if="!loading && getTotals.total">
                  <span class="has-text-weight-semibold">
                    {{ $t('views.dashboard.date') }}
                  </span>
                  {{ getFirst.date | formatDate }}
                </template>
                <b-skeleton size="is-small" :active="loading" />
              </p>
            </div>
          </div>
          <div class="columns is-vcentered is-gapless bottom-space">
            <div class="column">
              <template v-if="!loading && getTotals.total">
                <p>{{ getFirst.msg }}</p>
              </template>
              <b-skeleton size="is-large" :active="loading" />
            </div>
          </div>
        </div>
      </transition>
    </main>
    <main class="alert-body" v-if="!getTotals.total && !loading">
      <NoContent
        :noContentText="`${$t('views.dashboard.noAlerts')} ${title[0]}`"
      />
    </main>

    <footer class="card-footer card-buttons">
      <template v-if="!loading">
        <b-button
          @click="handleAlertClick(hasFlag, 'INFO')"
          :disabled="getTotals.info === 0"
          :type="{
            'is-info': getTotals.info !== 0,
            'inverted-alert info': getTotals.info === 0
          }"
          size="is-small"
          icon-pack="mdi"
          icon-left="information"
          class="has-text-weight-semibold alert-button"
          expanded
        >
          {{ getTotals.info }}
        </b-button>

        <b-button
          @click="handleAlertClick(hasFlag, 'WARNING')"
          :disabled="getTotals.warn === 0"
          :type="{
            'is-warning': getTotals.warn !== 0,
            'inverted-alert warning': getTotals.warn === 0
          }"
          size="is-small"
          icon-pack="mdi"
          icon-left="alert"
          class="has-text-weight-semibold alert-button"
          expanded
        >
          {{ getTotals.warn }}
        </b-button>

        <b-button
          @click="handleAlertClick(hasFlag, 'CRITICAL')"
          :disabled="getTotals.crit === 0"
          :type="{
            'is-danger': getTotals.crit !== 0,
            'inverted-alert danger': getTotals.crit === 0
          }"
          size="is-small"
          icon-pack="mdi"
          icon-left="alert-circle"
          class="has-text-weight-semibold alert-button"
          expanded
        >
          {{ getTotals.crit }}
        </b-button>
      </template>
      <b-skeleton height="30" :active="loading"></b-skeleton>
    </footer>
  </div>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapActions, mapGetters } from 'vuex'
import { checkAlertIcon } from '@/helpers/helpers.js'
import NoContent from '@/components/common/NoContent.vue'

export default {
  props: {
    title: {
      type: Array,
      default: () => []
    },
    alertCategory: {
      type: String,
      required: true
    }
  },
  components: {
    NoContent
  },
  data() {
    return {
      isAnimated: false,
      loading: true
    }
  },
  beforeMount() {
    bus.$on('loadAlertsComplete', () => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions(['markAsRead']),
    handleMarkAsRead(id, flag, type) {
      this.markAsRead({ id, flag, type }).then(() => {
        this.isAnimated = !this.isAnimated
      })
    },
    handleAlertClick(category, severity) {
      this.$store.commit('SET_ALERTS_PARAMS', {
        category: category,
        severity: severity,
        hostname: null
      })
      this.$router.push('/alerts')
    }
  },
  computed: {
    ...mapGetters(['getFirstAlertByCategory', 'getTotalAlertsByCategory']),
    getFirst() {
      return this.getFirstAlertByCategory(this.alertCategory)
    },
    getTotals() {
      return this.getTotalAlertsByCategory(this.alertCategory)
    },
    hasFlag() {
      return this.getFirst && this.getFirst.category
        ? this.getFirst.category
        : null
    },
    setIcon() {
      return checkAlertIcon(this.getFirst.severity)
    }
  },
  watch: {
    isAnimated(newValue, oldValue) {
      if (newValue) {
        setTimeout(() => {
          this.isAnimated = oldValue
        }, 1000)
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
    display: flex;

    .alert-button {
      height: 30px;
      font-size: 15px;
      border-radius: 0;

      &:disabled {
        opacity: 1;
      }
    }

    .inverted-alert {
      background-color: #c1c1c1;
      border: none;
    }
  }
}

.wrap-msg {
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 155px;
  white-space: break-spaces;
  overflow-wrap: anywhere;
}

.flip-enter-active {
  transition: all 0.2s cubic-bezier(0.55, 0.085, 0.68, 0.53); //ease-in-quad
}

.flip-leave-active {
  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); //ease-out-quad
}

.flip-enter,
.flip-leave-to {
  transform: scaleY(0) translateZ(0);
  opacity: 0;
}
</style>
